const installCommandObject = {
  npm: "npm install @vuestic/ag-grid-theme",
  yarn: "yarn add @vuestic/ag-grid-theme",
};

const setClass = `<template>
  <ag-grid-vue class='ag-theme-vuestic' ... />
</template>`;

const importStyles = `
// main.*
import { createApp } from 'vue'
import App from './App.vue'

import '@vuestic/ag-grid-theme'
// OR
import '@vuestic/ag-grid-theme/scss'
`;

const dependencies = {
  "@vuestic/ag-grid-theme": "latest",
};

export default definePageConfig({
  blocks: [
    block.title("AG Grid Theme"),
    block.paragraph("If you need more flexible customization of the display of tables, we recommend using the [AG Grid](https://www.ag-grid.com/vue-data-grid/getting-started)[[target=_blank]] library. Vuestic UI provides a ready-made style theme for this library."),
    block.paragraph("Also, we provide styles for HTML Table and have own data-table component:"),
    block.link("HTML Table", "/ui-elements/table"),
    block.link("Data Table", "/ui-elements/data-table"),
    block.headline("AG Grid installation"),
    block.paragraph("To start using AG Grid, install the dependencies in your project."),
    block.code(installCommandObject, "bash"),
    block.paragraph("Then import the stylesheet that defines the grid \"structure\" into the `main.*` file and apply the `ag-theme-vuestic` theme on the grid component."),
    block.code(setClass, "html"),
    block.paragraph("Depending on your project setup and or your purposes you can import pre-compiled CSS styles `{'@'}vuestic/ag-grid-theme` or `{'@'}vuestic/ag-grid-theme/scss` to use our SCSS mixins."),
    block.code(importStyles, "scss"),
    block.alert("Vuestic-UI provides styles for AG-Grid Community and doesn't change any functional. For more examples and differences between Community and Enterprise versions visit the official [AG-Grid documentation page](https://www.ag-grid.com/vue-data-grid/column-properties/)[[target=_blank]].", "warning"),
    block.example("Default", {
      codesandboxConfig: { dependencies },
      title: "Default usage",
      description: "To render a vuestic-style table correctly, you must provide the table dimensions (`width` and `height`), dataset (`rowData`) and column definitions (` columnDefs`) according to this dataset.",
    }),
    block.example("Styles", {
      codesandboxConfig: { dependencies },
      title: "Styles",
      description: "The theme supports the use of the classes `ag-theme-vuestic--striped` to highlight each even row of the table and` ag-theme-vuestic--hoverable` to highlight a line on hover.",
    }),
    block.example("Filter", {
      codesandboxConfig: { dependencies },
      title: "Filters and sorting",
      description: "You can provide some options for the definition object to enable filtering and sorting."
    }),
    block.example("Pinning", {
      codesandboxConfig: { dependencies },
      title: "Rows pinning",
      description: "To pin rows at the top or bottom, simply provide an array of rows for the `pinnedTopRowData` and `pinnedBottomRowData` properties."
    }),
    block.example("Pagination", {
      codesandboxConfig: { dependencies },
      title: "Pagination",
      description: "You can enable pagination for the table by providing the required properties."
    }),
    block.example("Editable", {
      codesandboxConfig: { dependencies },
      title: "Cell editing",
      description: "Provide `editable` property to column definition and then double click or press Enter on selected cell to enable editing mode."
    }),
  ],
});
