'use client';

import { useLocale, useTranslations } from 'next-intl';
import { Link } from '@/components/ui/Link';

export function SiteFooter() {
  const locale = useLocale();
  const t = useTranslations('common');

  const currentYear = new Date().getFullYear();

  const footerLinks = [
    { key: 'contact', href: `/${locale}/contact` },
    { key: 'admissions', href: `/${locale}/admissions` },
    { key: 'careers', href: `/${locale}/careers` },
  ];

  return (
    <footer className="bg-white border-t border-neutral-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 md:gap-8">
          {/* Left: Footer Links */}
          <nav className="flex flex-wrap items-center justify-center md:justify-start gap-4 md:gap-6">
            {footerLinks.map((link) => (
              <Link key={link.key} href={link.href} variant="menuFooter">
                {t(link.key)}
              </Link>
            ))}
          </nav>

          {/* Right: Copyright */}
          <div className="text-center md:text-right">
            <p className="text-neutral-600 text-sm font-tt-norms">
              © {currentYear} Uppingham Vietnam. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
