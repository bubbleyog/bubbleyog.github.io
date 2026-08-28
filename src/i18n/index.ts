import zh from './ui/zh.json';
import en from './ui/en.json';

export type Locale = 'zh' | 'en';

const dictionaries = { zh, en } as const;

export function t(lang: Locale, key: string): string {
  const dict = dictionaries[lang] as Record<string, unknown>;
  const value = key.split('.').reduce<unknown>((acc, k) => {
    if (acc && typeof acc === 'object') {
      return (acc as Record<string, unknown>)[k];
    }
    return undefined;
  }, dict);
  return typeof value === 'string' ? value : key;
}

export function getUiDictionary(lang: Locale): typeof zh {
  return dictionaries[lang];
}
