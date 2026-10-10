import { SITE } from "@/lib/site";

export default function Logo({ size = 34 }) {
  return (
    <img
      src={SITE.logo}
      alt="Fades"
      style={{ width: size, height: "auto", objectFit: "contain", display: "block" }}
    />
  );
}
