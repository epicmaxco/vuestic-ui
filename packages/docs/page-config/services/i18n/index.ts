import { getI18nConfigDefaults } from "vuestic-ui/src/services/i18n";

export default definePageConfig({
  blocks: [
    block.title("i18n.title"),
    block.paragraph("i18n.description"),

    block.collapse("i18n.config.title", [
      block.code(JSON.stringify(getI18nConfigDefaults(), null, 2)),
    ]),

    block.subtitle("i18n.config.changeDefault.title"),
    block.paragraph("i18n.config.changeDefault.description"),
    block.code("setup"),

    block.subtitle("i18n.runtimeUpdate.title"),
    block.paragraph("i18n.runtimeUpdate.description"),

    block.code("runtime"),

    block.subtitle("i18n.useWithVueI18n.title"),
    block.paragraph("i18n.useWithVueI18n.description"),

    block.code("vue-i18n-runtime"),
    block.collapse("i18n.useWithVueI18n.exampleConfig", [
      block.code("vue-i18n-config"),
    ]),
  ],
});
