<template>
  <div class="d-flex align-center">
    <va-input
      v-model="filter"
      placeholder="Filter..."
      clearable
      class="mr-3"
      style="flex: 0 200px;"
    />
    <va-checkbox
      v-model="isFilterCaseSensitive"
      label="Case sensitive"
    />
  </div>
  <va-tree-view
    :nodes="nodes"
    :filter="filter"
    :filter-method="customFilterMethod"
    expand-all
  />
</template>

<script>
export default {
  name: 'Filters',

  data: () => ({
    filter: '',
    isFilterCaseSensitive: false,
    nodes: [
      {
        id: 1,
        label: 'One',
        children: [
          {
            id: 2,
            label: 'Two',
            children: [
              { id: 3, label: 'Three' },
              { id: 4, label: 'Four' },
            ],
          },
          {
            id: 5,
            label: 'Five',
            children: [
              { id: 6, label: 'Six' },
            ],
          },
        ],
      },
      {
        id: 7,
        label: 'Seven',
        children: [
          { id: 8, label: 'Eight' },
        ],
      },
      {
        id: 9,
        label: 'Nine',
        children: [
          { id: 10, label: 'Ten' },
        ],
      },
      {
        id: 11,
        label: 'Eleven',
      },
    ],
  }),

  computed: {
    customFilterMethod () {
      return this.isFilterCaseSensitive
        ? (node, filterText, key) => node[key].includes(filterText)
        : undefined
    },
  },
}
</script>

<style scoped>

</style>
