import { definePageConfig } from "~~/types/page-config";
import VaDataTable from "vuestic-ui/src/components/va-data-table/VaDataTable.vue";

const block = useDocsBlocks(import.meta);

export default definePageConfig({
  blocks: [
    block.title("dataTable.title"),
    block.paragraph("dataTable.description"),
    block.paragraph("dataTable.otherTables.text"),
    block.link("dataTable.otherTables.htmlTable", "/ui-elements/table"),
    block.link("dataTable.otherTables.agGrid", "/extensions/ag-grid"),

    block.subtitle("all.examples"),
    block.exampleBlock("Default"),

    block.subtitle("dataTable.examples.slots.title", 'h5'),
    block.paragraph("dataTable.examples.slots.text[0]"),
    block.paragraph("dataTable.examples.slots.text[1]"),
    block.example("CustomSlots"),
    block.paragraph("dataTable.examples.slots.text[2]"),
    block.example("StaticSlots"),
    block.paragraph("dataTable.examples.slots.text[3]"),
    block.example("ColgroupSlots"),

    block.exampleBlock("Filtering"),
    block.exampleBlock("Sorting"),
    block.exampleBlock("Selection"),
    block.exampleBlock("Pagination"),
    block.exampleBlock("Styling"),
    block.exampleBlock("Other"),

    block.paragraph("dataTable.examples.other.text[1]"),
    block.example("CRUD"),

    block.subtitle("all.api"),
    block.api(VaDataTable),
  ],
  manualApi: {
    props: {
      columns: {
        types: "`(string | ITableColumn)[]`",
      },
      filterMethod: {
        types: "`TFilterMethod: (source: any) => boolean`",
      },
      items: {
        types: "`ITableItem[]`",
      },
      selectMode: {
        types: "`TSelectMode: 'single'|'multiple'`",
      },
      sortingOrder: {
        types: "`TSortingOrder: 'asc'|'desc'|null`",
      },
    },
    events: {
      filtered: {
        types: "`() => FilteredEmit`",
      },
      selectionChange: {
        types: "`() => SelectionChangeEmit`",
      },
      sorted: {
        types: "`() => SortedEmit`",
      },
      "update:sortBy": {
        types: "`() => String`",
      },
      "update:sortingOrder": {
        types: "`() => TSortingOrder`",
      },
      "row:click": {
        types: "`() => RowClickEmit`",
      },
      "row:contextmenu": {
        types: "`() => RowClickEmit`",
      },
      "row:dblclick": {
        types: "`() => RowClickEmit`",
      },
    },
    slots: {
      colgroup: {},
      headerPrepend: {},
      header: {},
      "header(key)": {},
      headerAppend: {},
      bodyPrepend: {},
      cell: {},
      "cell(key)": {},
      bodyAppend: {},
      footerPrepend: {},
      footer: {},
      "footer(key)": {},
      footerAppend: {},
    },
  },
});
