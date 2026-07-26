import { Metadata } from "next";
import { Kicker } from "@/components/brand/datum";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Huber Software LLC handles the small amount of data this site collects.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-20 md:px-10 md:py-24">
      <Kicker>Legal</Kicker>
      <h1 className="mt-5 font-heading text-4xl font-semibold leading-tight md:text-5xl">
        Privacy policy
      </h1>
      <p className="mt-3 text-sm text-neutral-600">Effective July 26, 2026</p>

      <div className="mt-10 flex flex-col gap-8 text-[16px] leading-[1.75] text-neutral-700">
        <p>
          This site collects as little as possible. Here is the whole picture,
          in plain language.
        </p>
        <div>
          <h2 className="mb-2 font-heading text-2xl font-semibold text-ink">
            What we collect
          </h2>
          <p>
            If you use the contact form, we receive what you type: your name,
            company, email and message. If you email us directly, we have your
            email. Standard server logs record requests to the site, including
            IP addresses, for security and debugging.
          </p>
        </div>
        <div>
          <h2 className="mb-2 font-heading text-2xl font-semibold text-ink">
            What we do with it
          </h2>
          <p>
            We reply to you. That is the use. We do not sell your information,
            share it with advertisers, or add you to a mailing list you did not
            ask for.
          </p>
        </div>
        <div>
          <h2 className="mb-2 font-heading text-2xl font-semibold text-ink">
            Free tools
          </h2>
          <p>
            The PDF merger processes files to produce your merged document and
            does not keep them. The NDA signing tool stores signed agreements
            and their audit trail, because that is the point of the tool.
          </p>
        </div>
        <div>
          <h2 className="mb-2 font-heading text-2xl font-semibold text-ink">
            Cookies and analytics
          </h2>
          <p>
            No advertising cookies, no cross site tracking. If we add privacy
            respecting analytics, this page will say so.
          </p>
        </div>
        <div>
          <h2 className="mb-2 font-heading text-2xl font-semibold text-ink">
            Questions
          </h2>
          <p>
            Email{" "}
            <a href={`mailto:${SITE.email}`} className="text-steel-700 underline underline-offset-4">
              {SITE.email}
            </a>
            . This policy is maintained by {SITE.legalName},{" "}
            {SITE.address.street}, {SITE.address.city}, {SITE.address.region}{" "}
            {SITE.address.postalCode}.
          </p>
        </div>
      </div>
    </div>
  );
}
