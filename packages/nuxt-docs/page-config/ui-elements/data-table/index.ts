import apiOptions from "./api-options";

export default definePageConfig({
  blocks: [
    block.title("dataTable.title"),
    block.paragraph("dataTable.description"),
    block.paragraph("dataTable.otherTables.text"),
    block.link("dataTable.otherTables.htmlTable", "/ui-elements/table"),
    block.link("dataTable.otherTables.agGrid", "/extensions/ag-grid"),

    block.subtitle("all.examples"),
    block.example("Default"),

    block.headline("dataTable.examples.slots.title"),
    block.paragraph("dataTable.examples.slots.text[0]"),
    block.paragraph("dataTable.examples.slots.text[1]"),
    block.alert("dataTable.examples.slots.text[4]", "warning"),
    block.example("CustomSlots"),
    block.paragraph("dataTable.examples.slots.text[2]"),
    block.example("StaticSlots"),
    block.paragraph("dataTable.examples.slots.text[3]"),
    block.example("ColgroupSlots"),

    block.example("Filtering"),

    block.headline("dataTable.examples.sorting.title"),
    block.paragraph("dataTable.examples.sorting.text[0]"),
    block.paragraph("dataTable.examples.sorting.text[1]"),
    block.paragraph("dataTable.examples.sorting.text[2]"),
    block.paragraph("dataTable.examples.sorting.text[3]"),
    block.example("Sorting"),

    block.headline("dataTable.examples.selection.title"),
    block.paragraph("dataTable.examples.selection.text[0]"),
    block.paragraph("dataTable.examples.selection.text[1]"),
    block.example("Selection"),
    block.paragraph("dataTable.examples.selection.text[2]"),
    block.example("SelectionWithKeys"),

    block.example("Pagination"),
    block.example("Styling"),
    block.example("Binding"),
    block.example("VirtualScroll"),

    block.headline("dataTable.examples.sticky.title"),
    block.paragraph("dataTable.examples.sticky.text[0]"),
    block.paragraph("dataTable.examples.sticky.text[1]"),
    block.example("Sticky"),

    block.example("Other"),

    block.paragraph("dataTable.examples.other.text[1]"),
    block.example("CRUD"),

    block.subtitle("all.api"),
    block.api("VaDataTable", apiOptions),

    block.subtitle("all.cssVariables"),
    block.file("vuestic-ui/src/components/va-data-table/_variables.scss"),
  ],
});
