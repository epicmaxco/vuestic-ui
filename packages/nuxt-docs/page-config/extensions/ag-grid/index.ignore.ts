const installCommandObject = {
  npm: "npm install @vuestic/ag-grid-theme",
  yarn: "yarn add @vuestic/ag-grid-theme",
};

const setClass = `<template>
  <ag-grid-vue class='ag-theme-vuestic' ... />
</template>`;

const importStyles = `<style lang="scss">
  @import "~@vuestic/ag-grid-theme";
</style>`;

const dependencies = {
  "@vuestic/ag-grid-theme": "latest",
};

export default definePageConfig({
  blocks: [
    block.title("ag-grid.title"),
    block.paragraph("ag-grid.description"),
    block.paragraph("ag-grid.otherTables.text"),
    block.link("ag-grid.otherTables.htmlTable", "/ui-elements/table"),
    block.link("ag-grid.otherTables.dataTable", "/ui-elements/data-table"),
    block.headline("ag-grid.installation"),
    block.paragraph("ag-grid.dependencies"),
    block.code(installCommandObject, "bash"),
    block.paragraph("ag-grid.importStyles"),
    block.code(setClass, "html"),
    block.code(importStyles, "scss"),
    block.alert("ag-grid.attention", "warning"),
    block.example("Default", { codesandboxConfig: { dependencies } }),
    block.example("Styles", { codesandboxConfig: { dependencies } }),
    block.example("Filter", { codesandboxConfig: { dependencies } }),
    block.example("Pinning", { codesandboxConfig: { dependencies } }),
    block.example("Pagination", { codesandboxConfig: { dependencies } }),
    block.example("Editable", { codesandboxConfig: { dependencies } }),
  ],
});
