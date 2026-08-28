import type { Locale } from '../i18n';

export function getLangFromUrl(url: URL): Locale {
  const [, first = ''] = url.pathname.split('/');
  return first === 'en' ? 'en' : 'zh';
}

export function formatDate(dateStr: string, lang: Locale): string {
  const date = new Date(dateStr);
  if (Number.isNaN(date.getTime())) return dateStr;
  return date.toLocaleDateString(lang === 'zh' ? 'zh-CN' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}
