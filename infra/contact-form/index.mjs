// Contact form handler for hubersoftware.com. Lambda Function URL + SES.
// Sends to TO_EMAIL; if SES sandbox rejects it (recipient not yet verified),
// falls back to FALLBACK_EMAIL so no inquiry is ever dropped.
import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";

const ses = new SESClient({ region: process.env.AWS_REGION || "us-east-1" });

const FROM = process.env.FROM_EMAIL || "noreply@hubersoftware.com";
const TO = process.env.TO_EMAIL || "wesleybaxterhuber@gmail.com";
const FALLBACK = process.env.FALLBACK_EMAIL || "admin@hubersoftware.com";

const clean = (v, max) =>
  typeof v === "string" ? v.trim().slice(0, max) : "";

export const handler = async (event) => {
  const method = event?.requestContext?.http?.method;
  if (method === "OPTIONS") return { statusCode: 204 };
  if (method !== "POST") {
    return json(405, { error: "method not allowed" });
  }

  let body;
  try {
    body = JSON.parse(event.body || "{}");
  } catch {
    return json(400, { error: "invalid json" });
  }

  const name = clean(body.name, 200);
  const company = clean(body.company, 200);
  const email = clean(body.email, 320);
  const message = clean(body.message, 5000);
  const needs = Array.isArray(body.needs)
    ? body.needs.map((n) => clean(n, 60)).filter(Boolean).slice(0, 10)
    : [];

  if (!name || !email || !message || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return json(400, { error: "name, valid email and message are required" });
  }
  // Trivial spam gate: silently accept but do not send when the hidden
  // honeypot field is filled by a bot.
  if (clean(body.website, 10)) return json(200, { ok: true });

  const subject = `Website inquiry from ${name}${company ? ` (${company})` : ""}`;
  const text = [
    `Name: ${name}`,
    company && `Company: ${company}`,
    `Email: ${email}`,
    needs.length > 0 && `Needs: ${needs.join(", ")}`,
    "",
    message,
    "",
    "Sent from the hubersoftware.com contact form.",
  ]
    .filter(Boolean)
    .join("\n");

  const send = (to) =>
    ses.send(
      new SendEmailCommand({
        Source: `Huber Software <${FROM}>`,
        Destination: { ToAddresses: [to] },
        ReplyToAddresses: [email],
        Message: {
          Subject: { Data: subject },
          Body: { Text: { Data: text } },
        },
      })
    );

  try {
    await send(TO);
  } catch (err) {
    console.error("primary send failed, trying fallback:", err?.message);
    try {
      await send(FALLBACK);
    } catch (err2) {
      console.error("fallback send failed:", err2?.message);
      return json(502, { error: "email delivery failed" });
    }
  }

  return json(200, { ok: true });
};

const json = (statusCode, data) => ({
  statusCode,
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(data),
});
