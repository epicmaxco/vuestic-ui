export default definePageConfig({
  blocks: [
    block.title("table.title"),
    block.paragraph("table.summaryText"),

    block.paragraph("table.otherTables.text"),
    block.link("table.otherTables.dataTable", "/ui-elements/data-table"),
    block.link("table.otherTables.agGrid", "/extensions/ag-grid"),

    block.subtitle("all.examples"),
    block.example("Default"),
    block.example("Hoverable"),
    block.example("Striped"),
    block.example("Clickable"),
  ],
});
