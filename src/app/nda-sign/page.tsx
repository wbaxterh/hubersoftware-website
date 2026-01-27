"use client"

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { FileText, Shield, CheckCircle, AlertCircle } from "lucide-react";

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
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || data.message || "Failed to submit NDA");
      }

      setSignatureId(data.signatureId);
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
    // Clear error when user starts typing
    if (errors[field as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  // Success screen
  if (submitStatus === "success") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
        <div className="max-w-md mx-auto text-center bg-white p-8 rounded-2xl shadow-lg">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">NDA Signed Successfully</h2>
          <p className="text-gray-600 mb-4">
            Thank you for signing the Non-Disclosure Agreement. A copy has been sent to your email address.
          </p>
          <div className="bg-gray-50 rounded-lg p-4 text-left text-sm">
            <p className="text-gray-500 mb-1">Document ID:</p>
            <p className="font-mono text-gray-900 break-all">{signatureId}</p>
          </div>
          <p className="text-sm text-gray-500 mt-4">
            Please save the document ID for your records.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-50 to-gray-100 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-blue-100 rounded-full">
                <FileText className="w-8 h-8 text-blue-600" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Non-Disclosure Agreement
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Please review and sign the NDA below to proceed with your engagement with Huber Software LLC.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* NDA Preview */}
            <div className="lg:col-span-2">
              <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
                <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                  <h2 className="text-lg font-semibold text-gray-900">Agreement Terms</h2>
                </div>
                <div className="p-6 max-h-[600px] overflow-y-auto prose prose-sm">
                  <div className="text-center mb-6 pb-4 border-b">
                    <h3 className="text-xl font-bold uppercase tracking-wide">Non-Disclosure Agreement</h3>
                    <p className="text-gray-600 font-semibold">Huber Software LLC</p>
                    <p className="text-gray-500 text-sm">DBA Helio</p>
                  </div>

                  <p className="text-gray-700">
                    This Non-Disclosure Agreement ("Agreement") is entered into by and between Huber Software LLC ("Company")
                    and the undersigned party ("Contractor").
                  </p>

                  <h4 className="font-bold mt-6 mb-2">1. Definition of Confidential Information</h4>
                  <p className="text-gray-700">
                    "Confidential Information" means any and all information or data disclosed by the Company to the Contractor,
                    whether orally, in writing, electronically, or by any other means, that is designated as confidential or that
                    reasonably should be understood to be confidential given the nature of the information and circumstances of disclosure.
                    This includes, but is not limited to:
                  </p>
                  <ul className="list-disc pl-6 text-gray-700 mt-2">
                    <li>Technical data, trade secrets, know-how, research, product plans, products, services, customers, customer lists,
                    markets, software, developments, inventions, processes, formulas, technology, designs, drawings, engineering, and
                    hardware configuration information;</li>
                    <li>Business information including financial information, costs, pricing, business plans, marketing plans, and strategies;</li>
                    <li>Information about employees, contractors, and third-party relationships;</li>
                    <li>Any other information that would reasonably be considered confidential or proprietary.</li>
                  </ul>

                  <h4 className="font-bold mt-6 mb-2">2. Obligations of Receiving Party</h4>
                  <p className="text-gray-700">The Contractor agrees to:</p>
                  <ul className="list-disc pl-6 text-gray-700 mt-2">
                    <li>Hold and maintain the Confidential Information in strict confidence;</li>
                    <li>Not disclose Confidential Information to any third parties without prior written consent from the Company;</li>
                    <li>Use the Confidential Information solely for the purpose of performing services for the Company;</li>
                    <li>Protect the Confidential Information using the same degree of care used to protect their own confidential information;</li>
                    <li>Promptly notify the Company of any unauthorized use or disclosure of Confidential Information.</li>
                  </ul>

                  <h4 className="font-bold mt-6 mb-2">3. Exclusions</h4>
                  <p className="text-gray-700">Confidential Information does not include information that:</p>
                  <ul className="list-disc pl-6 text-gray-700 mt-2">
                    <li>Is or becomes publicly available through no fault of the Contractor;</li>
                    <li>Was rightfully in the Contractor's possession prior to disclosure by the Company;</li>
                    <li>Is independently developed by the Contractor without use of the Confidential Information;</li>
                    <li>Is rightfully obtained by the Contractor from a third party without restriction on disclosure.</li>
                  </ul>

                  <h4 className="font-bold mt-6 mb-2">4. Term</h4>
                  <p className="text-gray-700">
                    This Agreement shall remain in effect for a period of two (2) years from the Effective Date, unless terminated
                    earlier by either party with thirty (30) days written notice. The confidentiality obligations shall survive
                    termination of this Agreement for a period of three (3) years.
                  </p>

                  <h4 className="font-bold mt-6 mb-2">5. Return of Information</h4>
                  <p className="text-gray-700">
                    Upon termination of this Agreement or upon request by the Company, the Contractor shall promptly return or destroy
                    all Confidential Information and any copies thereof, and shall certify in writing that such return or destruction
                    has been completed.
                  </p>

                  <h4 className="font-bold mt-6 mb-2">6. No License</h4>
                  <p className="text-gray-700">
                    Nothing in this Agreement grants the Contractor any rights in or to the Confidential Information, except the
                    limited right to use such information solely for the purpose of performing services for the Company.
                  </p>

                  <h4 className="font-bold mt-6 mb-2">7. Governing Law</h4>
                  <p className="text-gray-700">
                    This Agreement shall be governed by and construed in accordance with the laws of the State of Ohio, without
                    regard to its conflict of laws principles.
                  </p>

                  <h4 className="font-bold mt-6 mb-2">8. Entire Agreement</h4>
                  <p className="text-gray-700">
                    This Agreement constitutes the entire agreement between the parties with respect to the subject matter hereof
                    and supersedes all prior negotiations, representations, or agreements relating thereto.
                  </p>
                </div>
              </div>
            </div>

            {/* Signature Form */}
            <div className="lg:col-span-1">
              <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 sticky top-6">
                <div className="flex items-center gap-2 mb-6">
                  <Shield className="w-5 h-5 text-blue-600" />
                  <h2 className="text-lg font-semibold text-gray-900">Sign Document</h2>
                </div>

                {submitStatus === "error" && (
                  <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2">
                    <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-red-700">{errorMessage}</p>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
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
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
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
                    <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
                      Company <span className="text-gray-400">(optional)</span>
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
                    <label htmlFor="signature" className="block text-sm font-medium text-gray-700 mb-1">
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
                    <p className="text-xs text-gray-500 mt-1">
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

                <div className="mt-6 pt-4 border-t border-gray-200">
                  <p className="text-xs text-gray-500 text-center">
                    By signing, you agree to the terms of this Non-Disclosure Agreement.
                    A copy will be sent to your email address.
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
