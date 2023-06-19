export default definePageConfig({
  blocks: [
    block.title("Tables"),
    block.paragraph("You can use plain `<table>`s with the `.va-table` class that would apply Vuestic-theme styles to them."),

    block.paragraph("If you want more functional solutions, use our data-table component or our theme for AG-Grid:"),
    block.link("Data Table", "/ui-elements/data-table"),
    block.link("AG Grid Theme", "/extensions/ag-grid"),

    block.subtitle("Examples"),
    block.example("Default", {
      title: "Basic usage",
      description: "Add the `.va-table` class to the `<table>` element."
    }),
    block.example("Hoverable", {
      title: "Hoverable",
      description: "Highlight hovered rows with additional `.va-table--hoverable` class."
    }),
    block.example("Striped", {
      title: "Striped",
      description: "The `.va-table--striped` class colorizes each even row of the table."
    }),
    block.example("Clickable", {
      title: "Clickable",
      description: "Change the cursor to `pointer` when hovering rows by adding the `.va-table--clickable` class"
    }),
  ],
});
