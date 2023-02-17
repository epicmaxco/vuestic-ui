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
    block.title("agGrid.title"),
    block.paragraph("agGrid.description"),
    block.paragraph("agGrid.otherTables.text"),
    block.link("agGrid.otherTables.htmlTable", "/ui-elements/table"),
    block.link("agGrid.otherTables.dataTable", "/ui-elements/data-table"),
    block.headline("agGrid.installation"),
    block.paragraph("agGrid.dependencies"),
    block.code(installCommandObject, "bash"),
    block.paragraph("agGrid.importStyles[0]"),
    block.code(setClass, "html"),
    block.paragraph("agGrid.importStyles[1]"),
    block.code(importStyles, "scss"),
    block.alert("agGrid.attention", "warning"),
    block.example("Default", { codesandboxConfig: { dependencies } }),
    block.example("Styles", { codesandboxConfig: { dependencies } }),
    block.example("Filter", { codesandboxConfig: { dependencies } }),
    block.example("Pinning", { codesandboxConfig: { dependencies } }),
    block.example("Pagination", { codesandboxConfig: { dependencies } }),
    block.example("Editable", { codesandboxConfig: { dependencies } }),
  ],
});
