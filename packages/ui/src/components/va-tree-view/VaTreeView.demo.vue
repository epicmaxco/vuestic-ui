<template>
  <VbDemo>
    <VbCard title="default">
      <va-tree-view
        :nodes="nodes"
        node-key="id"
      />
    </VbCard>
    <VbCard title="Icons">
      <va-tree-view
        :nodes="nodesWithIcons"
        node-key="id"
        expand-all
      >
        <template #node-icon="{icon}">
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
        node-key="id"
        expand-all
        selectable
        :selection-type="selectionType"
      >
        <template #node-icon="{icon}">
          <va-icon
            v-if="icon"
            :name="icon"
            size="20px"
          />
        </template>
      </va-tree-view>
    </VbCard>
    <VbCard title="With custom body">
      <va-tree-view
        :nodes="customBodyNodes"
        node-key="id"
      >
        <template #node-body="prop">
          <div class="d-flex align--center">
            <va-avatar
              v-if="prop.image"
              :src="prop.image"
              style="margin-right: 0.5rem;"
            />

            <div style="margin-right: 0.5rem;">
              <b v-if="prop.label">{{ prop.label }}</b>
              <p v-if="prop.description">{{ prop.description }}</p>
            </div>

            <va-button
              v-if="prop.hasAction"
              flat
              icon="add"
              size="small"
              style="margin-left: auto;"
            />
          </div>
        </template>
      </va-tree-view>
    </VbCard>
    <VbCard title="Filter">
      <va-input
        v-model="filterValue"
        placeholder="Filter the tree view"
      />
      <va-tree-view
        :nodes="nodes"
        node-key="id"
        expand-all
        :filter="filterValue"
      />
    </VbCard>
    <VbCard title="Colored checkboxes">
      <va-color-palette
        v-model="selectedColor"
        :palette="colorsPalette"
      />
      <va-tree-view
        :nodes="nodes"
        node-key="id"
        selectable
        expand-all
        :color="selectedColor"
      />
    </VbCard>
  </VbDemo>
</template>

<script>
import VaTreeView from './VaTreeView.vue'
import VaRadio from '../va-radio'
import VaInput from '../va-input'
import VaAvatar from '../va-avatar'
import VaButton from '../va-button'
import VaIcon from '../va-icon'
import { VaColorPalette } from '../va-color-palette'

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
    VaAvatar,
    VaButton,
    VaIcon,
    VaColorPalette,
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
  }),
}
</script>

<style lang="scss" scoped>
.custom-body-example {
  display: flex;
  align-items: center;
  justify-content: space-between;

  &__item {
    + .custom-body-example__item {
      margin-left: 0.5rem;
    }
  }
}
</style>
