<template>
  <va-input
    v-model="filter"
    placeholder="Filter the tree view"
    clearable
  />
  <va-tree-view
    :nodes="nodes"
    :filter="filter"
    node-key="id"
    expand-all
  />
</template>

<script>
export default {
  name: 'Filters',

  data: () => ({
    filter: '',
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
}
</script>

<style scoped>

</style>
