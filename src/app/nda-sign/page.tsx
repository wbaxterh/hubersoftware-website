"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { FileText, Shield, CheckCircle, AlertCircle, Download } from "lucide-react";
import { MutualNdaText } from "@/components/nda/mutual-nda-text";

const API_URL = process.env.NEXT_PUBLIC_NDA_API_URL || "https://api.hubersoftware.com/nda";

interface FormData {
  name: string;
  email: string;
  company: string;
  signature: string;
  consent: boolean;
}

interface FormErrors {
  name?: string;
  email?: string;
  signature?: string;
  consent?: string;
}

export default function NDASignPage() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    company: "",
    signature: "",
    consent: false,
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [signatureId, setSignatureId] = useState("");
  const [downloadUrl, setDownloadUrl] = useState("");

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim() || formData.name.trim().length < 2) {
      newErrors.name = "Full name is required (minimum 2 characters)";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.signature.trim() || formData.signature.trim().length < 2) {
      newErrors.signature = "Typed signature is required (minimum 2 characters)";
    }

    if (!formData.consent) {
      newErrors.consent = "You must consent to electronic signature";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const response = await fetch(`${API_URL}/sign`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData, templateVersion: "v3.0" }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || data.message || "Failed to submit NDA");
      }

      setSignatureId(data.signatureId);
      setDownloadUrl(data.downloadUrl || "");
      setSubmitStatus("success");
    } catch (error) {
      console.error("NDA submission error:", error);
      setErrorMessage(error instanceof Error ? error.message : "An error occurred");
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field: keyof FormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  // Success screen
  if (submitStatus === "success") {
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

  return (
    <div className="min-h-screen bg-ground">
      {/* Hero Section */}
      <section className="border-b border-divider bg-surface py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-steel-100">
                <FileText className="w-8 h-8 text-steel-700" />
              </div>
            </div>
            <h1 className="font-heading text-3xl font-semibold mb-4">
              Mutual Non-Disclosure Agreement
            </h1>
            <p className="text-neutral-700 max-w-2xl mx-auto">
              Before we talk details, both sides deserve protection. This
              mutual NDA covers what you share with us and what we share with
              you. Review it, sign it, and download your executed copy.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Agreement text */}
            <div className="lg:col-span-2">
              <div className="bg-neutral-100 border border-divider p-8 max-h-[70vh] overflow-y-auto">
                <div className="text-center mb-6 border-b border-divider pb-4">
                  <h3 className="font-heading text-xl font-semibold uppercase tracking-wide">
                    Mutual Non-Disclosure Agreement
                  </h3>
                  <p className="text-neutral-700 font-semibold mt-1">Huber Software LLC</p>
                </div>

                <MutualNdaText />
              </div>
            </div>

            {/* Signature Form */}
            <div className="lg:col-span-1">
              <div className="bg-ground border border-divider p-6 sticky top-24">
                <div className="flex items-center gap-2 mb-6">
                  <Shield className="w-5 h-5 text-steel-700" />
                  <h2 className="font-heading text-lg font-semibold">Sign document</h2>
                </div>

                {submitStatus === "error" && (
                  <div className="mb-4 p-3 bg-red-50 border border-red-200 flex items-start gap-2">
                    <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-red-700">{errorMessage}</p>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-1">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <Input
                      id="name"
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleChange("name", e.target.value)}
                      placeholder="Your legal name"
                      className={errors.name ? "border-red-500" : ""}
                    />
                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-1">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleChange("email", e.target.value)}
                      placeholder="you@example.com"
                      className={errors.email ? "border-red-500" : ""}
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                  </div>

                  <div>
                    <label htmlFor="company" className="block text-sm font-medium mb-1">
                      Company <span className="text-neutral-500">(optional)</span>
                    </label>
                    <Input
                      id="company"
                      type="text"
                      value={formData.company}
                      onChange={(e) => handleChange("company", e.target.value)}
                      placeholder="Your company name"
                    />
                  </div>

                  <div>
                    <label htmlFor="signature" className="block text-sm font-medium mb-1">
                      Typed Signature <span className="text-red-500">*</span>
                    </label>
                    <Input
                      id="signature"
                      type="text"
                      value={formData.signature}
                      onChange={(e) => handleChange("signature", e.target.value)}
                      placeholder="Type your full name"
                      className={`font-serif italic ${errors.signature ? "border-red-500" : ""}`}
                      style={{ fontFamily: "'Brush Script MT', cursive" }}
                    />
                    {errors.signature && <p className="text-red-500 text-xs mt-1">{errors.signature}</p>}
                    <p className="text-xs text-neutral-600 mt-1">
                      Type your full name exactly as it appears above
                    </p>
                  </div>

                  <div className="pt-2">
                    <Checkbox
                      id="consent"
                      checked={formData.consent}
                      onChange={(e) => handleChange("consent", e.target.checked)}
                      label="I consent to sign this document electronically. I understand that my typed signature has the same legal effect as a handwritten signature."
                    />
                    {errors.consent && <p className="text-red-500 text-xs mt-1">{errors.consent}</p>}
                  </div>

                  <Button
                    type="submit"
                    className="w-full mt-4"
                    size="lg"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Signing..." : "Sign NDA"}
                  </Button>
                </form>

                <div className="mt-6 pt-4 border-t border-divider">
                  <p className="text-xs text-neutral-600 text-center">
                    By signing, you agree to the terms of this Mutual
                    Non-Disclosure Agreement. You can download your executed
                    copy immediately, and a copy goes to both parties by email.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
