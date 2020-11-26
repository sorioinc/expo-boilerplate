import * as Localization from 'expo-localization';

const detectedLanguage = Localization.locale.split('-')[0];

export default detectedLanguage;
