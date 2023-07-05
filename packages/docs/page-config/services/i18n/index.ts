import { getI18nConfigDefaults } from "vuestic-ui/src/services/i18n";

const configTranslations = Object
  .entries(getI18nConfigDefaults())
  .sort((a, b) => a[0].localeCompare(b[0]))

export default definePageConfig({
  blocks: [
    block.title("i18n"),
    block.paragraph("We made a separated config for i18n messages, so you can redefine messages we use in components."),

    block.subtitle("Translations"),
    block.table([{ title: "Key", type: 'code'}, "Value"], configTranslations),

    block.subtitle("Change default messages"),
    block.paragraph("Default messages can be set in `GlobalConfig`. Config is fully typed, so you can use autocomplete to find messages you want to change."),
    block.code("setup"),

    block.subtitle("Changing language in runtime"),
    block.paragraph("If you have more than one language, you can update messages in runtime with `useI18nConfig` hook from VuesticUI."),

    block.code("runtime"),

    block.subtitle("Using with vue-i18n"),
    block.paragraph("If you use vue-i18n we can recommend to store VuesticUI messages under specific key"),

    block.code("vue-i18n-runtime"),
    block.collapse("Recommended config structure", [
      block.code("vue-i18n-config"),
    ]),
  ],
});
