import { VaTreeView } from '.'
import { VaRadio } from '../va-radio'
import { VaColorPalette } from '../va-color-palette'
import { VaInput } from '../va-input'
import { VaCheckbox } from '../va-checkbox'
import { StoryFn } from '@storybook/vue3'
import { TreeViewFilterMethod } from './types'
import { ref, watch } from 'vue'

export default {
  title: 'VaTreeView',
  component: VaTreeView,
  tags: ['autodocs'],
}

const nodes = () => [
  {
    id: 1,
    label: 'Category',
    children: [
      { id: 2, label: 'Item' },
      {
        id: 3,
        label: 'Subcategory',
        children: [
          { id: 4, label: 'Item' },
          { id: 5, label: 'Item' },
        ],
      },
      { id: 6, label: 'Item' },
    ],
  },
  { id: 7, label: 'Item' },
]

export const Default = () => ({
  components: { VaTreeView },
  data: () => ({
    nodes: nodes(),
  }),
  template: `
    <va-tree-view :nodes="nodes" />
  `,
})

export const Stateless = () => ({
  components: { VaTreeView },
  data: () => ({
    stateChecked: [],
    stateExpanded: [],
    nodes: nodes(),
  }),
  template: `
    <p>
      expansion/selection should work:
      <br />
      checked model: {{stateChecked}}
      <br />
      expanded model: {{stateExpanded}}
    </p>
    <va-tree-view
      v-model:checked="stateChecked"
      v-model:expanded="stateExpanded"
      :stateful="false"
      :nodes="nodes"
      selectable
    />
    <p>
      expansion/selection shouldn't work:
    </p>
    <va-tree-view
      :stateful="false"
      :nodes="nodes"
      selectable
    />
  `,
})

export const Selectable = () => ({
  components: { VaTreeView, VaRadio },
  data: () => ({
    selectionTypeOptions: ['leaf', 'independent'],
    selectionType: 'leaf',
    selectedNodes: [],
    nodes: nodes(),
  }),
  template: `
    <p>Selection strategy</p>
    <va-radio
      v-for="(option, index) in selectionTypeOptions"
      :key="index"
      v-model="selectionType"
      :option="option"
    />
    <va-tree-view
      v-model:checked="selectedNodes"
      :nodes="nodes"
      :selection-type="selectionType"
      selectable
    />
  `,
})

const COLORS_PALETTE = [
  '#4ae387',
  '#e34a4a',
  '#4ab2e3',
  '#db76df',
  '#f7cc36',
  '#f3f3f3',
  '#000',
]

const nodesChecked = () => [
  {
    id: 1,
    label: 'Category',
    checked: true,
    children: [
      {
        id: 2,
        label: 'Subcategory',
        checked: true,
        children: [
          { id: 3, label: 'Item', checked: true },
        ],
      },
    ],
  },
  { id: 4, label: 'Item', checked: true },
]

export const ColoredCheckboxes = () => ({
  components: { VaTreeView, VaColorPalette },
  data: () => ({
    colorsPalette: COLORS_PALETTE,
    selectedColor: COLORS_PALETTE[0],
    nodesChecked: nodesChecked(),
  }),
  template: `
    <va-color-palette
      v-model="selectedColor"
      :palette="colorsPalette"
    />
    <va-tree-view
      :nodes="nodesChecked"
      :color="selectedColor"
      expand-all
      selectable
    />
  `,
})

export const SelectionModel = () => ({
  components: { VaTreeView, VaRadio },
  data: () => ({
    selectionTypeOptions: ['leaf', 'independent'],
    selectionType: 'leaf',
    selectedNodes: [],
    nodes: nodes(),
  }),
  template: `
    <p>Selection strategy</p>
    <va-radio
      v-for="(option, index) in selectionTypeOptions"
      :key="index"
      v-model="selectionType"
      :option="option"
    />
    <p>
      Single selection model for two tree views:
      <br />
      {{ selectedNodes }}
    </p>
    <va-tree-view
      v-model:checked="selectedNodes"
      :nodes="nodes"
      :selection-type="selectionType"
      selectable
    />
    <va-tree-view
      v-model:checked="selectedNodes"
      :nodes="nodes"
      :selection-type="selectionType"
      selectable
    />
  `,
})

export const ValueBy = () => ({
  components: { VaTreeView },
  data: () => ({
    selectedNodesValueBy: [],
    nodes: nodes(),
  }),
  template: `
    <p>{{ selectedNodesValueBy }}</p>
    <br />
    <va-tree-view
      v-model:checked="selectedNodesValueBy"
      :nodes="nodes"
      :value-by="({id, label}) => \`\${id}_\${label}\`"
      selectable
    />
  `,
})

