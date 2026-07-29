"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Lock, Shield, CheckCircle, AlertCircle, Download } from "lucide-react";
import { MutualNdaText } from "@/components/nda/mutual-nda-text";

const API_BASE =
  process.env.NEXT_PUBLIC_NDA_API_URL || "https://api.hubersoftware.com/nda";

function GatedNdaContent() {
  const searchParams = useSearchParams();
  const inviteId = searchParams.get("invite");

  const [step, setStep] = useState<"password" | "nda" | "success">("password");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [attemptsRemaining, setAttemptsRemaining] = useState<number | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [templateVersion, setTemplateVersion] = useState("v3.0");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [signature, setSignature] = useState("");
  const [consent, setConsent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [signatureId, setSignatureId] = useState("");
  const [downloadUrl, setDownloadUrl] = useState("");

  useEffect(() => {
    if (!inviteId) {
      setPasswordError("No invite ID provided. Please use the link sent to you.");
    }
  }, [inviteId]);

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteId || !password.trim()) return;

    setIsVerifying(true);
    setPasswordError("");

    try {
      const response = await fetch(`${API_BASE}/invite/verify`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ inviteId, password: password.trim() }),
      });

      const data = await response.json();

      if (data.valid) {
        setTemplateVersion(data.templateVersion || "v3.0");
        setStep("nda");
      } else {
        setPasswordError(data.error || "Invalid credentials");
        if (data.attemptsRemaining !== undefined) {
          setAttemptsRemaining(data.attemptsRemaining);
        }
      }
    } catch {
      setPasswordError("Failed to verify. Please try again.");
    } finally {
      setIsVerifying(false);
    }
  };

  const handleSign = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!consent) {
      setSubmitError("You must consent to electronic signature");
      return;
    }

    setIsSubmitting(true);
    setSubmitError("");

    try {
      const response = await fetch(`${API_BASE}/sign`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          company: company.trim() || undefined,
          signature: signature.trim(),
          consent,
          inviteId,
          templateVersion,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setSignatureId(data.signatureId || "");
        setDownloadUrl(data.downloadUrl || "");
        setStep("success");
      } else {
        setSubmitError(data.error || data.message || "Failed to sign");
      }
    } catch {
      setSubmitError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (step === "success") {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-ground">
        <div className="max-w-md mx-auto text-center bg-neutral-100 border border-divider p-8">
          <div className="w-16 h-16 bg-steel-100 flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-steel-700" />
          </div>
          <h2 className="font-heading text-2xl font-semibold mb-2">NDA signed</h2>
          <p className="text-neutral-700 mb-6">
            The agreement is executed. Download your copy below. A copy has
            also been emailed to you and to Huber Software.
          </p>
          {downloadUrl && (
            <a
              href={downloadUrl}
              className="mb-6 inline-flex w-full items-center justify-center gap-2 bg-steel px-6 py-3.5 font-heading text-[15px] font-semibold text-ground transition-colors hover:bg-steel-600"
            >
              <Download className="h-4 w-4" />
              Download signed NDA (PDF)
            </a>
          )}
          <div className="bg-ground border border-divider p-4 text-left text-sm">
            <p className="text-neutral-600 mb-1">Document ID:</p>
            <p className="font-mono break-all">{signatureId}</p>
          </div>
          <p className="text-sm text-neutral-600 mt-4">
            The download link works for one hour. Save the document ID for
            your records; we keep the signed original with its audit trail.
          </p>
        </div>
      </div>
    );
  }

  if (step === "password") {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-ground">
        <div className="w-full max-w-sm bg-neutral-100 border border-divider p-8">
          <div className="w-14 h-14 bg-steel-100 flex items-center justify-center mx-auto mb-4">
            <Lock className="w-7 h-7 text-steel-700" />
          </div>
          <h1 className="font-heading text-2xl font-semibold text-center mb-2">
            Private NDA invite
          </h1>
          <p className="text-sm text-neutral-700 text-center mb-6">
            This mutual NDA link was prepared for a specific recipient. Enter
            the access code you were given to view and sign.
          </p>
          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Access code"
              disabled={!inviteId || isVerifying}
            />
            {passwordError && (
              <div className="flex items-start gap-2 text-sm text-red-700">
                <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <span>
                  {passwordError}
                  {attemptsRemaining !== null && attemptsRemaining > 0 && (
                    <> ({attemptsRemaining} attempts remaining)</>
                  )}
                </span>
              </div>
            )}
            <Button
              type="submit"
              className="w-full"
              disabled={!inviteId || isVerifying || !password.trim()}
            >
              {isVerifying ? "Verifying..." : "Continue"}
            </Button>
          </form>
        </div>
      </div>
    );
  }

  // step === "nda"
  return (
    <div className="min-h-screen bg-ground">
      <section className="border-b border-divider bg-surface py-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-heading text-3xl font-semibold mb-3">
            Mutual Non-Disclosure Agreement
          </h1>
          <p className="text-neutral-700 max-w-2xl mx-auto">
            Review the agreement and sign below. You will get your executed
            copy immediately, and both parties receive one by email.
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-neutral-100 border border-divider p-8 max-h-[70vh] overflow-y-auto">
                <div className="text-center mb-6 border-b border-divider pb-4">
                  <h3 className="font-heading text-xl font-semibold uppercase tracking-wide">
                    Mutual Non-Disclosure Agreement
                  </h3>
                  <p className="text-neutral-700 font-semibold mt-1">
                    Huber Software LLC
                  </p>
                </div>
                <MutualNdaText />
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-ground border border-divider p-6 sticky top-24">
                <div className="flex items-center gap-2 mb-6">
                  <Shield className="w-5 h-5 text-steel-700" />
                  <h2 className="font-heading text-lg font-semibold">Sign document</h2>
                </div>

                {submitError && (
                  <div className="mb-4 p-3 bg-red-50 border border-red-200 flex items-start gap-2">
                    <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-red-700">{submitError}</p>
                  </div>
                )}

                <form onSubmit={handleSign} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <Input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your legal name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <Input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Company <span className="text-neutral-500">(optional)</span>
                    </label>
                    <Input
                      type="text"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder="Your company name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Typed Signature <span className="text-red-500">*</span>
                    </label>
                    <Input
                      type="text"
                      required
                      value={signature}
                      onChange={(e) => setSignature(e.target.value)}
                      placeholder="Type your full name"
                      className="font-serif italic"
                      style={{ fontFamily: "'Brush Script MT', cursive" }}
                    />
                  </div>
                  <div className="pt-2">
                    <Checkbox
                      id="consent"
                      checked={consent}
                      onChange={(e) => setConsent(e.target.checked)}
                      label="I consent to sign this document electronically. I understand that my typed signature has the same legal effect as a handwritten signature."
                    />
                  </div>
                  <Button type="submit" className="w-full mt-4" size="lg" disabled={isSubmitting}>
                    {isSubmitting ? "Signing..." : "Sign NDA"}
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default function GatedNdaPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-ground" />}>
      <GatedNdaContent />
    </Suspense>
  );
}
