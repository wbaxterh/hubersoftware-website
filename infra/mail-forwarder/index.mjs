// Inbound mail forwarder for hubersoftware.com.
// SES receipt rule stores the raw message in S3 and invokes this function;
// we rewrite the envelope headers and forward to FORWARD_TO via SES.
// From must be our verified domain (SES requirement); the original sender
// is preserved in Reply-To so replying just works.
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { SESClient, SendRawEmailCommand } from "@aws-sdk/client-ses";

const s3 = new S3Client({});
const ses = new SESClient({});

const BUCKET = process.env.MAIL_BUCKET;
const PREFIX = process.env.MAIL_PREFIX || "inbound/";
const FORWARD_TO = process.env.FORWARD_TO || "wesleybaxterhuber@gmail.com";
const FROM = process.env.FROM_EMAIL || "noreply@hubersoftware.com";

export const handler = async (event) => {
  const record = event.Records?.[0]?.ses;
  if (!record) {
    console.error("no SES record in event");
    return;
  }

  const { messageId } = record.mail;
  const receipt = record.receipt;
  const original = record.mail.commonHeaders?.from?.[0] || "unknown sender";
  const recipient = receipt.recipients?.[0] || "unknown recipient";

  // Drop obvious junk: SES already ran the scans, respect the verdicts.
  if (
    receipt.spamVerdict?.status === "FAIL" ||
    receipt.virusVerdict?.status === "FAIL"
  ) {
    console.log(`dropping ${messageId} from ${original}: failed scan`);
    return;
  }

  const obj = await s3.send(
    new GetObjectCommand({ Bucket: BUCKET, Key: `${PREFIX}${messageId}` })
  );
  const raw = Buffer.from(await obj.Body.transformToByteArray()).toString(
    "binary"
  );

  const splitAt = raw.search(/\r?\n\r?\n/);
  let headers = raw.slice(0, splitAt);
  const body = raw.slice(splitAt);

  // Strip headers that would break DKIM/SPF alignment or confuse SES.
  headers = headers
    .split(/\r?\n(?![ \t])/) // unfold-aware split
    .filter(
      (h) =>
        !/^(return-path|sender|dkim-signature|message-id|source):/i.test(h)
    )
    .map((h) => {
      if (/^from:/i.test(h)) {
        const display = h
          .replace(/^from:\s*/i, "")
          .replace(/"/g, "'")
          .replace(/\r?\n[ \t]+/g, " ")
          .trim();
        return `From: "${display} [${recipient}]" <${FROM}>`;
      }
      return h;
    })
    .join("\r\n");

  if (!/^reply-to:/im.test(headers)) {
    const addr = original.match(/<([^>]+)>/)?.[1] || original;
    headers += `\r\nReply-To: ${addr}`;
  }
  headers += `\r\nX-Forwarded-For-Address: ${recipient}`;

  await ses.send(
    new SendRawEmailCommand({
      Source: FROM,
      Destinations: [FORWARD_TO],
      RawMessage: { Data: Buffer.from(headers + body, "binary") },
    })
  );

  console.log(`forwarded ${messageId} (${recipient} <- ${original})`);
};
