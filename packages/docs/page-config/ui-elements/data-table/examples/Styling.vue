<template>
  <div class="grid md:grid-cols-3 gap-6 mb-6">
    <div>
      First heading
      <div class="grid grid-cols-2 md:grid-cols-1 gap-1 sm:gap-3">
        <va-select
          v-model="columns[0].thAlign"
          label="Align"
          :options="alignOptions"
        />
        <va-select
          v-model="columns[0].width"
          label="Width"
          :options="widthOptions"
          clearable
        />
      </div>
    </div>
    <div>
      Second heading
      <div class="grid grid-cols-2 md:grid-cols-1 gap-1 sm:gap-3">
        <va-select
          v-model="columns[1].thAlign"
          label="Align"
          :options="alignOptions"
        />
        <va-select
          v-model="columns[1].width"
          label="Width"
          :options="widthOptions"
          clearable
        />
      </div>
    </div>
    <div>
      Third heading
      <div class="grid grid-cols-2 md:grid-cols-1 gap-1 sm:gap-3">
        <va-select
          v-model="columns[2].thAlign"
          label="Align"
          :options="alignOptions"
        />
        <va-select
          v-model="columns[2].width"
          label="Width"
          :options="widthOptions"
          clearable
        />
      </div>
    </div>
  </div>

  <div class="grid md:grid-cols-3 gap-6 mb-6">
    <div>
      First column
      <div class="grid grid-cols-2 md:grid-cols-1 gap-1 sm:gap-3">
        <va-select
          v-model="columns[0].tdAlign"
          label="Align"
          :options="alignOptions"
          color="#8338EC"
        />
        <va-select
          v-model="columns[0].tdVerticalAlign"
          label="V. align"
          :options="verticalAlignOptions"
          color="#8338EC"
        />
      </div>
    </div>
    <div>
      Second column
      <div class="grid grid-cols-2 md:grid-cols-1 gap-1 sm:gap-3">
        <va-select
          v-model="columns[1].tdAlign"
          label="Align"
          :options="alignOptions"
          color="#8338EC"
        />
        <va-select
          v-model="columns[1].tdVerticalAlign"
          label="V. align"
          :options="verticalAlignOptions"
          color="#8338EC"
        />
      </div>
    </div>
    <div>
      Third column
      <div class="grid grid-cols-2 md:grid-cols-1 gap-1 sm:gap-3">
        <va-select
          v-model="columns[2].tdAlign"
          label="Align"
          :options="alignOptions"
          color="#8338EC"
        />
        <va-select
          v-model="columns[2].tdVerticalAlign"
          label="V. align"
          :options="verticalAlignOptions"
          color="#8338EC"
        />
      </div>
    </div>
  </div>

  <div class="grid grid-cols-2 gap-6 mb-6">
    <va-checkbox
      v-model="useAdditionalClass"
      label="Use additional class"
    />
    <va-checkbox
      v-model="useAdditionalStyle"
      label="Use additional style"
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
        text: "Some text 1",
        target: "Some prop 1",
      },
      {
        id: 2,
        text: "Some text 2",
        target: "Some prop 2",
      },
      {
        id: 3,
        text: "Some text 3",
        target: "Some prop 3",
      },
    ];

    const columns = [
      {
        key: "id",
        label: "ID",
        thAlign: "left",
        tdAlign: "left",
        tdVerticalAlign: "top",
        sortable: true,
      },
      {
        key: "text",
        label: "Text",
        thAlign: "center",
        tdAlign: "center",
        tdVerticalAlign: "middle",
        sortable: true,
      },
      {
        key: "target",
        label: "Target",
        thAlign: "right",
        tdAlign: "right",
        tdVerticalAlign: "bottom",
        sortable: true,
      },
    ];

    const verticalAlignOptions = ["top", "middle", "bottom"];
    const alignOptions = ["left", "center", "right"];
    const widthOptions = ["25%", "200px", 300];

    return {
      items,
      columns,
      verticalAlignOptions,
      alignOptions,
      widthOptions,
      useAdditionalClass: true,
      useAdditionalStyle: true,
    };
  },

  watch: {
    useAdditionalClass: {
      handler(value) {
        this.columns[0].tdClass = value && "additional-class";
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
      height: 4.5rem;
    }
  }
}

::v-deep(.additional-class) {
  color: #8338EC;
}
</style>
