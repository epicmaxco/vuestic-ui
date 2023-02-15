const columns = [
  "Name",
  { title: "Type", type: "code" },
  { title: "Description", type: "markdown" },
];

const tableData = [
  [
    "ComponentsConfig",
    "{ [componentName: string]: Props }",
    "componentsConfig.api.ComponentConfig",
  ],
  [
    "ComponentsAllConfig",
    "{ [propName: string]: any }",
    "componentsConfig.api.ComponentsAllConfig",
  ],
  [
    "ComponentsPresetsConfig",
    "{ [componentName: string]: { [propName: string]: any } }",
    "componentsConfig.api.ComponentsPresetsConfig",
  ],
];

export default definePageConfig({
  blocks: [
    block.title("componentsConfig.title"),
    block.paragraph("componentsConfig.subtitle"),
    block.code("components-config"),

    block.paragraph("componentsConfig.demoTitle"),
    block.example("button", { hideTitle: true }),

    block.subtitle("componentsConfig.componentsAll.title"),
    block.paragraph("componentsConfig.componentsAll.subtitle"),
    block.code("components-all"),
    block.paragraph("componentsConfig.componentsAll.description"),

    block.subtitle("componentsConfig.componentsPresets.title"),
    block.paragraph("componentsConfig.componentsPresets.subtitle"),
    block.code("components-presets"),
    block.example("presets", { hideTitle: true }),

    block.subtitle("componentsConfig.vaConfig.title"),
    block.paragraph("componentsConfig.vaConfig.subtitle"),
    block.example("va-config", { hideTitle: true }),
    block.paragraph("componentsConfig.vaConfig.explain"),

    block.subtitle("componentsConfig.priority.title"),
    block.paragraph("componentsConfig.priority.description"),
    block.example("priority", { hideCode: true, hideTitle: true }),

    block.subtitle("componentsConfig.defaultSizes.title"),
    block.paragraph("componentsConfig.defaultSizes.description"),
    block.code("components-default-sizes"),

    // api
    block.subtitle("componentsConfig.api.title"),
    block.headline("componentsConfig.api.types"),
    block.table(columns, tableData),
  ],
});
