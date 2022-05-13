import { definePageConfig } from "~~/types/page-config";

const block = useDocsBlocks(import.meta);

export default definePageConfig({
  blocks: [
    block.title("table.title"),
    block.paragraph("table.summaryText"),

    block.paragraph("table.otherTables.text"),
    block.link("table.otherTables.dataTable", "/ui-elements/data-table"),
    block.link("table.otherTables.agGrid", "/extensions/ag-grid"),

    block.subtitle("all.examples"),

    block.subtitle("table.examples.default.title", 'h5'),
    block.paragraph("table.examples.default.text"),
    block.example("Default"),

    block.subtitle("table.examples.hoverable.title", 'h5'),
    block.paragraph("table.examples.hoverable.text"),
    block.example("Hoverable"),

    block.subtitle("table.examples.striped.title", 'h5'),
    block.paragraph("table.examples.striped.text"),
    block.example("Striped"),

    block.subtitle("table.examples.clickable.title", 'h5'),
    block.paragraph("table.examples.clickable.text"),
    block.example("Clickable"),
  ],
});
