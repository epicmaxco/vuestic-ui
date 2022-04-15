import {
  TableColumn,
  TableData,
} from "~~/components/docs/blocks/DocsTable/DocsTableTypes";
import { definePageConfig } from "~~/types/page-config";
import {
  setupExampleCode,
  reactiveUpdateExampleCode,
  reactiveSetExampleCode,
  useInRuntimeCode,
} from "./code-examples";

const columns: TableColumn[] = [
  "params",
  { title: "type", type: "code" },
  { title: "Description", type: "markdown" },
];

const tableData: TableData = [
  ["icons", "IconsConfig", "globalConfig.api.icons"],
  ["components", "ComponentsConfig", "globalConfig.api.components"],
  ["componentsAll", "Props", "globalConfig.api.componentsAll"],
  ["colors", "ColorsConfig", "globalConfig.api.colors"],
];

const block = useDocsBlocks(import.meta);

export default definePageConfig({
  blocks: [
    block.title("globalConfig.title"),
    block.paragraph("globalConfig.subtitle"),
    block.paragraph("globalConfig.structure"),

    block.paragraph("globalConfig.setupExampleTitle"),
    block.code(setupExampleCode),

    block.paragraph("globalConfig.reactiveUpdateExampleTitle"),
    block.code(reactiveUpdateExampleCode),

    block.paragraph("globalConfig.reactiveSetExampleTitle"),
    block.code(reactiveSetExampleCode),

    block.paragraph("globalConfig.useInRuntime"),
    block.code(useInRuntimeCode),

    block.subtitle("globalConfig.links.readMore", 'h5'),
    block.link("globalConfig.links.components", "/services/components-config"),
    block.link("globalConfig.links.colors", "/services/colors-config"),
    block.link("globalConfig.links.icons", "/services/icons-config"),

    // api
    block.subtitle("all.api"),
    block.table(columns, tableData),
  ],
});
