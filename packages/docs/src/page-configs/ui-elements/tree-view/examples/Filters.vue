<template>
  <va-input
    v-model="filter"
    placeholder="Filter the tree view"
  />
  <va-tree-view
    :nodes="nodes"
    :filter="filter"
    node-key="label"
    expand-all
  />
</template>

<script>
export default {
  name: 'Filters',

  data: () => ({
    filter: '',
    nodes: [],
  }),
}
</script>

<style scoped>

</style>
