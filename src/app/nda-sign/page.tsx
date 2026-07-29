"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { FileText, Shield, CheckCircle, AlertCircle, Download } from "lucide-react";

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

                <div className="text-sm leading-relaxed text-neutral-800 space-y-1">
                  <div className="bg-ground border border-divider p-4 mb-4">
                    <p><strong>Party A:</strong> Huber Software LLC, a North Carolina limited liability company (&ldquo;Huber Software&rdquo;)</p>
                    <p><strong>Party B:</strong> You, the signer identified below (&ldquo;Counterparty&rdquo;)</p>
                    <p className="mt-2">Each party may disclose Confidential Information (in that capacity, the &ldquo;Disclosing Party&rdquo;) and receive Confidential Information (in that capacity, the &ldquo;Receiving Party&rdquo;) under this Agreement.</p>
                  </div>

                  <h4 className="font-bold mt-6 mb-2">1. Purpose</h4>
                  <p>
                    The parties wish to explore or engage in a business relationship, which may include software
                    development services, product collaboration, partnership, or contractor engagement (the
                    &ldquo;Purpose&rdquo;). In connection with the Purpose, each party may disclose Confidential
                    Information to the other. This Agreement protects that information regardless of which party
                    discloses it.
                  </p>

                  <h4 className="font-bold mt-6 mb-2">2. Definition of Confidential Information</h4>
                  <p>
                    &ldquo;Confidential Information&rdquo; means any and all information or data disclosed by the
                    Disclosing Party to the Receiving Party, whether orally, in writing, electronically, or by any
                    other means, that is designated as confidential or that reasonably should be understood to be
                    confidential given the nature of the information and the circumstances of disclosure. This
                    includes technical data, trade secrets, know-how, research, product plans, products, services,
                    customers, customer lists, markets, software, source code, developments, inventions, processes,
                    formulas, technology, designs, drawings, engineering, and hardware configuration information;
                    business and financial information, costs, pricing, business plans, marketing plans, and
                    strategies; information about employees, contractors, and third-party relationships; and any
                    other information that would reasonably be considered confidential or proprietary.
                  </p>

                  <h4 className="font-bold mt-6 mb-2">3. Obligations of the Receiving Party</h4>
                  <p>The Receiving Party agrees to:</p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Hold and maintain the Disclosing Party&rsquo;s Confidential Information in strict confidence;</li>
                    <li>Not disclose Confidential Information to any third party without the Disclosing Party&rsquo;s prior written consent;</li>
                    <li>Use the Confidential Information solely for the Purpose;</li>
                    <li>Protect the Confidential Information using the same degree of care used to protect its own confidential information, but in no event less than reasonable care;</li>
                    <li>Promptly notify the Disclosing Party of any unauthorized use or disclosure of Confidential Information.</li>
                  </ul>

                  <h4 className="font-bold mt-6 mb-2">4. Exclusions</h4>
                  <p>Confidential Information does not include information that:</p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Is or becomes publicly available through no fault of the Receiving Party;</li>
                    <li>Was rightfully in the Receiving Party&rsquo;s possession prior to disclosure by the Disclosing Party;</li>
                    <li>Is independently developed by the Receiving Party without use of the Confidential Information;</li>
                    <li>Is rightfully obtained by the Receiving Party from a third party without restriction on disclosure.</li>
                  </ul>
                  <p>
                    The Receiving Party may disclose Confidential Information to the extent required by law,
                    regulation, or court order, provided that (where legally permitted) it gives the Disclosing
                    Party prompt written notice and reasonable cooperation to seek protective treatment.
                  </p>

                  <h4 className="font-bold mt-6 mb-2">5. Term</h4>
                  <p>
                    This Agreement shall remain in effect for a period of two (2) years from the Effective Date,
                    unless terminated earlier by either party with thirty (30) days written notice. The
                    confidentiality obligations shall survive termination of this Agreement for a period of three
                    (3) years, and for information constituting a trade secret, for as long as it remains a trade
                    secret under applicable law.
                  </p>

                  <h4 className="font-bold mt-6 mb-2">6. Return or Destruction of Information</h4>
                  <p>
                    Upon termination of this Agreement or upon the Disclosing Party&rsquo;s request, the Receiving
                    Party shall promptly return or destroy all Confidential Information of the Disclosing Party and
                    any copies thereof, and upon request shall confirm in writing that such return or destruction
                    has been completed.
                  </p>

                  <h4 className="font-bold mt-6 mb-2">7. No License; No Obligation to Proceed</h4>
                  <p>
                    Nothing in this Agreement grants either party any rights in or to the other party&rsquo;s
                    Confidential Information, except the limited right to use such information for the Purpose.
                    This Agreement does not obligate either party to enter into any further agreement or business
                    relationship.
                  </p>

                  <h4 className="font-bold mt-6 mb-2">8. Remedies</h4>
                  <p>
                    Each party acknowledges that unauthorized disclosure of Confidential Information may cause
                    irreparable harm for which monetary damages would be an inadequate remedy, and that the
                    Disclosing Party shall be entitled to seek injunctive relief in addition to any other remedies
                    available at law or in equity.
                  </p>

                  <h4 className="font-bold mt-6 mb-2">9. Electronic Signature</h4>
                  <p>
                    The parties agree that this Agreement may be executed electronically, and that electronic
                    signatures shall have the same legal effect as handwritten signatures pursuant to applicable
                    law, including the U.S. Electronic Signatures in Global and National Commerce Act (E-SIGN) and
                    the Uniform Electronic Transactions Act as adopted in the governing state.
                  </p>

                  <h4 className="font-bold mt-6 mb-2">10. Governing Law and Venue</h4>
                  <p>
                    This Agreement shall be governed by and construed in accordance with the laws of the State of
                    North Carolina, without regard to its conflict of laws principles. The parties consent to the
                    exclusive jurisdiction of the state and federal courts located in the State of North Carolina
                    for any dispute arising out of this Agreement.
                  </p>

                  <h4 className="font-bold mt-6 mb-2">11. Entire Agreement</h4>
                  <p>
                    This Agreement constitutes the entire agreement between the parties with respect to the subject
                    matter hereof and supersedes all prior negotiations, representations, or agreements relating
                    thereto. Any amendment must be in writing and signed by both parties. Neither party may assign
                    this Agreement without the other party&rsquo;s written consent, except to a successor in
                    connection with a merger or sale of substantially all assets.
                  </p>

                  <p className="mt-6 text-neutral-600">
                    Huber Software LLC agrees to be bound by these terms upon your signature, executed by Wesley
                    Baxter Huber, Member.
                  </p>
                </div>
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
