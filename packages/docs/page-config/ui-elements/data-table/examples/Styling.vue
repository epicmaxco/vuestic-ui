<template>
  <div class="flex flex-wrap gap-6 mb-6">
    <va-checkbox
      v-model="useAdditionalClass"
      label="Additional class"
    />
    <va-checkbox
      v-model="useAdditionalStyle"
      label="Additional style"
    />
  </div>

  <va-data-table
    class="table"
    :items="items"
    :columns="columns"
  />
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  data() {
    const items = [
      {
        id: 1,
        props: "thAlign, thVerticalAlign, thClass, thStyle",
        description: 'Set css rules "align" and "vertical-align", "class" and "style" for header and footer cells',
      },
      {
        id: 2,
        props: "tdAlign, tdVerticalAlign, tdClass, tdStyle",
        description: 'Set css rules "align" and "vertical-align", "class" and "style" for body cells',
      },
      {
        id: 3,
        props: "width",
        description: 'Set "width" for a column',
      },
    ];

    const columns = [
      {
        key: "id",
        label: "#",
        thAlign: "center",
        tdAlign: "center",
        tdVerticalAlign: "top",
        width: "40px",
      },
      {
        key: "props",
        label: "Props",
        thAlign: "center",
        tdVerticalAlign: "top",
        width: "25%"
      },
      {
        key: "description",
        label: "Description",
        thAlign: "center",
        tdVerticalAlign: "top",
      },
    ];

    return {
      items,
      columns,
      useAdditionalClass: true,
      useAdditionalStyle: true,
    };
  },

  watch: {
    useAdditionalClass: {
      handler(value) {
        this.columns[2].tdClass = value && "additional-class";
      },
      immediate: true,
    },
    useAdditionalStyle: {
      handler(value) {
        this.columns[1].tdStyle = value && { color: "#EF467F" };
      },
      immediate: true,
    },
  },
});
</script>

<style lang="scss" scoped>
.table {
  ::v-deep(th) {
    border: 1px solid var(--va-background-border);
  }

  ::v-deep(tr) {
    border-bottom: 1px solid var(--va-background-border);

    td {
      height: 4rem;
      white-space: normal;
    }
  }
}

::v-deep(.additional-class) {
  font-weight: bolder;
}
</style>
