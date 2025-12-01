import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Header } from "@/components/landing/Header";
import Footer4Col from "@/components/ui/footer-column";

export default function MlsCompliance() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <Link to="/">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </Link>

        <article className="prose prose-slate max-w-none">
          <h1 className="text-4xl font-bold mb-2">MLS Compliance for Portland Real Estate</h1>

          <div className="text-sm text-muted-foreground mb-8">
            <p>
              <strong>Region Focus:</strong> Portland, Oregon (RMLS service area)
            </p>
            <p>
              <strong>Legal Entity:</strong> The Landry Method LLC
            </p>
          </div>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Our Commitment to MLS Compliance</h2>
            <p>
              The Landry Method exists to help Portland-area agents show every property at its best
              while staying on the right side of MLS rules. You should be able to trust that the
              same images that delight your sellers will also sit comfortably inside your MLS and
              brokerage guidelines.
            </p>
            <p>
              We work as a direct service provider—not a DIY app—so a real person reviews every set
              of photos with MLS compliance in mind, especially RMLS expectations for Portland-area
              listings. Our job is to help your listings stand out without creating MLS headaches
              for you later.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Why MLS Rules Matter</h2>
            <p>
              MLS rules aren&apos;t there just to add paperwork—they exist to keep listing data fair,
              accurate, and trustworthy for everyone in the market. In and around Portland, RMLS is
              the system that sets those expectations, including what is and is not allowed in
              listing photos. Those rules cover things like:
            </p>
            <ul>
              <li>How photos may be edited or enhanced</li>
              <li>When virtual staging must be disclosed</li>
              <li>What kinds of text, branding, or people can appear in photos (usually: they cannot)</li>
              <li>How sample images and new construction photos should be labeled</li>
            </ul>
            <p>
              When photos cross those lines, the MLS can send notices, assess fines, or even remove
              images. We design our process so your photos help your listings shine without putting
              your compliance record at risk.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">How We Align With RMLS Photo Rules</h2>
            <p>
              Our internal handbook is built around the published RMLS Rules &amp; Regulations, including
              Section 3.8 on photographs. In practice, that means we:
            </p>
            <ul>
              <li>
                Avoid adding any text or graphics that could misrepresent the property or look like
                advertising (no logos, no contact info, no business names on images).
              </li>
              <li>
                Do not place people in listing photos and avoid content that could raise Fair Housing
                concerns.
              </li>
              <li>
                Use enhancements to clarify the space—not to hide defects or change the fundamental
                nature of the property.
              </li>
              <li>
                Support clear labels such as "Virtually Staged" or "Sample Image" where your MLS or
                broker requires them.
              </li>
            </ul>
            <p>
              When you tell us a project is headed for RMLS or another MLS, we treat that as a
              non-negotiable compliance requirement, not a nice-to-have.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Virtual Staging &amp; Disclosure</h2>
            <p>
              Virtual staging is meant to help buyers picture what&apos;s possible in a space—not to
              pretend something exists that doesn&apos;t. Clear disclosure keeps that line honest. Based
              on our handbook and RMLS guidance for Portland-area listings:
            </p>
            <ul>
              <li>
                Any photo that has been virtually staged should be clearly disclosed as such, for
                example with a visible "Virtually Staged" label on the image.
              </li>
              <li>
                Listing remarks should make it clear that some photos are virtually staged, using
                language like: "Photos are virtually staged to help buyers visualize the potential of
                the space."
              </li>
              <li>
                For new construction, if a photo shows a similar home rather than the exact property,
                it should be treated and labeled as a "Sample Image".
              </li>
            </ul>
            <p>
              We build our projects and file naming around these expectations so you can focus on
              selling the property instead of worrying about whether a photo will get flagged.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Your Role as the Listing Agent</h2>
            <p>
              Even with all the checks we do on our side, you and your broker make the final call on how photos are used in your MLS. To keep everything clean and compliant, we recommend that you:
            </p>
            <ul>
              <li>
                Review the latest RMLS Rules & Regulations and any "Rules Roundup" updates specific to photos and virtual staging.
              </li>
              <li>
                Confirm your brokerage's marketing and photo policies, which may be stricter than the MLS baseline.
              </li>
              <li>
                Ensure final uploads to your MLS include any required labels (such as "Virtually Staged" or "Sample Image") and appropriate listing remarks.
              </li>
              <li>
                Consult your broker, MLS compliance team, or legal counsel if you are unsure how a specific image should be used.
              </li>
            </ul>
            <p>
              We are happy to adjust files or regenerate images when that helps you comply with your
              MLS requirements.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">MLS Rules Vary by Market</h2>
            <p>
              While this page focuses on Portland, Oregon and the RMLS service area, MLS rules are not
              one-size-fits-all. Each MLS can have its own rulebook, forms of enforcement, and
              expectations around virtual staging, photo edits, and disclosures.
            </p>
            <p>
              If you list properties outside the Portland region or in multiple markets, please check
              with your local MLS and broker for the most current requirements. We can tailor how we
              deliver files to better match the rules where you work.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">How The Landry Method Supports You</h2>
            <p>
              Our priority is to help your business grow while protecting your reputation with
              clients, your brokerage, and your MLS. That looks like:
            </p>
            <ul>
              <li>Manual review of every project by a real person—not a fully automated tool.</li>
              <li>Strict avoidance of misleading edits or "too good to be true" representations.</li>
              <li>Clear communication if we think a requested change might raise compliance concerns.</li>
              <li>
                Flexible delivery (email, Slack, or other channels) so you can keep a clean audit
                trail of what was sent and when.
              </li>
            </ul>
            <p>
              We see ourselves as your behind-the-scenes partner, helping you present listings in a
              way that is both compelling and compliant.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Questions About MLS or Compliance?</h2>
            <p>
              We are not a law firm and we do not give legal advice, but we are happy to talk through
              how our service works alongside your MLS obligations. If you have a specific concern
              about a project or image:
            </p>
            <ul>
              <li>Include a note when you submit your order describing your MLS or brokerage rules.</li>
              <li>
                Email us at <a href="mailto:support@thelandrymethod.com">support@thelandrymethod.com</a>
                
                with the MLS name and a short description of your question.
              </li>
              <li>
                We will flag any obvious issues we see and adjust our work where possible to better
                align with your rules.
              </li>
            </ul>
            <p>
              Ultimately, compliance decisions sit with you and your broker—but we are here to
              support you every step of the way.
            </p>
          </section>
        </article>
      </main>

      <Footer4Col />
    </div>
  );
}
