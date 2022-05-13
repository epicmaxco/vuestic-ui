import { TableData } from "~~/components/docs/blocks/DocsTable/DocsTableTypes";
import { definePageConfig } from "~~/types/page-config";

const block = useDocsBlocks(import.meta);

const columns = [
  "browserSupport.table.browser",
  "browserSupport.table.supported",
];

const tableData: TableData = [
  // TODO Figure exact versions we support. Show on hover.
  ["Chromium (Chrome, Edge)", "+"],
  ["Firefox", "+"],
  ["Safari (10+)", "+"],
  ["IE11/Safari 9", "-"],
];

export default definePageConfig({
  blocks: [
    block.title("browserSupport.title"),
    block.paragraph("browserSupport.description"),
    block.table(columns, tableData),
  ],
});
