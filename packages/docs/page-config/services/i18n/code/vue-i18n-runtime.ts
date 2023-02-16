import { useI18nConfig } from "vuestic-ui";
import { useI18n } from "vue-i18n";

const { locale, messages } = useI18n();
const { mergeIntoConfig } = useI18nConfig();

watch(locale, (newLocale) => {
  mergeIntoConfig(messages[newLocale]["vuestic"]);
});
