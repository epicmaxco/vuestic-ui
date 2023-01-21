<template>
  <va-tree-view
    v-model:checked="selectedNodes"
    :nodes="nodes"
    selectable
    expand-all
  />

  <p class="mt-6">Selected nodes: {{ selectedNodes.join(",") || "none" }}</p>
</template>

<script>
export default {
  name: "Default",

  data: () => ({
    selectedNodes: [],
    nodes: [
      {
        id: 1,
        label: "Category",
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
