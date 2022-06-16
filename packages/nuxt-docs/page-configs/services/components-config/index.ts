import {
  TableColumn,
  TableData,
} from "~~/components/docs/blocks/DocsTable/DocsTableTypes";
import { definePageConfig } from "~~/types/page-config";
import {
  componentsConfigCodeExample,
  componentsConfigCodeExampleDefaultSizes,
  componentsAllConfigCodeExample,
} from "./code-examples";

const columns: TableColumn[] = [
  "Name",
  { title: "Type", type: "code" },
  { title: "Description", type: "markdown" },
];

const tableData: TableData = [
  [
    "ComponentsConfig",
    "{ [componentName: string]: Props }",
    "componentsConfig.api.ComponentConfig",
  ],
  [
    "Props",
    "{ [propName: string]: any }",
    "componentsConfig.api.ComponentsAllConfig",
  ],
];

const block = useDocsBlocks(import.meta);

export default definePageConfig({
  blocks: [
    block.title("componentsConfig.title"),
    block.paragraph("componentsConfig.subtitle"),
    block.code(componentsConfigCodeExample),

    block.paragraph("componentsConfig.demoTitle"),
    block.example("button"),

    block.subtitle("componentsConfig.componentsAll.title"),
    block.paragraph("componentsConfig.componentsAll.subtitle"),
    block.code(componentsAllConfigCodeExample),
    block.paragraph("componentsConfig.componentsAll.description"),

    block.subtitle("componentsConfig.vaConfig.title"),
    block.paragraph("componentsConfig.vaConfig.subtitle"),
    block.example("va-config"),
    block.paragraph("componentsConfig.vaConfig.explain"),

    block.subtitle("componentsConfig.defaultSizes.title"),
    block.paragraph("componentsConfig.defaultSizes.description"),
    block.code(componentsConfigCodeExampleDefaultSizes),

    // api
    block.subtitle("componentsConfig.api.title"),
    block.subtitle("componentsConfig.api.types", 'h5'),
    block.table(columns, tableData),
  ],
});
