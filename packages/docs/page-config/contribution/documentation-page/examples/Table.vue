<script setup lang="ts">
import Table from "../../../../modules/page-config/blocks/table/index.vue";

const columns = [
  "col1",
  { title: "col2", type: "strong" },
  { title: "col3", type: "markdown" },
  { title: "col4", type: "code" },
];

const tableData = [
  [
    "d1C1",
    "d1C2",
    "[d1C3](https://en.wikipedia.org/wiki/Markdown)[[target=_blank]]",
    "d1C4",
  ],
  ["d2C1", "d2C2", "<mark>d2C3</mark>", "d2C4"],
  ["d3C1", "d3C2", "~~d3C3~~", "d3C4"],
];
</script>

<template>
  <Table
    :columns="columns"
    :table-data="tableData"
  />
</template>
