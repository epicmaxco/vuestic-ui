<template>
  <VaDataTable
    :items="items"
    :columns="columns"
  >
    <template #no-data>
      <code>no-data</code> Slot
    </template>
  </VaDataTable>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  data() {
    const columns = [
      { key: "id" },
      { key: "name" },
      { key: "username" },
      { key: "email" },
      { key: "phone" },
      { key: "website" },
      { key: "address.street", name: "street", label: "Street" },
      { key: "company.name", name: "companyName", label: "Company Name" },
    ];

    return {
      items: [],
      columns,
    };
  },
});
</script>
