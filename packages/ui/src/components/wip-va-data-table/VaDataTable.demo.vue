<template>
  <VbDemo>
    <VbCard title="Combined example (with v-models wherever possible)">
      <h3>Filtering</h3>
      <label>Use custom filtering function (searches for the exact math)</label>
      <input type="checkbox" v-model="useCustomFilteringFn">
      <input type="text" v-model="filterValue" placeholder="Try '161'"/>
      All rows amount: {{ manyItems.length }}
      Filtered rows amount: {{ visibleRowsAmount }}

      <h3>Sorting from outside</h3>
      <label>Use custom sorting function for ids (will sort like numbers instead of strings)</label>
      <input type="checkbox" v-model="useCustomSortingFnForId">
      <label>Sort by</label>
      <select v-model="sortBy2">
        <option v-for="column in evenColumnsSortable2" :value="column.key">{{column.key}}</option>
      </select>
      <label>Sorting order</label>
      <select v-model="sortingOrder2">
        <option :value="null">Null</option>
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
      </select>

      <h3>Selection</h3>
      <p>Selected items' ids ({{selectedItemsIds.length}}) (click to deselect):
        <span v-for="selectedItem in selectedItemsIds" @click="selectedItemsIds.splice(selectedItemsIds.indexOf(selectedItem), 1)">
          {{selectedItem.id}},
        </span>
      </p>
      <label>Use selectable</label>
      <input type="checkbox" v-model="useSelectable">
      <label>Select mode</label>
      <select v-model="selectMode">
        <option value="single" selected>Single</option>
        <option value="multiple">Multiple</option>
      </select>
      <label>Selected color</label>
      <select v-model="selectedColor">
        <option value="primary" selected>Primary</option>
        <option value="secondary">Secondary</option>
        <option value="danger">Danger</option>
        <option value="warning">Warning</option>
        <option value="success">Success</option>
      </select>

      <h3>Pagination</h3>
      <label>Use pagination</label>
      <input type="checkbox" v-model="usePagination">
      <label>Rows per page</label>
      <input type="number" :disabled="!usePagination" v-model.number="perPage">
      <label>Current page</label>
      <input type="number" :disabled="!usePagination" v-model.number="currentPage2">

      <h3>Other</h3>
      <label>Striped style</label>
      <input type="checkbox" v-model="isStriped">
      <label>No data (due to filtering) message</label>
      <input type="text" v-model="noDataFilteredHtml">

      <va-data-table
        :columns="evenColumnsSortable2"
        :items="manyItemsShuffled"
        :filter="filterValue"
        :filtering-fn="filteringFn"
        @filter="visibleRowsAmount = $event"
        v-model:sort-by="sortBy2"
        v-model:sorting-order="sortingOrder2"
        :selectable="useSelectable"
        v-model="selectedItemsIds"
        :select-mode="selectMode"
        :selected-color="selectedColor"
        :per-page="usePagination ? perPage : undefined"
        :current-page="usePagination ? currentPage2 : undefined"
        :no-data-filtered-html="noDataFilteredHtml"
        :striped="isStriped"
      />
    </VbCard>

    <VbCard title="Controls">
      <va-button @click="deleteLast5EvenItems">Delete last 5 even data rows</va-button>
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

    <VbCard title="Controls">
      <va-button @click="toggleIdAndNumber">Toggle 'id' column to be 'number' (and vice-versa)</va-button>
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

    <VbCard title="[head] Prepend rows" class="demo">
      <va-data-table :items="evenItems">
        <template #head.prepend>
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

    <VbCard title="[head] Append rows" class="demo">
      <va-data-table :items="evenItems">
        <template #head.append>
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

    <VbCard title="[body] Prepend rows" class="demo">
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

    <VbCard title="[body] Append rows" class="demo">
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

    <VbCard title="[foot] Prepend rows" class="demo">
      <va-data-table :items="evenItems" foot-clone>
        <template #foot.prepend>
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

    <VbCard title="[foot] Append rows" class="demo">
      <va-data-table :items="evenItems" foot-clone>
        <template #foot.append>
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

    <VbCard title="`head` slot (static value)" class="demo">
      <va-data-table :items="evenItems" :columns="evenColumns">
        <template #head>
          Test
        </template>
      </va-data-table>
    </VbCard>

    <VbCard title="Specific `head(id)` slot (static value)" class="demo">
      <va-data-table :items="evenItems" :columns="evenColumns">
        <template #head(id)>
          A Unique ID
        </template>
      </va-data-table>
    </VbCard>

    <VbCard title="Specific `head(id)` together with static `head` slot (static values)" class="demo">
      <va-data-table :items="evenItems" :columns="evenColumns">
        <template #head>
          Test
        </template>

        <template #head(id)>
          A Unique ID
        </template>
      </va-data-table>
    </VbCard>

    <VbCard title="foot-clone prop">
      <va-data-table :items="evenItems" :columns="evenColumns" foot-clone/>
    </VbCard>

    <VbCard title="[foot-clone] `foot` slot (static value)" class="demo">
      <va-data-table :items="evenItems" :columns="evenColumns" foot-clone>
        <template #foot>
          Test
        </template>
      </va-data-table>
    </VbCard>

    <VbCard title="[foot-clone] Specific `foot(id)` slot (static value)" class="demo">
      <va-data-table :items="evenItems" :columns="evenColumns" foot-clone>
        <template #foot(id)>
          A Unique ID
        </template>
      </va-data-table>
    </VbCard>

    <VbCard title="[foot-clone] Specific `foot(id)` together with static `foot` slot (static values)" class="demo">
      <va-data-table :items="evenItems" :columns="evenColumns" foot-clone>
        <template #foot>
          Test
        </template>

        <template #foot(id)>
          A Unique ID
        </template>
      </va-data-table>
    </VbCard>

    <VbCard title="`cell` slot (static value)" class="demo">
      <va-data-table :items="evenItems" :columns="evenColumns" foot-clone>
        <template #cell>
          Target each cell
        </template>
      </va-data-table>
    </VbCard>

    <VbCard title="Specific `cell(id)` slot (static value)" class="demo">
      <va-data-table :items="evenItems" :columns="evenColumns" foot-clone>
        <template #cell(id)>
          'id' column cells
        </template>
      </va-data-table>
    </VbCard>

    <VbCard title="Specific `cell(id)` together with static `cell` slot (static values)" class="demo">
      <va-data-table :items="evenItems" :columns="evenColumns" foot-clone>
        <template #cell>
          Target each cell
        </template>

        <template #cell(id)>
          'id' column cells
        </template>
      </va-data-table>
    </VbCard>

    <VbCard title="Selectable (multiple) (default)" class="demo">
      <va-data-table :items="evenItems" :columns="evenColumns" selectable v-model="selectedItems"/>
      Count: {{selectedItems.length}} | {{selectedItems}}
    </VbCard>

    <VbCard title="Selectable (single) with `selected-color='danger'`" class="demo">
      {{selectedItem}}
      <va-data-table :items="evenItems" :columns="evenColumns" selectable v-model="selectedItem" select-mode="single" selected-color="danger"/>
    </VbCard>

    <VbCard title="Loading state" class="demo">
      <va-switch v-model="isTableLoading" label="Loading state"/>
      <va-data-table :items="evenItems" :columns="evenColumns" :loading="isTableLoading"/>
    </VbCard>

    <VbCard title="Alignment" class="demo">
      First heading align and vertical align:
      <select v-model="alignColumns[0].alignHead">
        <option value="left">Left</option>
        <option value="center">Center</option>
        <option value="right">Right</option>
      </select>

      <select v-model="alignColumns[0].verticalAlignHead">
        <option value="top">Top</option>
        <option value="middle">Middle</option>
        <option value="bottom">Bottom</option>
      </select><br>

      Second heading align and vertical align:
      <select v-model="alignColumns[1].alignHead">
        <option value="left">Left</option>
        <option value="center">Center</option>
        <option value="right">Right</option>
      </select>

      <select v-model="alignColumns[1].verticalAlignHead">
        <option value="top">Top</option>
        <option value="middle">Middle</option>
        <option value="bottom">Bottom</option>
      </select><br>

      Third heading align and vertical align:
      <select v-model="alignColumns[2].alignHead">
        <option value="left">Left</option>
        <option value="center">Center</option>
        <option value="right">Right</option>
      </select>

      <select v-model="alignColumns[2].verticalAlignHead">
        <option value="top">Top</option>
        <option value="middle">Middle</option>
        <option value="bottom">Bottom</option>
      </select><br>

      First column align and vertical align:
      <select v-model="alignColumns[0].align">
        <option value="left">Left</option>
        <option value="center">Center</option>
        <option value="right">Right</option>
      </select>

      <select v-model="alignColumns[0].verticalAlign">
        <option value="top">Top</option>
        <option value="middle">Middle</option>
        <option value="bottom">Bottom</option>
      </select><br>

      Second column align and vertical align:
      <select v-model="alignColumns[1].align">
        <option value="left">Left</option>
        <option value="center">Center</option>
        <option value="right">Right</option>
      </select>

      <select v-model="alignColumns[1].verticalAlign">
        <option value="top">Top</option>
        <option value="middle">Middle</option>
        <option value="bottom">Bottom</option>
      </select><br>

      Third column align and vertical align:
      <select v-model="alignColumns[2].align">
        <option value="left">Left</option>
        <option value="center">Center</option>
        <option value="right">Right</option>
      </select>

      <select v-model="alignColumns[2].verticalAlign">
        <option value="top">Top</option>
        <option value="middle">Middle</option>
        <option value="bottom">Bottom</option>
      </select><br>

      <va-data-table :items="alignItems" :columns="alignColumns"/>
    </VbCard>

    <VbCard title="Hide default header and use `head.prepend` slot to provide a custom one" class="demo">
      <va-data-table :items="evenItems" :columns="evenColumns" hide-default-header>
        <template #head.prepend>
          <tr>
            <th>1</th>
            <th>2</th>
            <th>3</th>
          </tr>
        </template>
      </va-data-table>
    </VbCard>

    <VbCard title="Sortable table" class="demo">
      <va-data-table :items="evenItemsShuffled" :columns="evenColumnsSortable"/>
    </VbCard>

    <VbCard title="Custom sorting function for the last column" class="demo">
      The last column's sorting function always returns -1, thus when the table is sorted by it it should always just reverse the rows.
      <va-data-table :items="evenItemsShuffled" :columns="evenColumnsSortableWithCustoms"/>
    </VbCard>

    <VbCard title="Initially sorted table (by `id`)" class="demo">
      <va-data-table :items="evenItemsShuffled" :columns="evenColumnsSortable" sort-by="id"/>
    </VbCard>

    <VbCard title="Initially sorted table (by `idSquared`) (desc)" class="demo">
      <va-data-table :items="evenItemsShuffled" :columns="evenColumnsSortable" v-model:sort-by="sortByModel" v-model:sorting-order="sortingOrderModel"/>
    </VbCard>

    <VbCard title="Pagination" class="demo">
      {{ currentPage }}
      <va-data-table :items="manyItems" :per-page="10" :current-page="currentPage" />
      <va-pagination v-model.number="currentPage" input :pages="100" />
    </VbCard>

    <VbCard title="Filtering" class="demo">
      <input type="text" v-model="filterValue">
      <va-data-table :items="evenItems" :filter="filterValue"/>
    </VbCard>
  </VbDemo>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import VaDataTable from './';
