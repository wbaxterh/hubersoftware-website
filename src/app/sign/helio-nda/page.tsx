"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

const API_BASE = "https://api.hubersoftware.com/nda";

interface VerifyResponse {
  valid: boolean;
  templateVersion?: string;
  expiresAt?: string;
  usesRemaining?: number;
  error?: string;
  attemptsRemaining?: number;
}

interface SignResponse {
  success: boolean;
  message: string;
  signatureId?: string;
  signedAt?: string;
  templateVersion?: string;
  emailStatus?: string;
  emailNote?: string;
  error?: string;
  details?: string[];
}

function HelioNDAContent() {
  const searchParams = useSearchParams();
  const inviteId = searchParams.get("invite");

  const [step, setStep] = useState<"password" | "nda" | "success">("password");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [attemptsRemaining, setAttemptsRemaining] = useState<number | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [templateVersion, setTemplateVersion] = useState("v2.0");

  // Signing form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [signature, setSignature] = useState("");
  const [consent, setConsent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [signatureId, setSignatureId] = useState("");

  // Check if we have an invite ID
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

      const data: VerifyResponse = await response.json();

      if (data.valid) {
        setTemplateVersion(data.templateVersion || "v2.0");
        setStep("nda");
      } else {
        setPasswordError(data.error || "Invalid credentials");
        if (data.attemptsRemaining !== undefined) {
          setAttemptsRemaining(data.attemptsRemaining);
        }
      }
    } catch (err) {
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

      const data: SignResponse = await response.json();

      if (data.success) {
        setSignatureId(data.signatureId || "");
        setStep("success");
      } else {
        setSubmitError(data.error || "Failed to sign. Please try again.");
        if (data.details) {
          setSubmitError(data.details.join(", "));
        }
      }
    } catch (err) {
      setSubmitError("Failed to submit. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Password gate step
  if (step === "password") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4">
        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-gray-900">Helio NDA</h1>
              <p className="text-gray-600 mt-2">
                Enter the password provided to you to access the Non-Disclosure Agreement.
              </p>
            </div>

            {!inviteId ? (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
                <p className="text-red-700">{passwordError}</p>
              </div>
            ) : (
              <form onSubmit={handlePasswordSubmit}>
                <div className="mb-6">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    placeholder="Enter password"
                    required
                    autoFocus
                  />
                </div>

                {passwordError && (
                  <div className="mb-4 bg-red-50 border border-red-200 rounded-lg p-3">
                    <p className="text-red-700 text-sm">{passwordError}</p>
                    {attemptsRemaining !== null && attemptsRemaining > 0 && (
                      <p className="text-red-600 text-xs mt-1">
                        {attemptsRemaining} attempt{attemptsRemaining !== 1 ? "s" : ""} remaining
                      </p>
                    )}
                    {attemptsRemaining === 0 && (
                      <p className="text-red-600 text-xs mt-1">
                        Account locked. Please wait 15 minutes.
                      </p>
                    )}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isVerifying || !password.trim()}
                  className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isVerifying ? "Verifying..." : "Continue"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    );
  }

  // NDA signing step
  if (step === "nda") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          {/* NDA Content */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <div className="text-center border-b-2 border-gray-900 pb-4 mb-6">
              <h1 className="text-2xl font-bold uppercase tracking-wider">
                Non-Disclosure Agreement
              </h1>
              <p className="text-lg font-semibold text-gray-700">Huber Software LLC</p>
              <p className="text-sm text-gray-500">DBA Helio</p>
            </div>

            <div className="prose prose-sm max-w-none text-gray-700">
              <p className="text-center font-semibold mb-6">
                Effective Date: Upon Signing
              </p>

              <div className="bg-gray-50 border border-gray-200 p-4 rounded-lg mb-6">
                <p><strong>Disclosing Party:</strong> Huber Software LLC, a limited liability company, DBA Helio (&quot;Company&quot;)</p>
                <p><strong>Receiving Party:</strong> [Your Name] (&quot;Contractor&quot;)</p>
              </div>

              <p className="mb-4">
                This Non-Disclosure Agreement (&quot;Agreement&quot;) is entered into by and between the parties identified above.
                The Receiving Party agrees to the following terms and conditions:
              </p>

              <h3 className="font-bold text-sm uppercase mt-6 mb-2">1. Purpose</h3>
              <p>
                The parties wish to explore a potential business relationship related to: (a) Evaluation of potential engagement
                between the parties; (b) Performing services as a contractor or sales freelancer for Company&apos;s products and services.
              </p>

              <h3 className="font-bold text-sm uppercase mt-6 mb-2">2. Definition of Confidential Information</h3>
              <p>
                &quot;Confidential Information&quot; means any and all information or data disclosed by the Company to the Contractor,
                including but not limited to: product roadmap, pricing, go-to-market strategy; customer and prospect lists;
                architecture diagrams, edge device designs, firmware; AWS account structure, infrastructure details;
                OPC UA, MTConnect, MQTT connectivity methods; analytics and AI approaches; pitch decks, fundraising, partnerships;
                and any other proprietary information.
              </p>

              <h3 className="font-bold text-sm uppercase mt-6 mb-2">3. Obligations of Receiving Party</h3>
              <p>
                The Contractor agrees to hold and maintain the Confidential Information in strict confidence, not disclose
                to any third parties, use solely for the purpose of performing services for the Company, and protect using
                reasonable care.
              </p>

              <h3 className="font-bold text-sm uppercase mt-6 mb-2">4. Exclusions</h3>
              <p>
                Confidential Information does not include information that is publicly available, was rightfully in Contractor&apos;s
                possession prior to disclosure, is independently developed, or is rightfully obtained from a third party.
              </p>

              <h3 className="font-bold text-sm uppercase mt-6 mb-2">5. Non-Circumvention and Non-Solicitation</h3>
              <p>
                Contractor shall not directly or indirectly contact, solicit, or engage with any prospect, customer, or lead
                introduced by Company for 18 months following engagement termination.
              </p>

              <h3 className="font-bold text-sm uppercase mt-6 mb-2">6. No Reverse Engineering</h3>
              <p>
                Contractor shall not reverse engineer, disassemble, decompile, or create derivative works of Company&apos;s software,
                edge devices, firmware, or other technology.
              </p>

              <h3 className="font-bold text-sm uppercase mt-6 mb-2">7. Return or Destruction</h3>
              <p>
                Upon termination or request, Contractor shall return or destroy all Confidential Information and provide
                written certification within 10 business days.
              </p>

              <h3 className="font-bold text-sm uppercase mt-6 mb-2">8. Term and Survival</h3>
              <p>
                This Agreement remains in effect for 2 years. Confidentiality obligations survive for 3 years for general
                information and indefinitely for trade secrets.
              </p>

              <h3 className="font-bold text-sm uppercase mt-6 mb-2">9-14. Additional Terms</h3>
              <p>
                The Agreement includes provisions for No License, Injunctive Relief, Governing Law (North Carolina),
                Assignment, Severability, and Entire Agreement.
              </p>

              <p className="text-xs text-gray-500 mt-6">
                Template Version: {templateVersion}
              </p>
            </div>
          </div>

          {/* Signing Form */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Sign the Agreement</h2>

            <form onSubmit={handleSign} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Full Legal Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    placeholder="John Doe"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    placeholder="john@example.com"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                  Company (Optional)
                </label>
                <input
                  type="text"
                  id="company"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  placeholder="Your Company Inc."
                />
              </div>

              <div>
                <label htmlFor="signature" className="block text-sm font-medium text-gray-700 mb-2">
                  Typed Signature *
                </label>
                <input
                  type="text"
                  id="signature"
                  value={signature}
                  onChange={(e) => setSignature(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition font-signature text-xl"
                  placeholder="Type your full name as signature"
                  required
                  style={{ fontFamily: "'Brush Script MT', 'Segoe Script', cursive" }}
                />
                <p className="text-xs text-gray-500 mt-1">
                  Please type your full name exactly as it appears above
                </p>
              </div>

              <div className="flex items-start">
                <input
                  type="checkbox"
                  id="consent"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  className="mt-1 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  required
                />
                <label htmlFor="consent" className="ml-3 text-sm text-gray-700">
                  I agree that my typed signature above shall have the same legal effect as a handwritten signature
                  and that I have read, understand, and agree to be bound by the terms of this Non-Disclosure Agreement. *
                </label>
              </div>

              {submitError && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <p className="text-red-700">{submitError}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting || !name || !email || !signature || !consent}
                className="w-full bg-blue-600 text-white py-4 px-6 rounded-lg font-semibold text-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Signing..." : "Sign Agreement"}
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  // Success step
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4">
      <div className="max-w-md mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <h1 className="text-2xl font-bold text-gray-900 mb-4">Agreement Signed</h1>
          <p className="text-gray-600 mb-6">
            Thank you for signing the Non-Disclosure Agreement. A copy has been sent to your email address.
          </p>

          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <p className="text-sm text-gray-500">Document ID</p>
            <p className="font-mono text-sm text-gray-900 break-all">{signatureId}</p>
          </div>

          <Link
            href="/"
            className="inline-block bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Return to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function HelioNDAPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-gray-600">Loading...</div>
      </div>
    }>
      <HelioNDAContent />
    </Suspense>
  );
}
