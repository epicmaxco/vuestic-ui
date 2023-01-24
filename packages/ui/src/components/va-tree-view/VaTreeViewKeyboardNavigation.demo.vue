<template>
  <VbDemo>
    <VbCard title="Flat-like navigation">
      <va-tree-view :nodes="flat" />
    </VbCard>
    <VbCard title="Stair-like navigation">
      <va-tree-view :nodes="stairs" />
    </VbCard>
    <VbCard title="Triangle-like navigation">
      <va-tree-view :nodes="triangle" />
    </VbCard>
    <VbCard title="Waves-like navigation">
      <va-tree-view :nodes="waves" />
    </VbCard>
    <VbCard title="Selection">
      Selected node: {{selectedNode}}
      <br />
      <va-tree-view
        :nodes="triangle"
        @update:selected="onSelectNode"
        expand-all
      />
    </VbCard>
    <VbCard title="Checkboxes selection">
      Checked nodes: {{checkedNodes}}
      <br />
      <va-tree-view
        v-model:checked="checkedNodes"
        :nodes="triangle"
        selectable
        expand-all
      />
    </VbCard>
  </VbDemo>
</template>

<script>
import VaTreeView from './VaTreeView.vue'

export default {
  name: 'VaTreeViewKeyboardNavigation.demo',

  components: {
    VaTreeView,
  },

  data: () => ({
    selectedNode: null,
    checkedNodes: [],
    flat: [
      {
        id: 1,
        label: 'Item',
      },
      {
        id: 2,
        label: 'Item',
      },
      {
        id: 3,
        label: 'Item',
      },
    ],
    stairs: [
      {
        id: 1,
        label: 'Item',
        children: [
          {
            id: 2,
            label: 'Item',
            children: [
              {
                id: 3,
                label: 'Item',
                children: [
                  {
                    id: 4,
                    label: 'Item',
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: 5,
        label: 'Item',
        children: [
          {
            id: 6,
            label: 'Item',
            children: [
              {
                id: 7,
                label: 'Item',
                children: [
                  {
                    id: 8,
                    label: 'Item',
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
    triangle: [
      {
        id: 1,
        label: 'Item',
        children: [
          {
            id: 2,
            label: 'Item',
            children: [
              {
                id: 3,
                label: 'Item',
              },
              {
                id: 4,
                label: 'Item',
              },
            ],
          },
          {
            id: 5,
            label: 'Item',
          },
        ],
      },
      {
        id: 6,
        label: 'Item',
      },
    ],
    waves: [
      {
        id: 1,
        label: 'Item',
      },
      {
        id: 2,
        label: 'Item',
        children: [
          {
            id: 3,
            label: 'Item',
          },
        ],
      },
      {
        id: 4,
        label: 'Item',
        children: [
          {
            id: 5,
            label: 'Item',
          },
        ],
      },
      {
        id: 6,
        label: 'Item',
        children: [
          {
            id: 6,
            label: 'Item',
          },
        ],
      },
      {
        id: 7,
        label: 'Item',
      },
    ],
  }),

  methods: {
    onSelectNode (node) {
      this.selectedNode = node ? `${node.id} ${node.label}` : null
    },
  },
}
</script>
