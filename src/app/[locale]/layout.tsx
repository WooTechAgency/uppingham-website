import * as React from 'react';
import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import { locales, type Locale } from '@/lib/i18n/config';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { RedLineWrapper } from '@/components/ui/RedLineWrapper';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!(locales as readonly string[]).includes(locale)) notFound();

  const messages = (await import(`@/lib/i18n/messages/${locale}.json`)).default;

  return (
    <NextIntlClientProvider locale={locale as Locale} messages={messages}>
      <div className="flex flex-col min-h-screen relative">
        <SiteHeader />
        <main className="flex-1 relative">
          <RedLineWrapper />
          {children}
        </main>
        <SiteFooter />
      </div>
    </NextIntlClientProvider>
  );
}
