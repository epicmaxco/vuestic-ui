import { definePageConfigBlock } from "../../types";
import Component from "./index.vue";
import { TableColumn, TableData } from "./types";

export default definePageConfigBlock({
  setup: (columns: TableColumn[], tableData: TableData) => {
    return {
      type: "table" as const,
      columns,
      tableData,
    };
  },
  component: Component,
});
