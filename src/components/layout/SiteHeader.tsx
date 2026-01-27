'use client';

import { useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';

import { cn } from '@/lib/utils/cn';
import { locales, type Locale } from '@/lib/i18n/config';
import { Link, getPathname, usePathname } from '@/lib/i18n/navigation';

import { images } from '@/assets';
import { FullScreenMenu } from './FullScreenMenu';

export function SiteHeader() {
  const locale = useLocale() as Locale;
  const t = useTranslations('common');
  const pathname = usePathname();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isPortalsOpen, setIsPortalsOpen] = useState(false);

  const navigationLinks = [
    { key: 'contact', href: '/contact' as const },
    { key: 'admissions', href: '/admissions' as const },
    { key: 'careers', href: '/careers' as const },
  ];

  const portalsLinks = [
    { key: 'studentPortal', href: '/student-portal' as const },
    { key: 'parentPortal', href: '/parent-portal' as const },
    { key: 'staffPortal', href: '/staff-portal' as const },
  ];

  return (
    <header
      className={cn(
        'relative top-0 w-full bg-stone py-11',
        isMobileMenuOpen ? 'z-70' : 'z-50',
      )}
    >
      <div className="container">
        <div className="flex items-center justify-between h-15">
          {/* Left: Hamburger + Nav */}
          <div className="flex w-full items-center justify-start gap-5 md:gap-12">
            {/* Hamburger (Mobile) */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen((v) => !v)}
              className="group w-[50px] h-[50px] flex items-center justify-center relative"
              aria-label="Toggle menu"
              aria-expanded={isMobileMenuOpen}
            >
              {/* Hamburger icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="27"
                height="18"
                viewBox="0 0 27 18"
                fill="none"
                className={cn(
                  'absolute transition-opacity duration-300',
                  isMobileMenuOpen ? 'opacity-0' : 'opacity-100',
                )}
              >
                <path d="M0 1H27" stroke="#00003C" strokeWidth="2" />
                <path d="M0 9H27" stroke="#00003C" strokeWidth="2" />
                <path d="M0 17H27" stroke="#00003C" strokeWidth="2" />
              </svg>

              {/* Close icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="26"
                height="26"
                viewBox="0 0 26 26"
                fill="none"
                className={cn(
                  'absolute transition-opacity duration-300',
                  isMobileMenuOpen ? 'opacity-100' : 'opacity-0',
                )}
              >
                <path
                  d="M24.7109 0.707031L0.710938 24.707"
                  stroke="#00003C"
                  strokeWidth="2"
                  strokeLinejoin="round"
                />
                <path
                  d="M0.710938 0.707031L24.7109 24.707"
                  stroke="#00003C"
                  strokeWidth="2"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center justify-start gap-5">
              {navigationLinks.map((link) => (
                <Link
                  key={link.key}
                  href={link.href}
                  className="text-[#00003C] font-tt-norms font-[450] text-base hover:opacity-80 transition-opacity"
                >
                  {t(link.key)}
                </Link>
              ))}
            </nav>
          </div>

          {/* Center: Logo */}
          <div className="w-full flex items-center justify-center">
            <Link
              href="/"
              className="flex flex-col items-center hover:opacity-80 transition-opacity w-[209px] h-[50px]"
            >
              <Image
                src={images.logo}
                alt="Uppingham Logo"
                width={209}
                height={50}
                className="object-contain"
              />
            </Link>
          </div>

          {/* Right: Portals + Language + Crest */}
          <div className="flex w-full items-center justify-end gap-4 md:gap-6">
            {/* Portals Dropdown */}
            <div className="relative hidden md:block">
              <button
                type="button"
                onClick={() => setIsPortalsOpen((v) => !v)}
                className="flex items-center gap-2 text-[#00003C] font-tt-norms font-[450] text-base hover:opacity-80 transition-opacity"
                aria-expanded={isPortalsOpen}
                aria-haspopup="true"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke={isPortalsOpen ? 'var(--red)' : 'currentColor'}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
                <span
                  className={cn(isPortalsOpen ? 'text-red' : 'text-primary')}
                >
                  {t('portals')}
                </span>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke={isPortalsOpen ? 'var(--red)' : 'currentColor'}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={cn(
                    'transition-transform',
                    isPortalsOpen && 'rotate-180',
                  )}
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>

              {/* Dropdown menu */}
              {isPortalsOpen && (
                <div
                  className={cn(
                    'font-tt-norms font-[450] absolute left-[0px] right-0 mt-2 rounded-md z-50 bg-stone',
                    locale === 'vi' ? 'w-52' : 'w-34',
                  )}
                >
                  {portalsLinks.map((item) => (
                    <Link
                      key={item.key}
                      href={item.href}
                      className="block px-3 py-2 text-base text-primary hover:text-red transition-colors"
                      onClick={() => setIsPortalsOpen(false)}
                    >
                      {t(item.key)}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* ✅ Language Switcher (always resolves translated pathnames) */}
            <div className="flex items-center gap-2">
              {locales.map((loc) => (
                <Link
                  key={loc}
                  href={pathname}
                  locale={loc}
                  className={cn(
                    'font-tt-norms font-[450] text-sm uppercase px-2 py-1 transition-opacity cursor-pointer',
                    locale === loc
                      ? 'text-primary font-[750]'
                      : 'text-primary opacity-20',
                  )}
                >
                  {loc === 'en' ? 'EN' : 'VT'}
                </Link>
              ))}
            </div>

            {/* Crest Logo */}
            <div className="hidden lg:block">
              <Image
                src="/uppingham-logo.svg"
                alt="Uppingham Crest"
                width={48}
                height={48}
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Full Screen Menu */}
      <FullScreenMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </header>
  );
}
