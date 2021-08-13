<template>
  <VbDemo>
    <VbCard title="data controls">
      <va-button @click="deleteLast5Rows">Delete last 5 even data rows</va-button>
    </VbCard>

    <VbCard title="Even `items` no `columns`" class="demo">
      <va-data-table :items="evenItems"/>
    </VbCard>

    <VbCard title="Laking `items` no `columns`" class="demo">
      <va-data-table :items="lackingItems"/>
    </VbCard>

    <VbCard title="Excessive `items` no `columns`" class="demo">
      <va-data-table :items="excessiveItems"/>
    </VbCard>

    <VbCard title="Even `items` with even `columns`" class="demo">
      <va-data-table :items="evenItems" :columns="evenColumns"/>
    </VbCard>

    <VbCard title="Laking `items` with even `columns`" class="demo">
      <va-data-table :items="lackingItems" :columns="evenColumns"/>
    </VbCard>

    <VbCard title="Excessive `items` with even `columns`" class="demo">
      <va-data-table :items="excessiveItems" :columns="evenColumns"/>
    </VbCard>

    <VbCard title="Even `items` with lacking `columns`" class="demo">
      <va-data-table :items="evenItems" :columns="lackingColumns"/>
    </VbCard>

    <VbCard title="Laking `items` with lacking `columns`" class="demo">
      <va-data-table :items="lackingItems" :columns="lackingColumns"/>
    </VbCard>

    <VbCard title="Excessive `items` with lacking `columns`" class="demo">
      <va-data-table :items="excessiveItems" :columns="lackingColumns"/>
    </VbCard>

    <VbCard title="Even `items` with excessive `columns`" class="demo">
      <va-data-table :items="evenItems" :columns="excessiveColumns"/>
    </VbCard>

    <VbCard title="Laking `items` with excessive `columns`" class="demo">
      <va-data-table :items="lackingItems" :columns="excessiveColumns"/>
    </VbCard>

    <VbCard title="Excessive `items` with excessive `columns`" class="demo">
      <va-data-table :items="excessiveItems" :columns="excessiveColumns"/>
    </VbCard>

    <VbCard title="Even `items` no `columns`, prepend rows" class="demo">
      <va-data-table :items="evenItems">
        <template #body.prepend>
          <tr>
            <td>Static 1.1</td>
            <td>Static 1.2</td>
            <td>Static 1.3</td>
          </tr>
          <tr>
            <td>Static 2.1</td>
            <td>Static 2.2</td>
            <td>Static 2.3</td>
          </tr>
        </template>
      </va-data-table>
    </VbCard>

    <VbCard title="Even `items` no `columns`, append rows" class="demo">
      <va-data-table :items="evenItems">
        <template #body.append>
          <tr>
            <td>Static 1.1</td>
            <td>Static 1.2</td>
            <td>Static 1.3</td>
          </tr>
          <tr>
            <td>Static 2.1</td>
            <td>Static 2.2</td>
            <td>Static 2.3</td>
          </tr>
        </template>
      </va-data-table>
    </VbCard>
  </VbDemo>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import VaDataTable from './';
import {cloneDeep} from "lodash-es";

export default defineComponent({
  name: "VaDataTableDemo",

  components: {
    VaDataTable
  },

  data () {
    const evenItems = Array.from(Array(10), (u, i) => {
      return {
        id: i,
        name: `Number ${i}`,
        idSquared: `The squared index is ${i ** 2}`
      }
    });

    const lackingItems = cloneDeep(evenItems);
    delete lackingItems[0].name;
    delete lackingItems[3].id;
    delete lackingItems[5].idSquared

    const excessiveItems = cloneDeep(evenItems);
    excessiveItems[0]["excessiveProp"] = "Excessive prop's value"
    excessiveItems[5]["excessiveProp"] = "Excessive prop's value"
    excessiveItems[5]["anotherExcessiveProp"] = "The other excessive prop's value"

    return {
      evenColumns: [
        "idSquared",
        "name",
        "id"
      ],

      lackingColumns: [
        "idSquared",
        "id"
      ],

      excessiveColumns: [
        "id",
        "name",
        "excessiveColumn",
        "idSquared"
      ],

      evenItems,
      lackingItems,
      excessiveItems
    }
  },

  methods: {
    deleteLast5Rows() {
      this.evenItems.splice(this.evenItems.length - 5, this.evenItems.length)
    }
  }
});
</script>

<style lang="scss" scoped>
.demo {
  width: 500px;
}
</style>
