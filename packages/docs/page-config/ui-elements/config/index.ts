import apiOptions from "./api-options";

export default definePageConfig({
  blocks: [
    block.title("config.title"),
    block.paragraph("config.description"),
    block.link("config.link", "/services/components-config"),

    block.subtitle("all.examples"),

    block.example("Components"),
    block.link('config.examples.components.see', '/services/components-config'),
    // block.example("Colors"),
    // block.link('config.examples.colors.see', '/services/colors-config'),
    block.example("Internalization"),
    block.link('config.examples.internalization.see', '/services/i18n'),

    block.subtitle("all.api"),
    block.api("VaConfig", apiOptions),
  ],
});
