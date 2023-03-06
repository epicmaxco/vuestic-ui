<template>
  <VbDemo>
    <VbCard title="Default">
      <va-tree-view :nodes="nodes" />
    </VbCard>
    <VbCard title="Stateless">
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
    </VbCard>
    <VbCard title="Selectable">
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
    </VbCard>
    <VbCard title="Colored checkboxes">
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
    </VbCard>
    <VbCard title="Selection model">
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
        :selection-type="selectionType"
        :nodes="nodes"
        selectable
      />
    </VbCard>
    <VbCard title="valueBy">
      <p>{{ selectedNodesValueBy }}</p>
      <br />
      <va-tree-view
        v-model:checked="selectedNodesValueBy"
        :nodes="nodes"
        :value-by="({id, label}) => `${id}_${label}`"
        selectable
      />
    </VbCard>
    <VbCard title="childrenBy">
      <va-tree-view
        :nodes="nodesChildrenBy"
        children-by="items"
      />
    </VbCard>
    <VbCard title="textBy">
      <va-tree-view
        :nodes="nodesTextBy"
        text-by="title"
      />
    </VbCard>
    <VbCard title="trackBy">
      <va-tree-view
        :nodes="nodesTrackBy"
        track-by="trackId"
      />
    </VbCard>
    <VbCard title="iconBy">
      <va-tree-view
        :nodes="nodesIconBy"
        icon-by="image"
      />
    </VbCard>
    <VbCard title="disabledBy">
      <va-tree-view
        :nodes="nodesDisabledBy"
        disabled-by="inactive"
        selectable
        expand-all
      />
    </VbCard>
    <VbCard title="Expandable">
      <p>Expand all</p>
      <va-tree-view :nodes="nodes" expand-all />
      <p>Expanded by</p>
      <va-tree-view :nodes="nodes" expand-all />
      <p>Expanded v-model: {{ expandedNodes }}</p>
      <va-tree-view v-model:expanded="expandedNodes" :nodes="nodes" />
      <va-tree-view :modelValue:expanded="expandedNodes" :nodes="nodes" />
    </VbCard>
    <VbCard title="Filter">
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
    </VbCard>
    <VbCard title="With custom body">
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
    </VbCard>

    <VbCard title="Expand by node">
      <va-tree-view
        :nodes="nodesChecked"
        expand-all
        selectable
        expand-node-by="node"
      />
    </VbCard>
  </VbDemo>
</template>

<script>
import {
  VaRadio,
  VaInput,
  VaIcon,
  VaColorPalette,
  VaCheckbox,
} from '../'
import { VaTreeView } from './'

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
  name: 'VaTreeView.demo',

  components: {
    VaTreeView,
    VaRadio,
    VaInput,
    VaColorPalette,
    VaCheckbox,
  },

  data: () => ({
    stateChecked: [],
    stateExpanded: [],

    selectionType: 'leaf',
    selectionTypeOptions: ['leaf', 'independent'],
    selectedNodes: [],
    selectedNodesValueBy: [],
    expandedNodes: [1],
    filterValue: '',
    colorsPalette: COLORS_PALETTE,
    selectedColor: COLORS_PALETTE[0],
    nodes: [
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
    ],
    nodesChecked: [
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
    ],
    nodesTextBy: [
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
    ],
    nodesTrackBy: [
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
    ],
    nodesIconBy: [
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
    ],
    nodesDisabledBy: [
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
    ],
    nodesChildrenBy: [
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
    ],
    filterableNodes: [
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
    ],
    isFilterCaseSensitive: false,
    customBodyNodes: [
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
            image: 'https://picsum.photos/100',
            hasAction: true,
          },
          {
            id: 3,
            label: 'Emoji',
            description: 'This item corresponds the first item perfectly.',
            image: 'https://picsum.photos/100',
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
    ],
  }),

  computed: {
    customFilterMethod () {
      return this.isFilterCaseSensitive
        ? (node, filter, textBy) => node[textBy].includes(filter)
        : undefined
    },
  },
}
</script>

<style lang="scss" scoped></style>
