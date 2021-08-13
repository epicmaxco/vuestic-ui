<template>
  <table class="va-data-table">
    <thead>
      <tr>
        <th v-for="header in headers">
          {{ header }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="row in items">
        <td v-for="cell in getCellValues(row)">
          {{ cell }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import {defineComponent, PropType, ref, toRef, toRefs} from "vue";
import {merge, startCase} from "lodash-es";

export type VaDataTableColumnDefinition = string;

export type VaDataTableItemDefinition = Record<string, unknown>

export default defineComponent({
  name: "VaDataTable",

  props: {
    columns: {
      type: Array as PropType<VaDataTableColumnDefinition[]>
    },
    items: {
      type: Array as PropType<VaDataTableItemDefinition[]>
    }
  },

  setup(props) {
    const {columns, items} = toRefs(props)

    // headers
    let rawHeaders = ref<string[]>([]);

    if (!columns.value) {
      rawHeaders.value = Object.keys(merge({}, ...items.value));
    } else {
      rawHeaders.value = columns.value;
    }

    const headers = rawHeaders.value.map(header => {
      return startCase(header.toString());
    })

    // items
    function getCellValues(row: VaDataTableItemDefinition) {
        return (!columns.value ? rawHeaders : columns).value.map(rawHeader => {
          const value = row[rawHeader] !== undefined ? row[rawHeader] : "";
          return value.toString()
        })
    }

    // expose
    return {
      headers,
      items,
      getCellValues
    };
  }
})
</script>

<style lang="scss">

</style>
