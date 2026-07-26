"use client";

import { useState } from "react";
import { Corners } from "@/components/brand/datum";
import { SITE } from "@/lib/site";

const NEEDS = [
  "A new product",
  "Rescue an existing build",
  "White label for my agency",
  "AI features",
  "Not sure yet",
];

export function ContactForm() {
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [picked, setPicked] = useState<string[]>([]);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );

  const toggle = (label: string) =>
    setPicked((p) =>
      p.includes(label) ? p.filter((x) => x !== label) : [...p, label]
    );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const summary = [
      `Name: ${name}`,
      company && `Company: ${company}`,
      `Email: ${email}`,
      picked.length > 0 && `Needs: ${picked.join(", ")}`,
      "",
      message,
    ]
      .filter(Boolean)
      .join("\n");

    if (SITE.formEndpoint) {
      setStatus("sending");
      try {
        const res = await fetch(SITE.formEndpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, company, email, needs: picked, message }),
        });
        if (!res.ok) throw new Error(`status ${res.status}`);
        setStatus("sent");
      } catch {
        setStatus("error");
      }
    } else {
      // No form backend configured yet: compose the email in the visitor's
      // own mail client so nothing silently disappears.
      const subject = encodeURIComponent(
        `Project inquiry from ${name}${company ? ` (${company})` : ""}`
      );
      window.location.href = `mailto:${SITE.email}?subject=${subject}&body=${encodeURIComponent(summary)}`;
      setStatus("sent");
    }
  };

  if (status === "sent") {
    return (
      <div className="flex flex-col gap-4 py-10">
        <div className="font-heading text-3xl font-semibold">
          Got it. Talk soon.
        </div>
        <p className="text-[15.5px] leading-[1.7] text-neutral-700">
          Wes will reply from {SITE.email}, usually the same day. If it is
          urgent, email him directly and say so in the subject line.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <label className="flex flex-col gap-2.5">
          <span className="font-heading text-[10px] font-semibold tracking-kicker text-neutral-600">
            YOUR NAME
          </span>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border-b border-divider bg-transparent py-3 text-[15px] text-ink outline-none transition-colors focus:border-steel-700"
          />
        </label>
        <label className="flex flex-col gap-2.5">
          <span className="font-heading text-[10px] font-semibold tracking-kicker text-neutral-600">
            COMPANY
          </span>
          <input
            type="text"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            className="border-b border-divider bg-transparent py-3 text-[15px] text-ink outline-none transition-colors focus:border-steel-700"
          />
        </label>
      </div>

      <label className="flex flex-col gap-2.5">
        <span className="font-heading text-[10px] font-semibold tracking-kicker text-neutral-600">
          EMAIL
        </span>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border-b border-divider bg-transparent py-3 text-[15px] text-ink outline-none transition-colors focus:border-steel-700"
        />
      </label>

      <div className="flex flex-col gap-3">
        <span className="font-heading text-[10px] font-semibold tracking-kicker text-neutral-600">
          WHAT DO YOU NEED
        </span>
        <div className="flex flex-wrap gap-2">
          {NEEDS.map((label) => {
            const on = picked.includes(label);
            return (
              <button
                key={label}
                type="button"
                onClick={() => toggle(label)}
                aria-pressed={on}
                className={`border px-3.5 py-2 text-[13.5px] transition-colors ${
                  on
                    ? "border-steel bg-steel text-ground"
                    : "border-divider text-neutral-700 hover:border-steel-500"
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>

      <label className="flex flex-col gap-2.5">
        <span className="font-heading text-[10px] font-semibold tracking-kicker text-neutral-600">
          WHAT ARE YOU TRYING TO SHIP
        </span>
        <textarea
          rows={4}
          required
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="resize-y border-b border-divider bg-transparent py-3 text-[15px] text-ink outline-none transition-colors focus:border-steel-700"
        />
      </label>

      {status === "error" && (
        <p className="text-sm text-red-700">
          Something went wrong sending that. Email {SITE.email} directly and
          we will take it from there.
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="blueprint mt-2 inline-flex items-center gap-2 self-start bg-steel px-8 py-4 font-heading text-[15px] font-semibold text-ground transition-colors hover:bg-steel-600 disabled:opacity-60"
      >
        {status === "sending" ? "Sending…" : "Send and book a call"}
        <Corners />
      </button>
    </form>
  );
}
