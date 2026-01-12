'use client';

import { useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils/cn';
import { locales, type Locale } from '@/lib/i18n/config';
import { images } from '@/assets';

export function SiteHeader() {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations('common');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isPortalsOpen, setIsPortalsOpen] = useState(false);

  const switchLocale = (newLocale: Locale) => {
    const newPathname = pathname.replace(`/${locale}`, `/${newLocale}`);
    router.push(newPathname);
  };

  const navigationLinks = [
    { key: 'contact', href: `/${locale}/contact` },
    { key: 'admissions', href: `/${locale}/admissions` },
    { key: 'careers', href: `/${locale}/careers` },
  ];

  return (
    <header className=" top-0 z-50 w-full bg-stone py-11">
      <div className="container">
        <div className="flex items-center justify-between h-15">
          {/* Left Section: Hamburger Menu + Navigation Links */}
          <div className="flex w-full flex-row items-center justify-start gap-5 md:gap-12 cursor-pointer">
            {/* Hamburger Menu (Mobile) */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-[#00003C] hover:opacity-80 transition-opacity w-[50px] h-[50px]"
              aria-label="Toggle menu"
              aria-expanded={isMobileMenuOpen}
            >
              <Image
                src={images.humberger}
                alt="Hamburger Menu"
                width={50}
                height={50}
                className="object-contain"
              />
            </button>

            {/* Navigation Links (Desktop) */}
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

          {/* Center Section: Logo */}
          <div className="w-full flex items-center justify-center">
            <Link
              href={`/${locale}`}
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

          {/* Right Section: Portals, Language Switcher, Crest Logo */}
          <div className="flex w-full items-center justify-end gap-4 md:gap-6">
            {/* Portals Dropdown */}
            <div className="relative hidden md:block">
              <button
                type="button"
                onClick={() => setIsPortalsOpen(!isPortalsOpen)}
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
                    isPortalsOpen && 'rotate-180'
                  )}
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>

              {/* Portals Dropdown Menu */}
              {isPortalsOpen && (
                <div
                  className={cn(
                    'font-tt-norms font-[450] absolute left-[-10px] right-0 mt-2 rounded-md  z-50',
                    locale === 'vi' ? 'w-52' : 'w-34'
                  )}
                >
                  <Link
                    href={`/${locale}/student-portal`}
                    className="block px-3 py-2 text-base text-primary hover:text-red transition-colors"
                    onClick={() => setIsPortalsOpen(false)}
                  >
                    {t('studentPortal')}
                  </Link>
                  <Link
                    href={`/${locale}/parent-portal`}
                    className="block px-3 py-2 text-base text-primary hover:text-red transition-colors"
                    onClick={() => setIsPortalsOpen(false)}
                  >
                    {t('parentPortal')}
                  </Link>
                  <Link
                    href={`/${locale}/staff-portal`}
                    className="block px-3 py-2 text-base text-primary hover:text-red transition-colors"
                    onClick={() => setIsPortalsOpen(false)}
                  >
                    {t('staffPortal')}
                  </Link>
                </div>
              )}
            </div>

            {/* Language Switcher */}
            <div className="flex items-center gap-2">
              {locales.map((loc) => (
                <button
                  key={loc}
                  type="button"
                  onClick={() => switchLocale(loc)}
                  className={cn(
                    'font-tt-norms font-[450] text-sm uppercase px-2 py-1 transition-opacity cursor-pointer',
                    locale === loc
                      ? 'text-primary font-[750]'
                      : ' text-primary opacity-15'
                  )}
                >
                  {loc === 'en' ? 'EN' : 'VT'}
                </button>
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

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-neutral-200 py-4">
            <nav className="flex flex-col gap-4">
              {navigationLinks.map((link) => (
                <Link
                  key={link.key}
                  href={link.href}
                  className="text-primary font-tt-norms font-[450] text-base hover:opacity-80 transition-opacity px-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {t(link.key)}
                </Link>
              ))}
              {/* Mobile Portals */}
              <div className="px-2">
                <button
                  type="button"
                  onClick={() => setIsPortalsOpen(!isPortalsOpen)}
                  className="flex items-center justify-between w-full text-primary font-tt-norms font-[450] text-base hover:opacity-80 transition-opacity"
                >
                  <span>{t('portals')}</span>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={cn(
                      'transition-transform',
                      isPortalsOpen && 'rotate-180'
                    )}
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </button>
                {isPortalsOpen && (
                  <div className="mt-2 pl-4 flex flex-col gap-2">
                    <Link
                      href={`/${locale}/student-portal`}
                      className="font-tt-norms font-[450] text-sm text-pri hover:opacity-80 transition-opacity"
                      onClick={() => {
                        setIsPortalsOpen(false);
                        setIsMobileMenuOpen(false);
                      }}
                    >
                      Student Portal
                    </Link>
                    <Link
                      href={`/${locale}/parent-portal`}
                      className="font-tt-norms font-[450] text-sm text-[#00003C] hover:opacity-80 transition-opacity"
                      onClick={() => {
                        setIsPortalsOpen(false);
                        setIsMobileMenuOpen(false);
                      }}
                    >
                      Parent Portal
                    </Link>
                    <Link
                      href={`/${locale}/staff-portal`}
                      className="font-tt-norms font-[450] text-sm text-[#00003C] hover:opacity-80 transition-opacity"
                      onClick={() => {
                        setIsPortalsOpen(false);
                        setIsMobileMenuOpen(false);
                      }}
                    >
                      Staff Portal
                    </Link>
                  </div>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>

      {/* Click outside to close dropdowns */}
      {(isPortalsOpen || isMobileMenuOpen) && (
        <div
          className="fixed inset-0 z-40 md:hidden"
          onClick={() => {
            setIsPortalsOpen(false);
            setIsMobileMenuOpen(false);
          }}
          aria-hidden="true"
        />
      )}
      {isPortalsOpen && (
        <div
          className="hidden md:block fixed inset-0 z-40"
          onClick={() => setIsPortalsOpen(false)}
          aria-hidden="true"
        />
      )}
    </header>
  );
}
