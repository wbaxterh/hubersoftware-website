import { Metadata } from "next";
import { Kicker } from "@/components/brand/datum";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms for using hubersoftware.com and its free tools.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-20 md:px-10 md:py-24">
      <Kicker>Legal</Kicker>
      <h1 className="mt-5 font-heading text-4xl font-semibold leading-tight md:text-5xl">
        Terms of service
      </h1>
      <p className="mt-3 text-sm text-neutral-600">Effective July 26, 2026</p>

      <div className="mt-10 flex flex-col gap-8 text-[16px] leading-[1.75] text-neutral-700">
        <div>
          <h2 className="mb-2 font-heading text-2xl font-semibold text-ink">
            The site
          </h2>
          <p>
            hubersoftware.com is operated by {SITE.legalName}, a North Carolina
            limited liability company. The content here is provided for
            information. It is not legal, financial or engineering advice for
            your specific situation until we are actually engaged to give it.
          </p>
        </div>
        <div>
          <h2 className="mb-2 font-heading text-2xl font-semibold text-ink">
            Free tools
          </h2>
          <p>
            The free utilities on this site are provided as is, without
            warranty of any kind. They work, we use them ourselves, and we fix
            them when they break, but you use them at your own risk and we are
            not liable for lost files, missed deadlines or consequential
            damages arising from their use.
          </p>
        </div>
        <div>
          <h2 className="mb-2 font-heading text-2xl font-semibold text-ink">
            Client work
          </h2>
          <p>
            Engagements are governed by their own written agreements, not by
            this page. If anything here conflicts with a signed agreement, the
            agreement wins.
          </p>
        </div>
        <div>
          <h2 className="mb-2 font-heading text-2xl font-semibold text-ink">
            Contact
          </h2>
          <p>
            Questions about these terms go to{" "}
            <a href={`mailto:${SITE.email}`} className="text-steel-700 underline underline-offset-4">
              {SITE.email}
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