const nodesChildrenBy = () => [
  {
    id: 1,
    label: 'Category',
    items: [
      { id: 2, label: 'Item' },
      {
        id: 3,
        label: 'Subcategory',
        items: [
          { id: 4, label: 'Item' },
          { id: 5, label: 'Item' },
        ],
      },
      { id: 6, label: 'Item' },
    ],
  },
  { id: 7, label: 'Item' },
]

export const ChildrenBy = () => ({
  components: { VaTreeView },
  data: () => ({
    nodesChildrenBy: nodesChildrenBy(),
  }),
  template: `
    <va-tree-view
      :nodes="nodesChildrenBy"
      children-by="items"
    />
  `,
})

const nodesTextBy = () => [
  {
    id: 1,
    title: 'Category',
    children: [
      {
        id: 2,
        title: 'Subcategory',
        children: [
          {
            id: 3,
            title: 'Item',
          },
        ],
      },
    ],
  },
  { id: 4, title: 'Item' },
]

export const TextBy = () => ({
  components: { VaTreeView },
  data: () => ({
    nodesTextBy: nodesTextBy(),
  }),
  template: `
    <va-tree-view
      :nodes="nodesTextBy"
      text-by="title"
    />
  `,
})

const nodesTrackBy = () => [
  {
    trackId: 1,
    label: 'Category',
    children: [
      {
        trackId: 2,
        label: 'Subcategory',
        children: [
          {
            trackId: 3,
            label: 'Item',
          },
        ],
      },
    ],
  },
  { trackId: 4, label: 'Item' },
]

export const TrackBy = () => ({
  components: { VaTreeView },
  data: () => ({
    nodesTrackBy: nodesTrackBy(),
  }),
  template: `
    <va-tree-view
      :nodes="nodesTrackBy"
      track-by="trackId"
    />
  `,
})

const nodesIconBy = [
  {
    id: 1,
    label: 'Category',
    image: 'mail',
    children: [
      {
        id: 2,
        label: 'Subcategory',
        image: 'mail',
        children: [
          { id: 3, label: 'Item' },
        ],
      },
    ],
  },
  { id: 4, image: 'mail', label: 'Item' },
]

export const IconBy = () => ({
  components: { VaTreeView },
  data: () => ({
    nodesIconBy,
  }),
  template: `
    <va-tree-view
      :nodes="nodesIconBy"
      icon-by="image"
    />
  `,
})

const nodesDisabledBy = () => [
  {
    id: 1,
    label: 'Category',
    children: [
      { id: 2, label: 'Item' },
      {
        id: 3,
        label: 'Subcategory',
        inactive: true,
        children: [
          { id: 4, label: 'Item' },
        ],
      },
      { id: 5, label: 'Item' },
    ],
  },
  { id: 6, label: 'Item' },
]

export const DisabledBy = () => ({
  components: { VaTreeView },
  data: () => ({
    nodesDisabledBy: nodesDisabledBy(),
  }),
  template: `
    <va-tree-view
      :nodes="nodesDisabledBy"
      disabled-by="inactive"
      selectable
      expand-all
    />
  `,
})

const nodesExpandedBy = () => [
  {
    id: 1,
    label: 'Category',
    shouldExpand: true,
    children: [
      { id: 2, label: 'Item' },
      {
        id: 3,
        label: 'Subcategory',
        shouldExpand: false,
        children: [
          { id: 4, label: 'Item' },
        ],
      },
      {
        id: 4,
        label: 'Subcategory',
        shouldExpand: true,
        children: [
          { id: 5, label: 'Item' },
        ],
      },
      { id: 6, label: 'Item' },
    ],
  },
  { id: 7, shouldExpand: true, label: 'Item' },
]

export const ExpandedBy = () => ({
  components: { VaTreeView },
  data: () => ({
    nodesExpandedBy: nodesExpandedBy(),
  }),
  template: `
    <va-tree-view
      :nodes="nodesExpandedBy"
      expanded-by="shouldExpand"
    />
  `,
})

export const Expandable = () => ({
  components: { VaTreeView },
  data: () => ({
    nodes: nodes(),
    expandedNodes: [1],
  }),
  template: `
    <p>Expand all</p>
    <va-tree-view :nodes="nodes" expand-all />
    <p>Expanded v-model: {{ expandedNodes }}</p>
    <va-tree-view v-model:expanded="expandedNodes" :nodes="nodes" />
    <va-tree-view :modelValue:expanded="expandedNodes" :nodes="nodes" />
  `,
})

