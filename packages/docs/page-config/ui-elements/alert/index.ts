import apiOptions from "./api-options";

export default definePageConfig({
  blocks: [
    block.title("alert.title"),
    block.paragraph("alert.summaryText"),

    block.component('Playground'),

    block.subtitle("alert.whenToUseTitle"),
    block.list([
      'alert.whenToUseList.show',
      'alert.whenToUseList.static',
    ]),

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
  ],
});
