/**
 * Configuration for RedLine component visibility
 * Add route paths (without locale prefix) that should display RedLine
 */
export const redlineRoutes = [
  '/', // Home page
  '/about',
  '/learning',
  // Add more routes as needed
  // '/contact',
  // '/admissions',
] as const;

/**
 * Check if a route should display RedLine
 * @param pathname - Full pathname including locale (e.g., '/en/about' or '/vi')
 * @returns boolean
 */
export function shouldShowRedLine(pathname: string): boolean {
  // Remove locale prefix (e.g., '/en' or '/vi')
  const pathWithoutLocale = pathname.replace(/^\/(en|vi)/, '') || '/';
  
  return redlineRoutes.some((route) => {
    // Exact match for home page
    if (route === '/' && pathWithoutLocale === '/') {
      return true;
    }
    // Match routes that start with the configured route
    return pathWithoutLocale.startsWith(route);
  });
}

