function getRequestConfig(fn) {
  return fn;
}

async function getTranslations({ namespace } = {}) {
  return (key) => `${namespace ? namespace + "." : ""}${key}`;
}

function setRequestLocale() {}

function hasLocale(locales, locale) {
  return locales.includes(locale);
}

module.exports = { getRequestConfig, getTranslations, setRequestLocale, hasLocale };
