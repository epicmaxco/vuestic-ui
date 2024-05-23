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

const { mergeIntoConfig } = useI18nConfig()

watch(locale, (newLocale) => {
  mergeIntoConfig(messages[newLocale]);
});
