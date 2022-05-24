<template>
  <VbDemo>
    <VbCard>
      <va-button @click="$refs.treeView.expand()">
        EXPAND ALL
      </va-button>
      <va-button @click="$refs.treeView.collapse()">
        COLLAPSE ALL
      </va-button>

      <va-tree-view ref="treeView">
        <va-tree-category
          label="Category text"
          is-open
        >
          <va-tree-node>
            Node text
          </va-tree-node>
          <va-tree-category
            label="Category text"
            is-open
          >
            <va-tree-node>
              Node text
            </va-tree-node>
          </va-tree-category>
        </va-tree-category>
      </va-tree-view>
    </VbCard>
    <VbCard title="Color">
      <va-tree-view
        color="info"
      >
        <va-tree-category
          label="Category text"
          is-open
        >
          <va-tree-node>
            Node text
          </va-tree-node>
          <va-tree-node>
            Node text
          </va-tree-node>
        </va-tree-category>
      </va-tree-view>
    </VbCard>
  </VbDemo>
</template>

<script>
import VaTreeView from './VaTreeView.vue'
import VaTreeNode from './VaTreeNode/VaTreeNode'
import VaTreeCategory from './VaTreeCategory/VaTreeCategory'
import VaButton from '../va-button/VaButton'

export default {
  components: { VaButton, VaTreeCategory, VaTreeNode, VaTreeView },
}
</script>
