import apiOptions from "./api-options";

export default definePageConfig({
  blocks: [
    block.title("select.title"),
    block.paragraph("select.summaryText"),

    block.subtitle("all.examples"),

    block.example("Default"),
    block.example("Styles"),
    block.example("Variations"),
    block.example("Decorators"),
    block.example("ObjectOptions"),
    block.example("TrackBy"),
    block.example("Slots"),
    block.example("Tagging"),
    block.example("State"),
    block.example("Searchable"),
    block.example("AllowCreate"),
    block.example("Validation"),
    block.example("MaxVisibleOptions"),
    block.example("SelectedTopShown"),
    block.example("Autocomplete"),
    block.example("IconOptions"),

    block.headline("select.examples.keyboardNavigation.title"),
    block.paragraph("select.examples.keyboardNavigation.moves"),
    block.paragraph("select.examples.keyboardNavigation.selects"),
    block.paragraph("select.examples.keyboardNavigation.hints"),

    block.subtitle("all.api"),
    block.api("VaSelect", apiOptions),
  ],
});
