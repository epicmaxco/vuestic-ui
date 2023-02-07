<template>
  <p class="flex items-center">
    Color:
    <va-color-palette
      v-model="selectedColor"
      class="ml-2"
      :palette="colorsPalette"
    />
  </p>

  <va-tree-view
    :nodes="nodes"
    v-model:checked="selectedNodes"
    :color="selectedColor"
    selectable
    expand-all
  />
</template>

<script>
const COLORS_PALETTE = [
  "#4ae387",
  "#e34a4a",
  "#4ab2e3",
  "#db76df",
  "#f7cc36",
  "#f3f3f3",
  "#000",
];

export default {
  name: "SelectableColored",
  data: () => ({
    selectedNodes: [1, 2, 3, 4, 5, 6],
    colorsPalette: COLORS_PALETTE,
    selectedColor: COLORS_PALETTE[0],
    nodes: [
      {
        id: 1,
        label: "Category",
        checked: true,
        children: [
          {
            id: 2,
            label: "Subcategory",
            children: [
              { id: 3, label: "Item" },
              { id: 4, label: "Item" },
            ],
          },
          {
            id: 5,
            label: "Subcategory",
            children: [{ id: 6, label: "Item" }],
          },
        ],
      },
      {
        id: 7,
        label: "Category",
        children: [{ id: 8, label: "Item" }],
      },
      {
        id: 9,
        label: "Category",
        children: [{ id: 10, label: "Item" }],
      },
      {
        id: 11,
        label: "Item",
      },
    ],
  }),
};
</script>
