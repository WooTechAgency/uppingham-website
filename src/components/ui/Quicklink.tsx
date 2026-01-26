'use client';

import { useState, useRef, useEffect } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import Link from 'next/link';
import { cn } from '@/lib/utils/cn';
import { type Locale } from '@/lib/i18n/config';
import { BookTourIcon, EnquireIcon, QuickMenuIcon } from '@/assets';

type QuickLinkMenuItem = {
  key: string;
  href?: string;
  children?: QuickLinkMenuItem[];
};

type QuicklinkProps = {
  menuTitle?: string;
  menuItems?: QuickLinkMenuItem[];
};

export function Quicklink({ menuTitle, menuItems = [] }: QuicklinkProps) {
  const locale = useLocale() as Locale;
  const t = useTranslations('quicklink');
  const tMenu = useTranslations('menu');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        buttonRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  const bookTourHref = `/${locale}/book-tour`;
  const enquireHref = `/${locale}/contact`;

  const renderMenuItem = (
    item: QuickLinkMenuItem,
    index: number,
    allItems: QuickLinkMenuItem[],
    level: number = 0,
  ) => {
    const hasChildren = item.children && item.children.length > 0;
    const translationKey =
      level === 0
        ? `learningSubmenu.${item.key}`
        : `learningSubmenu2.internationalCurriculum.${item.key}`;

    const isSub = level !== 0;
    const isFirst = index === 0;
    const isLast = index === allItems.length - 1;

    const subPadding = cn('py-2', isFirst && 'pt-0', isLast && 'pb-4');

    return (
      <div key={item.key}>
        {item.href ? (
          <Link
            href={item.href}
            className={cn(
              'block py-4 text-primary font-[450] hover:text-secondary transition-colors font-tt-norms',
              level === 0 ? 'text-base ' : cn('text-sm pl-[30px]', subPadding),
            )}
            onClick={() => setIsMenuOpen(false)}
          >
            {tMenu(translationKey as any)}
          </Link>
        ) : (
          <span
            className={cn(
              'block py-4 px-0 font-[450] text-primary font-tt-norms',
              level === 0 ? 'text-base ' : cn('text-sm pl-[30px]', subPadding),
            )}
          >
            {tMenu(translationKey as any)}
          </span>
        )}
        {hasChildren && (
          <div className="ml-0">
            {item.children!.map((child, childIndex) =>
              renderMenuItem(child, childIndex, item.children!, level + 1),
            )}
          </div>
        )}
        {index < allItems.length - 1 && level === 0 && (
          <div className="h-[1px] bg-dark-stone" />
        )}
      </div>
    );
  };

  return (
    <div className="fixed right-0 top-1/2 -translate-y-1/2 z-50 flex flex-col flex-col gap-4">
      {/* Book Tour Button */}
      <Link
        href={bookTourHref}
        className="flex flex-col items-center justify-center gap-3 bg-primary px-4 py-4 w-[96px] min-h-[92px] border-b-[4px] border-secondary transition-opacity  "
      >
        <BookTourIcon className="text-white w-5 h-auto" />
        <span className="text-white text-[14px] font-[450] font-tt-norms text-center">
          {t('bookTour')}
        </span>
      </Link>

      {/* Enquire Button */}
      <Link
        href={enquireHref}
        className="flex flex-col items-center justify-center gap-3 bg-primary px-4 py-4 w-[96px] min-h-[92px] border-b-[4px] border-secondary transition-opacity "
      >
        <EnquireIcon className="text-white w-5 h-auto" />
        <span className="text-white text-[14px] font-[450] font-tt-norms text-center">
          {t('enquire')}
        </span>
      </Link>

      {/* Quick Menu Button */}
      <div className="relative">
        <button
          ref={buttonRef}
          type="button"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className={cn(
            'flex flex-col items-center justify-center gap-3 bg-primary px-4 py-4 w-[96px] min-h-[92px] border-b-[4px] border-secondary transition-opacity',
            isMenuOpen ? 'bg-secondary' : 'bg-primary',
          )}
          aria-label={t('quickMenu')}
          aria-expanded={isMenuOpen}
        >
          <QuickMenuIcon className="text-white w-5 h-auto" />
          <span className="text-white text-[14px] font-[450] font-tt-norms text-center">
            <span className="block">{t('quickMenu')}</span>
          </span>
        </button>
      </div>

      {/* Quick Menu Popup */}
      {isMenuOpen && menuItems.length > 0 && (
        <div
          ref={menuRef}
          className="absolute right-full top-[50%] -translate-y-1/2 mr-6 bg-white min-w-[clamp(200px,20vw,290px)] z-[60]"
        >
          <div className="p-4">
            {/* Header */}
            {menuTitle && (
              <div className="mb-4">
                <h3 className="text-secondary text-[15px] font-[450] text-sm uppercase mb-2 font-tt-norms">
                  {menuTitle}
                </h3>
              </div>
            )}

            {/* Menu Items */}
            <nav className="flex flex-col">
              {menuItems.map((item, index) =>
                renderMenuItem(item, index, menuItems),
              )}
            </nav>
          </div>
        </div>
      )}
    </div>
  );
}
