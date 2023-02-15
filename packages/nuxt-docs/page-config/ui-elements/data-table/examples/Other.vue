<template>
  <div class="row">
    <div class="flex flex-col lg4 mb-2">
      <va-switch
        v-model="isTableStriped"
        class="mt-2"
        label="Striped style"
        size="small"
      />
      <br>
      <va-switch
        v-model="animated"
        class="mt-2"
        label="Animated rows"
        size="small"
      />
      <br>
      <va-switch
        v-model="isTableRowsClickable"
        class="mt-2"
        label="Clickable rows"
        size="small"
      />
    </div>

    <div class="flex flex-col lg4 mb-2">
      <va-switch
        v-model="isTableLoading"
        class="mt-2"
        label="Loading state"
        size="small"
      />
      <br>
      <va-switch
        v-model="prependSlot"
        class="mt-2"
        label="Add (prepend) slots"
        size="small"
      />
      <br>
      <va-switch
        v-model="appendSlot"
        class="mt-2"
        label="Add (append) slots"
        size="small"
      />
    </div>

    <div class="flex flex-col lg4 mb-2">
      <va-switch
        v-model="hideDefaultHeader"
        class="mt-2"
        label="Hide default header"
        size="small"
      />
      <br>
      <va-switch
        v-model="footerClone"
        class="mt-2"
        label="Clone header to footer"
        size="small"
        :disabled="hideDefaultHeader"
      />
      <br>
      <va-switch
        v-model="footerSorting"
        class="mt-2"
        label="Allow foot sorting"
        size="small"
        :disabled="hideDefaultHeader || !footerClone"
      />
    </div>
  </div>

  <va-data-table
    :items="items"
    :columns="columns"
    :striped="isTableStriped"
    :selectable="true"
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
    class="mt-3"
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
    const users = [
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
      items: users,
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
