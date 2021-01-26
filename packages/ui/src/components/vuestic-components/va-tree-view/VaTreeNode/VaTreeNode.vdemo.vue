<template>
  <VbDemo>
    <VbCard title="default">
      <va-tree-node>
        Some text
      </va-tree-node>
    </VbCard>
    <VbCard title="with icon">
      <va-tree-node icon="send">
        Some text
      </va-tree-node>
    </VbCard>
    <VbCard title="with right icon">
      <va-tree-node icon-right="send">
        Some text
      </va-tree-node>
    </VbCard>
    <VbCard title="highlighted">
      <va-tree-node highlighted>
        Some text
      </va-tree-node>
    </VbCard>
    <VbCard title="with checkbox">
      <va-tree-node>
        <template #checkbox>
          <va-checkbox
            v-model="checkboxValue"
          />
        </template>
        Some text
      </va-tree-node>
    </VbCard>
  </VbDemo>
</template>

<script>
import VaCheckbox from '../../va-checkbox'
import VaTreeNode from './index'

export default {
  components: {
    VaTreeNode,
    VaCheckbox,
  },
  data () {
    return {
      checkboxValue: false,
    }
  },
}
</script>
