<template>
  <div class="grid sm:grid-cols-3 gap-6 mb-6">
    <div>
      <va-switch
        v-model="isTableStriped"
        label="Striped"
        size="small"
      />
      <br>
      <va-switch
        v-model="animated"
        label="Animated"
        size="small"
      />
      <br>
      <va-switch
        v-model="isTableRowsClickable"
        label="Clickable"
        size="small"
      />
    </div>

    <div>
      <va-switch
        v-model="isTableLoading"
        label="Loading"
        size="small"
      />
      <br>
      <va-switch
        v-model="prependSlot"
        label="Prepend slots"
        size="small"
      />
      <br>
      <va-switch
        v-model="appendSlot"
        label="Append slots"
        size="small"
      />
    </div>

    <div>
      <va-switch
        v-model="hideDefaultHeader"
        label="Hide header"
        size="small"
      />
      <br>
      <va-switch
        v-model="footerClone"
        label="Clone footer"
        size="small"
        :disabled="hideDefaultHeader"
      />
      <br>
      <va-switch
        v-model="footerSorting"
        label="Foot sorting"
        size="small"
        :disabled="hideDefaultHeader || !footerClone"
      />
    </div>
  </div>

  <va-data-table
    :items="items"
    :columns="columns"
    :striped="isTableStriped"
    selectable
    :clickable="isTableRowsClickable"
    :loading="isTableLoading"
    :hide-default-header="hideDefaultHeader"
    :footer-clone="footerClone"
    :allow-footer-sorting="footerSorting"
    :animated="animated"
    @row:click="handleClick"
    @row:dblclick="handleClick"
    @row:contextmenu="handleClick"
  >
    <template
      v-if="prependSlot"
      #headerPrepend
    >
      <tr>
        <th colspan="8">
          Custom cell which span 8 cells (headPrepend slot)
        </th>
      </tr>
    </template>
    <template
      v-if="appendSlot"
      #headerAppend
    >
      <tr>
        <th colspan="8">
          Custom cell which span 8 cells (headAppend slot)
        </th>
      </tr>
    </template>

    <template
      v-if="prependSlot"
      #bodyPrepend
    >
      <tr>
        <td colspan="8">
          Custom cell which span 8 cells (bodyPrepend slot)
        </td>
      </tr>
    </template>
    <template
      v-if="appendSlot"
      #bodyAppend
    >
      <tr>
        <td colspan="8">
          Custom cell which span 8 cells (bodyAppend slot)
        </td>
      </tr>
    </template>

    <template
      v-if="prependSlot"
      #footerPrepend
    >
      <tr>
        <th colspan="8">
          Custom cell which span 8 cells (footPrepend slot)
        </th>
      </tr>
    </template>
    <template
      v-if="appendSlot"
      #footerAppend
    >
      <tr>
        <th colspan="8">
          Custom cell which span 8 cells (footAppend slot)
        </th>
      </tr>
    </template>
  </va-data-table>

  <va-alert
    v-if="isTableRowsClickable"
    class="!mt-6"
    color="info"
    outline
  >
    <span>
      Last row click event (id, event type):
      <va-chip v-if="rowId">{{ rowId }}</va-chip>
      <va-chip v-if="rowEventType">{{ rowEventType }}</va-chip>
    </span>
  </va-alert>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  data() {
    const items = [
      {
        id: 1,
        name: "Leanne Graham",
        username: "Bret",
        email: "Sincere@april.biz",
        phone: "1-770-736-8031 x56442",
      },
      {
        id: 2,
        name: "Ervin Howell",
        username: "Antonette",
        email: "Shanna@melissa.tv",
        phone: "010-692-6593 x09125",
      },
      {
        id: 3,
        name: "Clementine Bauch",
        username: "Samantha",
        email: "Nathan@yesenia.net",
        phone: "1-463-123-4447",
      },
      {
        id: 4,
        name: "Patricia Lebsack",
        username: "Karianne",
        email: "Julianne.OConner@kory.org",
        phone: "493-170-9623 x156",
      },
      {
        id: 5,
        name: "Chelsey Dietrich",
        username: "Kamren",
        email: "Lucio_Hettinger@annie.ca",
        phone: "(254)954-1289",
      },
    ];

    const columns = [
      { key: "id", sortable: true },
      { key: "username", sortable: true },
      { key: "name", sortable: true },
      { key: "email", sortable: true },
      { key: "phone", sortable: true },
    ];

    return {
      items,
      columns,
      isTableLoading: false,
      isTableStriped: true,
      isTableRowsClickable: false,
      hideDefaultHeader: false,
      footerClone: true,
      footerSorting: true,
      prependSlot: false,
      appendSlot: false,
      animated: true,
      rowEventType: "",
      rowId: "",
    };
  },

  watch: {
    isTableRowsClickable(value) {
      if (!value) {
        this.rowEventType = "";
        this.rowId = "";
      }
    },
  },

  methods: {
    handleClick(event) {
      this.rowEventType = event.event.type;
      this.rowId = event.item.id;
    },
  },
});
</script>
