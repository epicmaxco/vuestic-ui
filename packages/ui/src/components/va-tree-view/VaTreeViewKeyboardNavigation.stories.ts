import { TreeNode, VaTreeView } from '.'
import { StoryFn } from '@storybook/vue3'

export default {
  title: 'VaTreeViewKeyboardNavigation',
  component: VaTreeView,
  tags: ['autodocs'],
}

const flat = () => [
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
]

export const FlatLikeNavigation = () => ({
  components: { VaTreeView },
  data: () => ({
    flat: flat(),
  }),
  template: `
    <va-tree-view :nodes="flat" />
  `,
})

const stairs = () => [
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
]

export const StairLikeNavigation = () => ({
  components: { VaTreeView },
  data: () => ({
    stairs: stairs(),
  }),
  template: `
    <va-tree-view :nodes="stairs" />
  `,
})

const triangle = () => [
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
]

export const TriangleLikeNavigation = () => ({
  components: { VaTreeView },
  data: () => ({
    triangle: triangle(),
  }),
  template: `
    <va-tree-view :nodes="triangle" />
  `,
})

const waves = () => [
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
]

export const WavesLikeNavigation = () => ({
  components: { VaTreeView },
  data: () => ({
    waves: waves(),
  }),
  template: `
    <va-tree-view :nodes="waves" />
  `,
})

export const Selection: StoryFn = () => ({
  components: { VaTreeView },
  data: () => ({
    selectedNode: null,
    triangle: triangle(),
  }),
  methods: {
    onSelectNode (node: TreeNode) {
      this.selectedNode = node ? `${node.id} ${node.label}` : null
    },
  },
  template: `
    <p>Selected node: {{selectedNode}}</p>
    <br />
    <va-tree-view
      :nodes="triangle"
      @update:selected="onSelectNode"
      expand-all
    />
  `,
})

export const CheckboxsSelection = () => ({
  components: { VaTreeView },
  data: () => ({
    checkedNodes: [],
    triangle: triangle(),
  }),
  template: `
    <p>Checked nodes: {{checkedNodes}}</p>
    <br />
    <va-tree-view
      v-model:checked="checkedNodes"
      :nodes="triangle"
      selectable
      expand-all
    />
  `,
})
