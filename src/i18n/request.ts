import { getRequestConfig } from 'next-intl/server';

/**
 * Dynamically import locale messages.
 * Using a dynamic `import()` ensures that the JSON files are bundled correctly
 * by Next.js/Turbopack and works both in development and in the production
 * server environment where the working directory may differ.
 */
export default getRequestConfig(async ({ locale }) => {
  const defaultLocale = 'ro';
  const activeLocale = locale ?? defaultLocale;
  try {
    // `../messages` is relative to this file (`src/i18n`)
    const messages = (await import(`../messages/${activeLocale}.json`)).default;
    return { locale: activeLocale, messages };
  } catch (e) {
    console.warn('Locale messages not found for', activeLocale, e);
    // Fallback to an empty object to avoid runtime MISSING_MESSAGE errors
    return { locale: defaultLocale, messages: {} };
  }
});
