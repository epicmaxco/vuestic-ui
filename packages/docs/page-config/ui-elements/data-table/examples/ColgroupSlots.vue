<template>
  <VaDataTable
    :items="items"
    :columns="columns"
  >
    <template #colgroup>
      <col span="5">
      <col class="table-slots">
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

<style>
.table-slots {
  background-color: var(--va-background-element);
  color: var(--va-on-background-element);
}
</style>
