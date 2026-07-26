import { Metadata } from "next";
import { Blueprint, Kicker } from "@/components/brand/datum";
import { SITE } from "@/lib/site";
import { ContactForm } from "./contact-form";

export const metadata: Metadata = {
  title: "Contact | Thirty Minutes With Wes",
  description:
    "No deck and no discovery fee. Tell us what you are trying to ship and get a straight answer on scope, cost and fit, usually the same business day.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <div className="mx-auto grid w-full max-w-6xl items-start gap-14 px-5 py-20 md:px-10 md:py-24 lg:grid-cols-[1fr_1.1fr] lg:gap-[88px]">
      {/* Left: pitch + contact facts */}
      <div className="flex flex-col gap-10">
        <div className="flex flex-col gap-6">
          <Kicker className="tracking-label">Contact</Kicker>
          <h1 className="font-heading text-5xl font-semibold leading-[1.05] md:text-[56px]">
            Thirty minutes with Wes.
          </h1>
          <p className="max-w-md text-[17px] leading-[1.75] text-neutral-700">
            No deck and no discovery fee. Tell us what you are trying to ship
            and you will get a straight answer on scope, cost and whether we
            are the right shop for it. If we are not, we will say so and point
            you somewhere better.
          </p>
        </div>

        <Blueprint className="flex flex-col divide-y divide-divider bg-divider">
          <div className="flex flex-col gap-1.5 bg-ground px-6 py-5">
            <div className="font-heading text-[10px] font-semibold tracking-kicker text-neutral-600">
              EMAIL
            </div>
            <a
              href={`mailto:${SITE.email}`}
              className="text-[15.5px] text-steel-700 hover:text-steel-800"
            >
              {SITE.email}
            </a>
          </div>
          <div className="flex flex-col gap-1.5 bg-ground px-6 py-5">
            <div className="font-heading text-[10px] font-semibold tracking-kicker text-neutral-600">
              PARTNERSHIPS
            </div>
            <a
              href={`mailto:${SITE.partnershipsEmail}`}
              className="text-[15.5px] text-steel-700 hover:text-steel-800"
            >
              {SITE.partnershipsEmail}
            </a>
          </div>
          <div className="flex flex-col gap-1.5 bg-ground px-6 py-5">
            <div className="font-heading text-[10px] font-semibold tracking-kicker text-neutral-600">
              TYPICAL REPLY
            </div>
            <div className="text-[15.5px]">Same business day</div>
          </div>
        </Blueprint>

        {SITE.bookingUrl && (
          <div className="flex flex-col gap-4">
            <Kicker>Or pick a time now</Kicker>
            <iframe
              src={SITE.bookingUrl}
              title="Book a call with Wes"
              className="h-[560px] w-full border border-divider bg-ground"
            />
          </div>
        )}
      </div>

      {/* Right: form */}
      <Blueprint className="bg-neutral-100 p-8 md:p-11">
        <ContactForm />
      </Blueprint>
    </div>
  );
}
