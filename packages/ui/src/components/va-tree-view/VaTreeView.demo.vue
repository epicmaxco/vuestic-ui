<template>
  <VbDemo>
    <VbCard title="Default">
      <va-tree-view :nodes="nodes" />
    </VbCard>
    <VbCard title="Icons">
      <va-tree-view :nodes="nodesWithIcons" expand-all>
        <template #icon="{icon}">
          <va-icon
            v-if="icon"
            :name="icon"
            size="20px"
          />
        </template>
      </va-tree-view>
    </VbCard>
    <VbCard title="Selection and icons">
      <va-radio
        v-for="(option, index) in selectionTypeOptions"
        :key="index"
        v-model="selectionType"
        :option="option"
      />
      <br />
      <p>
        {{ JSON.stringify(selectedNodes) }}
      </p>
      <br />
      <va-tree-view
        v-model="selectedNodes"
        :nodes="nodesWithIcons"
        expand-all
        selectable
        :selection-type="selectionType"
      >
        <template #icon="{icon}">
          <va-icon
            v-if="icon"
            :name="icon"
            size="20px"
          />
        </template>
      </va-tree-view>
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
    <VbCard title="Filter">
      <va-input v-model="filterValue" placeholder="Filter the tree view" style="margin-bottom: 1rem;" />
      <va-checkbox v-model="isFilterCaseSensitive" label="Case sensitive" />
      <va-tree-view
        :nodes="filterableNodes"
        :filter="filterValue"
        :filter-method="customFilterMethod"
        expand-all
      />
    </VbCard>
    <VbCard title="Colored checkboxes">
      <va-color-palette
        v-model="selectedColor"
        :palette="colorsPalette"
      />
      <va-tree-view
        :nodes="nodes"
        :color="selectedColor"
        selectable
        expand-all
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
    VaIcon,
    VaColorPalette,
    VaCheckbox,
  },

  data: () => ({
    selectionType: 'leaf',
    selectionTypeOptions: ['leaf', 'independent'],
    selectedNodes: [],
    filterValue: '',
    colorsPalette: COLORS_PALETTE,
    selectedColor: COLORS_PALETTE[0],
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
    nodesWithIcons: [
      {
        id: 1,
        label: 'Category',
        icon: 'mail',
        children: [
          {
            id: 2,
            label: 'Subcategory',
            icon: 'mail',
            children: [
              { id: 3, label: 'Item' },
              { id: 4, label: 'Item', icon: 'mail' },
            ],
          },
          {
            id: 5,
            label: 'Subcategory',
            icon: 'mail',
            children: [
              { id: 6, label: 'Item' },
            ],
          },
        ],
      },
      {
        id: 7,
        label: 'Category',
        icon: 'mail',
        children: [
          { id: 8, label: 'Item' },
        ],
      },
      {
        id: 9,
        label: 'Category',
        icon: 'mail',
        children: [
          { id: 10, label: 'Item' },
        ],
      },
      {
        id: 11,
        label: 'Item',
      },
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
          {
            id: 5,
            label: 'Five',
            children: [
              { id: 6, label: 'Six' },
            ],
          },
        ],
      },
      {
        id: 7,
        label: 'Seven',
        children: [
          { id: 8, label: 'Eight' },
        ],
      },
      {
        id: 9,
        label: 'Nine',
        children: [
          { id: 10, label: 'Ten' },
        ],
      },
      {
        id: 11,
        label: 'Eleven',
        children: [
          { id: 12, label: 'Twelve' },
          {
            id: 13,
            label: 'Thirteen',
            children: [
              {
                id: 14,
                label: 'Fourteen',
                children: [
                  { id: 15, label: 'Fifteen' },
                ],
              },
            ],
          },
        ],
      },
    ],
    isFilterCaseSensitive: false,
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