function findNode (nodes: any[], id: number): any {
  for (const node of nodes) {
    if (node.id === id) {
      return node
    }
    if (node.children) {
      const found = findNode(node.children, id)
      if (found) {
        return found
      }
    }
  }
}

export const DynamicExpandable = () => ({
  components: { VaTreeView },

  setup () {
    const nodes = ref([
      { id: 1, label: 'Category', children: [{ id: -1, loading: true }] },
    ])

    const expanded = ref([])

    watch(expanded, (nodeIds) => {
      const expandedNodes = nodeIds.map((id) => findNode(nodes.value, id))

      expandedNodes.forEach((node) => {
      // Prevent from loading items that already loaded
        if (node.children && node.children.length === 1 && node.children[0].loading) {
          node.children = [
            { id: 2, label: 'Item' },
            {
              id: 3,
              label: 'Item',
              expanded: true,
              children: [
                { id: 4, label: 'Item' },
              ],
            },
          ]
        }
      })
    })

    return {
      nodes,
      expanded,
    }
  },

  template: `
    <va-tree-view :nodes="nodes" v-model:expanded="expanded" />

    {{ expanded }}

    ---

    {{ nodes }}
  `,
})

const filterableNodes = () => [
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
    ],
  },
  { id: 5, label: 'Five' },
]

export const Filter: StoryFn = () => ({
  components: { VaTreeView, VaInput, VaCheckbox },
  data: () => ({
    filterValue: '',
    isFilterCaseSensitive: false,
    filterableNodes: filterableNodes(),
  }),
  computed: {
    customFilterMethod (): TreeViewFilterMethod | undefined {
      return this.isFilterCaseSensitive
        ? (node, filter, textBy) => node[textBy as string].includes(filter)
        : undefined
    },
  },
  template: `
    <va-input
      v-model="filterValue"
      placeholder="Filter the tree view"
      style="margin-bottom: 1rem;"
    />
    <br />
    <va-checkbox v-model="isFilterCaseSensitive" label="Case sensitive" />
    <va-tree-view
      :nodes="filterableNodes"
      :filter="filterValue"
      :filter-method="customFilterMethod"
      expand-all
    />
  `,
})

const customBodyNodes = () => [
  {
    id: 1,
    label: 'Category',
    description: 'It is absolutely optional',
    expanded: true,
    children: [
      {
        id: 2,
        label: 'Photo',
        description: 'This item works so well with the other one.',
        image: 'https://picsum.photos/id/450/100',
        hasAction: true,
      },
      {
        id: 3,
        label: 'Emoji',
        description: 'This item corresponds the first item perfectly.',
        image: 'https://picsum.photos/id/450/100',
        hasAction: true,
      },
      {
        id: 4,
        label: 'Password was updated',
        description: 'This one as well.',
        children: [
          { id: 5, label: 'Node' },
          { id: 6, label: 'It is node also' },
        ],
      },
    ],
  },
  {
    id: 7,
    label: 'Super category',
    children: [
      { id: 8, label: 'Super node' },
      { id: 9, label: 'Common node' },
    ],
  },
]

export const WithCustomBody = () => ({
  components: { VaTreeView },
  data: () => ({
    customBodyNodes: customBodyNodes(),
  }),
  template: `
    <va-tree-view :nodes="customBodyNodes">
      <template #content="props">
        <img
          v-if="props.image"
          :src="props.image"
          :alt="props.title"
          style="height: 70px; width: 70px; float: left; margin-right: 5px;"
        />
        <div>
          <b v-if="props.label" style="color: var(--va-primary);">{{props.label}}</b>
          <br />
          <i v-if="props.description" style="color: var(--va-secondary); line-height: 1;">
            {{props.description}}
          </i>
        </div>
      </template>
    </va-tree-view>
  `,
})

export const ExpandByNode = () => ({
  components: { VaTreeView },
  data: () => ({
    nodesChecked: nodesChecked(),
  }),
  template: `
    <p>Node description text is expandable on click</p>
    <va-tree-view
      :nodes="nodesChecked"
      selectable
      expand-all
      expand-node-by="node"
    />
    <p>Node description text is not expandable on click</p>
    <va-tree-view
      :nodes="nodesChecked"
      selectable
      expand-all
      expand-node-by="leaf"
    />
  `,
})

export const ExpandableFalse = () => ({
  components: { VaTreeView },
  data: () => ({
    nodesChecked: nodesChecked(),
  }),
  template: `
    <va-tree-view
      :nodes="nodesChecked"
      selectable
      expand-all
      :expandable="false"
    />
  `,
})
