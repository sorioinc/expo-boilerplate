import { format } from 'date-fns';
import { es, enUS } from 'date-fns/locale';

import detectedLanguage from './detected-language';

// by providing a default string of 'PP' or any of its variants for `formatDate`
// it will format dates in whichever way is appropriate to the locale
export function formatDate(date: Date, formatStr?: string): string;
export function formatDate(date: Date, formatStr?: string, language?: string): string;
export function formatDate(date: Date, formatStr = 'PP', language?: string): string {
  let lang = language;
  if (!lang) {
    lang = detectedLanguage;
  }
  const locale = lang === 'es' ? es : enUS;
  return format(date, formatStr, {
    locale,
  });
}
