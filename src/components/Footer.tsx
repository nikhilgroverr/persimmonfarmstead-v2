import Link from "next/link";
import { site, primaryPhone, telHref } from "@/lib/site";

const exploreLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Stay", href: "/stay" },
  { label: "Amenities", href: "/amenities" },
  { label: "Location", href: "/#location" },
];

const stayLinks = [
  { label: "Persimmon Farmstead", href: "/stays/farmstead" },
  { label: "Farmstead Shanag", href: "/stays/shanag" },
  { label: "All Amenities", href: "/amenities" },
];

export default function Footer() {
  return (
    <footer className="relative w-full bg-cream-soft text-ink px-6 pt-20 pb-10 border-t border-ink/10">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-[1.4fr_1fr_1fr_1.2fr] gap-12 md:gap-8 mb-16">
          <div>
            <p className="font-display italic text-2xl mb-4 text-ink">
              Persimmon Farmstead
            </p>
            <p className="text-ink/55 font-body text-sm leading-relaxed max-w-xs">
              A quiet retreat in Hallan Valley, Himachal Pradesh &mdash;
              where comfort feels personal, never staged.
            </p>
          </div>

          <div>
            <p className="text-terracotta-dark font-body text-xs tracking-[0.25em] uppercase mb-5">
              Explore
            </p>
            <ul className="space-y-3">
              {exploreLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-ink/60 font-body text-sm transition-colors hover:text-terracotta-dark"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-terracotta-dark font-body text-xs tracking-[0.25em] uppercase mb-5">
              Stay
            </p>
            <ul className="space-y-3">
              {stayLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-ink/60 font-body text-sm transition-colors hover:text-terracotta-dark"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-terracotta-dark font-body text-xs tracking-[0.25em] uppercase mb-5">
              Get in Touch
            </p>
            <ul className="space-y-3 text-ink/60 font-body text-sm">
              <li>
                <a href={`mailto:${site.email}`} className="transition-colors hover:text-terracotta-dark break-all">
                  {site.email}
                </a>
              </li>
              <li>
                <a href={telHref(primaryPhone.raw)} className="transition-colors hover:text-terracotta-dark">
                  {primaryPhone.label}
                </a>
              </li>
              <li className="text-ink/50 leading-relaxed pt-1">
                {site.address.lines[0]}
                <br />
                {site.address.lines[1]}
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-ink/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-ink/40 font-body text-xs">
            &copy; {new Date().getFullYear()} Persimmon Farmstead. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href={site.social.instagram.url} target="_blank" rel="noopener noreferrer" className="text-ink/40 font-body text-xs transition-colors hover:text-terracotta-dark">
              Instagram
            </a>
            <a href={site.social.facebook.url} target="_blank" rel="noopener noreferrer" className="text-ink/40 font-body text-xs transition-colors hover:text-terracotta-dark">
              Facebook
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}