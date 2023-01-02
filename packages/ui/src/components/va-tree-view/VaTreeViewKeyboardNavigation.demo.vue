<template>
  <VbDemo>
    <VbCard>
      <va-tree-view :nodes="flat" />
    </VbCard>
    <VbCard>
      <va-tree-view :nodes="stairs" />
    </VbCard>
    <VbCard>
      <va-tree-view :nodes="triangle" />
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
  }),
}
</script>
