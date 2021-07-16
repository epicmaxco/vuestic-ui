<template>
  <VbDemo>
    <VbCard title="Default">
      <va-tree-category
        label="Category with icon"
        icon="send"
      >
        <va-tree-node>
          One
        </va-tree-node>
        <va-tree-node>
          Two
        </va-tree-node>
        <va-tree-node>
          Three
        </va-tree-node>
      </va-tree-category>
    </VbCard>
    <VbCard>
      <va-tree-category
        label="Category with icon"
        icon="send"
      >
        <va-tree-node>
          One
        </va-tree-node>
        <va-tree-node>
          Two
        </va-tree-node>
        <va-tree-node>
          Three
        </va-tree-node>
      </va-tree-category>
      <va-tree-category label="Category with checkbox">
        <template #checkbox>
          <va-checkbox
            v-model="value"
          />
        </template>
        <va-tree-node>
          One
        </va-tree-node>
        <va-tree-node>
          Two
        </va-tree-node>
        <va-tree-node>
          Three
        </va-tree-node>
      </va-tree-category>
      <va-tree-category label="Category without icon">
        <va-tree-node>
          One
        </va-tree-node>
        <va-tree-node>
          Two
        </va-tree-node>
        <va-tree-node>
          Three
        </va-tree-node>
      </va-tree-category>
    </VbCard>
    <VbCard title="Colors">
      <va-tree-category
        label="Category with icon"
        color="info"
      >
        <template #icon>
          <va-icon
            name="send"
          />
        </template>
        <va-tree-node>
          One
        </va-tree-node>
        <va-tree-node>
          Two
        </va-tree-node>
        <va-tree-node>
          Three
        </va-tree-node>
      </va-tree-category>
    </VbCard>
  </VbDemo>
</template>

<script>
import VaIcon from '../../va-icon'
import VaCheckbox from '../../va-checkbox'

import VaTreeNode from '../VaTreeNode'
import VaTreeCategory from './index'

export default {
  components: { VaCheckbox, VaIcon, VaTreeNode, VaTreeCategory },
  data () {
    return {
      value: false,
    }
  },
}
</script>
