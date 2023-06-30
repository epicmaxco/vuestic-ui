<template>
  <va-tree-view
    :nodes="nodes"
    class="customizable-content"
  >
    <template #content="node">
      <div class="flex items-center">
        <va-avatar
          v-if="node.image"
          :src="node.image"
          class="mr-2"
        />

        <div class="mr-2">
          <b
            v-if="node.label"
            class="display-6"
          >{{ node.label }}</b>
          <p
            v-if="node.description"
            class="va-text-secondary mb-0"
          >
            {{ node.description }}
          </p>
        </div>

        <va-button
          v-if="node.hasAction"
          preset="secondary"
          icon="add"
          size="small"
          class="ml-auto"
        />
      </div>
    </template>
  </va-tree-view>
</template>

<script>
export default {
  name: "CustomizableContent",

  data: () => ({
    nodes: [
      {
        id: 1,
        label: "Category",
        description: "It is absolutely optional",
        expanded: true,
        children: [
          {
            id: 2,
            label: "Photo",
            description: "This item works so well with the other one.",
            image: "https://picsum.photos/100",
            hasAction: true,
          },
          {
            id: 3,
            label: "Emoji",
            description: "This item corresponds the first item perfectly.",
            image: "https://picsum.photos/100",
            hasAction: true,
          },
          {
            id: 4,
            label: "Password was updated",
            description: "This one as well.",
            children: [
              { id: 5, label: "Node" },
              { id: 6, label: "It is node also" },
            ],
          },
        ],
      },
      {
        id: 7,
        label: "Super category",
        children: [
          { id: 8, label: "Super node" },
          { id: 9, label: "Common node" },
        ],
      },
    ],
  }),
};
</script>