import {cloneDeep, shuffle} from "lodash-es";

export default defineComponent({
  name: "VaDataTableDemo",

  components: {
    VaDataTable
  },

  data() {
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

    const evenItemsShuffled = shuffle(evenItems);

    const manyItems = Array.from(Array(1000), (u, i) => {
      return {
        id: i,
        name: `Number ${i}`,
        idSquared: `The squared index is ${i ** 2}`
      }
    });

    const manyItemsShuffled = shuffle(manyItems);

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
      excessiveItems,

      selectedItems: [],
      selectedItem: [],

      isTableLoading: false,

      alignColumns: [
        {
          key: "id",
          label: "A Unique ID",
          alignHead: "center",
          verticalAlignHead: "middle",
          align: "center",
          verticalAlign: "middle",
        },

        {
          key: "text",
          label: "A long text",
          alignHead: "center",
          verticalAlignHead: "middle",
          align: "center",
          verticalAlign: "middle",
        },

        {
          key: "target",
          label: "Target field",
          alignHead: "center",
          verticalAlignHead: "middle",
          align: "center",
          verticalAlign: "middle",
        },
      ],

      alignItems: [
        {id: 1, text: "Somewhat long text (I need to expand it a bit so that the text gets wrapped (and thus occupies multiple lines) so that we can see how the other rows are vertically aligned)", target: "Pretty short prop"},
        {id: 2, text: "Somewhat long text (I need to expand it a bit so that the text gets wrapped (and thus occupies multiple lines) so that we can see how the other rows are vertically aligned)", target: "Pretty short prop"},
        {id: 3, text: "Somewhat long text (I need to expand it a bit so that the text gets wrapped (and thus occupies multiple lines) so that we can see how the other rows are vertically aligned)", target: "Pretty short prop"},
      ],

      evenColumnsSortable: [
        {
          key: "id",
          label: "Id",
          sortable: true,
        },

        {
          key: "name",
          label: "Name",
          sortable: true,
        },

        {
          key: "idSquared",
          label: "Id Squared",
          sortable: true,
        },
      ],

      evenColumnsSortableWithCustoms: [
        {
          key: "id",
          label: "Id",
          sortable: true,
        },

        {
          key: "name",
          label: "Name",
          sortable: true,
        },

        {
          key: "idSquared",
          label: "Id Squared",
          sortable: true,
          sortingFn: (a, b) => {
            return -1;
          }
        },
      ],

      evenItemsShuffled,

      sortByModel: "idSquared",
      sortingOrderModel: "desc",

      manyItems,
      currentPage: 1,

      filterValue: "",
      visibleRowsAmount: manyItems.length,

      manyItemsShuffled,
      evenColumnsSortable2: [
        {
          key: "idSquared",
          sortable: true,
        },
        {
          key: "name",
          sortable: true,
        },
        {
          key: "id",
          sortable: true,
        },
      ],

      sortBy2: "",
      sortingOrder2: null,
      useSelectable: true,
      selectedItemsIds: [],
      selectMode: "single",
      selectedColor: "primary",
      usePagination: true,
      perPage: 10,
      currentPage2: 1,
      noDataFilteredHtml: "No Items Found",
      isStriped: true,
      useCustomSortingFnForId: false,
      useCustomFilteringFn: false,
    }
  },

  watch: {
    useCustomSortingFnForId(value) {
      if (value) {
        this.evenColumnsSortable2[2].sortingFn = (a: number, b: number) => {
          return a - b;
        };
      } else {
        this.evenColumnsSortable2[2].sortingFn = undefined;
      }
    },
  },

  computed: {
    filteringFn() {
      return this.useCustomFilteringFn ? this.filter : undefined;
    }
  },

  methods: {
    deleteLast5EvenItems() {
      this.evenItems.splice(this.evenItems.length - 5, this.evenItems.length)
    },

    toggleIdAndNumber() {
      this.evenColumns.splice(2, 1, this.evenColumns[2] === "id" ? "number" : "id");
    },

    filter(source) {
      return source.toString() === this.filterValue;
    },
  }
});
</script>

<style lang="scss" scoped>
.demo {
  width: 500px;
}
</style>
