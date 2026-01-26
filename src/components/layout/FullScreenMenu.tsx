'use client';

import { useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { Link } from '@/components/sections/Link';
import { cn } from '@/lib/utils/cn';
import { getMenuData } from '@/lib/data/menu';
import { type MenuItem } from '@/types/menu';
import { type Locale } from '@/lib/i18n/config';
import { ArrowIcon } from '@/assets';

type FullScreenMenuProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function FullScreenMenu({ isOpen, onClose }: FullScreenMenuProps) {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const t = useTranslations('menu');
  const menuData = getMenuData(locale);

  const [selectedLevel1, setSelectedLevel1] = useState<string | null>(null);
  const [selectedLevel2, setSelectedLevel2] = useState<string | null>(null);

  const handleLevel1ArrowClick = (item: MenuItem, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (item.children && item.children.length > 0) {
      setSelectedLevel1(item.key);
      setSelectedLevel2(null);
    }
  };

  const handleLevel2ArrowClick = (item: MenuItem, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (item.children && item.children.length > 0) {
      setSelectedLevel2(item.key);
    }
  };

  const handleLevel1Click = (item: MenuItem) => {
    if (item.children && item.children.length > 0) {
      setSelectedLevel1(item.key);
      setSelectedLevel2(null);
    } else if (item.href) {
      router.push(item.href);
      onClose();
    }
  };

  const handleLevel2Click = (item: MenuItem, parentKey: string) => {
    if (item.children && item.children.length > 0) {
      setSelectedLevel2(item.key);
    } else if (item.href) {
      router.push(item.href);
      onClose();
    }
  };

  const handleLevel3Click = (href: string) => {
    router.push(href);
    onClose();
  };

  const selectedLevel1Item = menuData.find(
    (item) => item.key === selectedLevel1,
  );
  const selectedLevel2Item = selectedLevel1Item?.children?.find(
    (item) => item.key === selectedLevel2,
  );

  // Helper function to get translation for level 2 items
  const getLevel2Translation = (parentKey: string, itemKey: string): string => {
    if (parentKey === 'about') {
      return t(`aboutSubmenu.${itemKey}` as any);
    }
    if (parentKey === 'learning') {
      return t(`learningSubmenu.${itemKey}` as any);
    }
    if (parentKey === 'life') {
      return t(`lifeSubmenu.${itemKey}` as any);
    }
    if (parentKey === 'ourCampuses') {
      return t(`ourCampusesSubmenu.${itemKey}` as any);
    }
    if (parentKey === 'admissions') {
      return t(`admissionsSubmenu.${itemKey}` as any);
    }
    if (parentKey === 'community') {
      return t(`communitySubmenu.${itemKey}` as any);
    }
    if (parentKey === 'contact') {
      return t(`contactSubmenu.${itemKey}` as any);
    }
    return itemKey;
  };

  // Helper function to get translation for level 3 items
  const getLevel3Translation = (
    level1Key: string,
    level2Key: string,
    itemKey: string,
  ): string => {
    if (level1Key === 'about' && level2Key === 'internationalCurriculum') {
      return t(`aboutSubmenu2.internationalCurriculum.${itemKey}` as any);
    }
    if (level1Key === 'learning' && level2Key === 'internationalCurriculum') {
      return t(`learningSubmenu2.internationalCurriculum.${itemKey}` as any);
    }
    if (level1Key === 'life' && level2Key === 'houseStructure') {
      return t(`lifeSubmenu2.houseStructure.${itemKey}` as any);
    }
    if (level1Key === 'life' && level2Key === 'coCurricularActivities') {
      return t(`lifeSubmenu2.coCurricularActivities.${itemKey}` as any);
    }
    return itemKey;
  };

  if (!isOpen) return null;

  return (
    <div className="absolute top-full left-0 right-0 z-[100] bg-primary flex flex-col h-[calc(100vh-148px)]">
      <div className="container">
        {/* Main Menu Content - 3 Columns */}
        <div className="py-[108px] flex-1 flex overflow-hidden justify-space-between gap-[clamp(100px,10vw,200px)]">
          {/* Column 1: Level 1 Menu */}
          <div className="flex-shrink-0 w-full sm:w-1/3 lg:w-1/4 border-r border-primary/20 overflow-y-auto">
            <div className=" pr-[clamp(20px, 5vw, 40px)]">
              <nav className="flex flex-col gap-5">
                {menuData.map((item) => {
                  const isActive = selectedLevel1 === item.key;
                  const hasChildren = item.children && item.children.length > 0;

                  return (
                    <div key={item.key} className="group flex items-center">
                      {/* Text - Click to navigate */}
                      {item.href ? (
                        <Link
                          href={item.href}
                          className={cn(
                            'flex-1 py-3 px-0 font-tt-norms  font-[450] leading-[34px] text-[24px] uppercase transition-colors',
                            isActive
                              ? 'text-secondary'
                              : 'text-white hover:text-secondary',
                          )}
                          onClick={onClose}
                        >
                          {t(item.key as any)}
                        </Link>
                      ) : (
                        <span
                          className={cn(
                            'flex-1 py-3 px-2 font-tt-norms font-[450] text-base uppercase',
                            isActive ? 'text-secondary' : 'text-white',
                          )}
                        >
                          {t(item.key as any)}
                        </span>
                      )}
                      {/* Arrow - Click to show submenu */}
                      {hasChildren && (
                        <button
                          type="button"
                          onClick={(e) => handleLevel1ArrowClick(item, e)}
                          className={cn(
                            'p-2 transition-colors cursor-pointer',
                            isActive
                              ? 'text-secondary'
                              : 'text-white hover:text-secondary',
                          )}
                          aria-label="Show submenu"
                        >
                          <ArrowIcon />
                        </button>
                      )}
                    </div>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Column 2: Level 2 Menu */}
          {selectedLevel1Item && selectedLevel1Item.children && (
            <div className="flex-shrink-0 w-full sm:w-1/3 lg:w-1/4 border-r border-primary/20 overflow-y-auto animate-in slide-in-from-left duration-300">
              <div className="pr-[clamp(20px, 5vw, 40px)]">
                <nav className="flex flex-col gap-5">
                  {selectedLevel1Item.children.map((item) => {
                    const isActive = selectedLevel2 === item.key;
                    const hasChildren =
                      item.children && item.children.length > 0;

                    return (
                      <div key={item.key} className="group flex items-center">
                        {/* Text - Click to navigate */}
                        {item.href ? (
                          <Link
                            href={item.href}
                            variant="body"
                            className={cn(
                              'flex-1 py-[10px] px-2 transition-colors ',
                              isActive
                                ? 'text-secondary'
                                : 'text-white hover:text-secondary',
                            )}
                            onClick={onClose}
                          >
                            {getLevel2Translation(selectedLevel1!, item.key)}
                          </Link>
                        ) : (
                          <span
                            className={cn(
                              'flex-1 py-[10px] px-2 font-tt-norms font-[450] text-[20px] leading-[30px]',
                              isActive ? 'text-secondary' : 'text-white',
                            )}
                          >
                            {getLevel2Translation(selectedLevel1!, item.key)}
                          </span>
                        )}
                        {/* Arrow - Click to show submenu */}
                        {hasChildren && (
                          <button
                            type="button"
                            onClick={(e) => handleLevel2ArrowClick(item, e)}
                            className={cn(
                              'p-2 transition-colors cursor-pointer',
                              isActive
                                ? 'text-secondary'
                                : 'text-white hover:text-secondary',
                            )}
                            aria-label="Show submenu"
                          >
                            <ArrowIcon />
                          </button>
                        )}
                      </div>
                    );
                  })}
                </nav>
              </div>
            </div>
          )}

          {/* Column 3: Level 3 Menu */}
          {selectedLevel2Item && selectedLevel2Item.children && (
            <div className="flex-shrink-0 w-full sm:w-1/3 lg:w-1/4 overflow-y-auto animate-in slide-in-from-left duration-300">
              <div className="pr-[clamp(20px, 5vw, 40px)]">
                <nav className="flex flex-col gap-2">
                  {selectedLevel2Item.children.map((item) => (
                    <Link
                      key={item.key}
                      href={item.href!}
                      className={cn(
                        'flex-1 py-[10px] px-2 transition-colors font-tt-norms font-[450] text-[20px] leading-[30px] text-white hover:text-secondary',
                      )}
                      onClick={() => handleLevel3Click(item.href!)}
                    >
                      {getLevel3Translation(
                        selectedLevel1!,
                        selectedLevel2!,
                        item.key,
                      )}
                    </Link>
                  ))}
                </nav>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
