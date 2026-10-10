import Link from "next/link";
import Icon from "@/components/Icon";
import Breadcrumbs from "@/components/Breadcrumbs";
import { SITE } from "@/lib/site";

export const metadata = {
  title: "Terms of Service",
  description: "The terms for using Fades products and this help center.",
};

export default function TermsPage() {
  return (
    <div className="block page-top narrow">
      <Breadcrumbs items={[{ label: "Terms of Service" }]} />
      <h1 className="page-title">Terms of Service</h1>

      <div className="callout warn wide">
        <Icon name="alert" size={18} />
        <div>
          Starting draft. Review and replace this text with your final terms before launch, ideally with legal
          advice. Delete this notice when you do.
        </div>
      </div>

      <div className="prose">
        <h2>Using Fades</h2>
        <p>
          By using Fades products or this help center you agree to these terms. If you don't agree, please don't
          use them.
        </p>

        <h2>Your account</h2>
        <ul>
          <li>Keep your password private and your account details accurate.</li>
          <li>You're responsible for activity on your account.</li>
          <li>
            Tell us right away if you think your account was compromised. See{" "}
            <Link href="/articles/account-hacked">My account was hacked</Link>.
          </li>
        </ul>

        <h2>Acceptable use</h2>
        <ul>
          <li>Don't use Fades to break the law or harm others.</li>
          <li>Don't try to disrupt, probe, or gain unauthorized access to our services.</li>
          <li>Don't abuse support channels or send spam.</li>
        </ul>

        <h2>Changes</h2>
        <p>We may update these terms and products over time. We'll post changes here.</p>

        <h2>Contact</h2>
        <p>
          Questions? <Link href="/contact">Contact us</Link> or email {SITE.supportEmail}.
        </p>
      </div>
    </div>
  );
}
