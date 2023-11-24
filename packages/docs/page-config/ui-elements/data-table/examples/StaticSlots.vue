<template>
  <VaDataTable
    :items="items"
    :columns="columns"
    footer-clone
  >
    <template #headerPrepend>
      <tr class="table-slots">
        <th colspan="6">
          <span>#headerPrepend</span> slot
        </th>
      </tr>
    </template>
    <template #headerAppend>
      <tr class="table-slots">
        <th colspan="6">
          <span>#headerAppend</span> slot
        </th>
      </tr>
    </template>
    <template #bodyPrepend>
      <tr class="table-slots">
        <td colspan="6">
          <span>#bodyPrepend</span> slot
        </td>
      </tr>
    </template>
    <template #bodyAppend>
      <tr class="table-slots">
        <td colspan="6">
          <span>#bodyAppend</span> slot
        </td>
      </tr>
    </template>
    <template #footerPrepend>
      <tr class="table-slots">
        <th colspan="6">
          <span>#footerPrepend</span> slot
        </th>
      </tr>
    </template>
    <template #footerAppend>
      <tr class="table-slots">
        <th colspan="6">
          <span>#footerAppend</span> slot
        </th>
      </tr>
    </template>
  </VaDataTable>
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
        website: "hildegard.org",
      },
      {
        id: 2,
        name: "Ervin Howell",
        username: "Antonette",
        email: "Shanna@melissa.tv",
        phone: "010-692-6593 x09125",
        website: "anastasia.net",
      },
      {
        id: 3,
        name: "Clementine Bauch",
        username: "Samantha",
        email: "Nathan@yesenia.net",
        phone: "1-463-123-4447",
        website: "ramiro.info",
      },
    ];

    const columns = [
      { key: "id" },
      { key: "name" },
      { key: "username" },
      { key: "email" },
      { key: "phone" },
      { key: "website" },
    ];

    return {
      items,
      columns,
    };
  },
});
</script>

<style lang="scss" scoped>
.table-slots {
  background-color: var(--va-background-element);
  color: var(--va-on-background-element);

  th, td {
    text-transform: none !important;
    font-size: 0.8rem;
    font-weight: unset;
  }

  span {
    font-weight: bold;
    color: var(--va-primary);
  }
}
</style>
