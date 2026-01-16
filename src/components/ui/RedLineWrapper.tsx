'use client';

import { usePathname } from 'next/navigation';
import { RedLine } from './RedLine';
import { shouldShowRedLine } from '@/lib/config/redline';

/**
 * Wrapper component that conditionally renders RedLine based on route configuration
 */
export function RedLineWrapper() {
  const pathname = usePathname();
  const showRedLine = shouldShowRedLine(pathname);

  if (!showRedLine) {
    return null;
  }

  return <RedLine />;
}
