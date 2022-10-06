<template>
  <va-chip square outline>
    {{ selectedNodes.length ? selectedNodes.join(',') : 'Please, select nodes' }}
  </va-chip>
  <va-color-palette
    v-model="selectedColor"
    :palette="colorsPalette"
  />
  <va-tree-view
    v-model:checked="selectedNodes"
    :nodes="nodes"
    :color="selectedColor"
    selectable
    expand-all
  />
</template>

<script>
const COLORS_PALETTE = [
  '#4ae387',
  '#e34a4a',
  '#4ab2e3',
  '#db76df',
  '#f7cc36',
  '#f3f3f3',
  '#000',
]

export default {
  name: 'Default',

  data: () => ({
    selectedNodes: [],
    colorsPalette: COLORS_PALETTE,
    selectedColor: COLORS_PALETTE[0],
    nodes: [
      {
        id: 1,
        label: 'Category',
        children: [
          {
            id: 2,
            label: 'Subcategory',
            children: [
              { id: 3, label: 'Item' },
              { id: 4, label: 'Item' },
            ],
          },
          {
            id: 5,
            label: 'Subcategory',
            children: [
              { id: 6, label: 'Item' },
            ],
          },
        ],
      },
      {
        id: 7,
        label: 'Category',
        children: [
          { id: 8, label: 'Item' },
        ],
      },
      {
        id: 9,
        label: 'Category',
        children: [
          { id: 10, label: 'Item' },
        ],
      },
      {
        id: 11,
        label: 'Item',
      },
    ],
  }),
}
</script>

<style scoped>

</style>
