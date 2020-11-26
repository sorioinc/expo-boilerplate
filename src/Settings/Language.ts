import ISO6391 from 'iso-639-1';
import { strEnum } from '../utils';

const Language = strEnum(['es', 'en']);

type Language = keyof typeof Language;
const languagesMeta = Object.keys(Language).map(lang => ({
  label: ISO6391.getNativeName(lang),
  language: Language[lang as Language],
}));

export default Language;

export const languages: Array<{ label: string; language: Language }> = languagesMeta;
