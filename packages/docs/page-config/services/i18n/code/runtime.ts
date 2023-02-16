import { useI18nConfig } from "vuestic-ui";

const locale = ref("en");

const messages = {
  en: {
    search: "Search",
  },
  ua: {
    search: "Пошук",
  },
};

watch(locale, (newLocale) => {
  mergeIntoConfig(messages[newLocale]);
});
