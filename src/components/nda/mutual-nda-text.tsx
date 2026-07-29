/**
 * The v3.0 mutual NDA text as displayed to signers. This must stay in sync
 * with nda-signer/src/templates/nda-v3-mutual.js, which renders the PDF the
 * counterparty actually executes.
 */
export function MutualNdaText() {
  return (
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
  );
}
