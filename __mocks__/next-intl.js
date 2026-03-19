function useTranslations(namespace) {
  const t = (key, values) => {
    const fullKey = namespace ? `${namespace}.${key}` : key;
    if (values) {
      return Object.entries(values).reduce(
        (acc, [k, v]) => acc.replace(`{${k}}`, String(v)),
        fullKey
      );
    }
    return fullKey;
  };

  t.rich = (key) => {
    const fullKey = namespace ? `${namespace}.${key}` : key;
    return fullKey;
  };

  return t;
}

function useLocale() {
  return "en";
}

function useMessages() {
  return {};
}

function useFormatter() {
  return {};
}

function NextIntlClientProvider({ children }) {
  return children;
}

function hasLocale(locales, locale) {
  return locales.includes(locale);
}

module.exports = {
  useTranslations,
  useLocale,
  useMessages,
  useFormatter,
  NextIntlClientProvider,
  hasLocale,
};
