import apiOptions from "./api-options";

export default definePageConfig({
  blocks: [
    block.title("alert.title"),
    block.paragraph("alert.summaryText"),

    block.component('Playground'),

    block.subtitle("all.examples"),
    block.example("Default"),
    block.example("Styles"),
    block.example("Color"),
    block.example("Border"),
    block.example("Dense"),
    block.example("Title"),
    block.example("Icon"),
    block.example("Closeable"),
    block.example("Center"),

    block.subtitle("all.api"),
    block.api("VaAlert", apiOptions),

    block.subtitle("all.cssVariables"),
    block.file("vuestic-ui/src/components/va-alert/_variables.scss"),
  ],
});
