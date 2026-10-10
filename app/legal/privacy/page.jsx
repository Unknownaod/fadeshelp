import Link from "next/link";
import Icon from "@/components/Icon";
import Breadcrumbs from "@/components/Breadcrumbs";
import { SITE } from "@/lib/site";

export const metadata = {
  title: "Privacy Policy",
  description: "How Fades handles your information.",
};

export default function PrivacyPage() {
  return (
    <div className="block page-top narrow">
      <Breadcrumbs items={[{ label: "Privacy Policy" }]} />
      <h1 className="page-title">Privacy Policy</h1>

      <div className="callout warn wide">
        <Icon name="alert" size={18} />
        <div>
          Starting draft. Review and replace this text with your final policy before launch, ideally with legal
          advice. Delete this notice when you do.
        </div>
      </div>

      <div className="prose">
        <h2>What this covers</h2>
        <p>
          This policy explains what information Fades collects when you use Fades products and this help center,
          and the choices you have.
        </p>

        <h2>Information you give us</h2>
        <ul>
          <li>Account details such as your email address.</li>
          <li>Messages you send to support, including your name, email, and what you write.</li>
          <li>Feedback you leave on help articles.</li>
        </ul>

        <h2>How we use it</h2>
        <ul>
          <li>To provide and secure your account and Fades products.</li>
          <li>To answer your support requests.</li>
          <li>To improve the help center and our products.</li>
        </ul>

        <h2>Your choices</h2>
        <p>
          You can ask to access, correct, or delete your information. See{" "}
          <Link href="/articles/data-requests">Request your data</Link> or{" "}
          <Link href="/articles/delete-account">Delete your account</Link>.
        </p>

        <h2>Contact</h2>
        <p>
          Questions? <Link href="/contact">Contact us</Link> or email {SITE.supportEmail}.
        </p>
      </div>
    </div>
  );
}
