<template>
  <VbCard title="divider with list">
    <va-list style="width: 400px;">
      <va-list-item>Item 1</va-list-item>
      <va-divider>Default</va-divider>
      <va-list-item>Item 2</va-list-item>
      <va-divider />

      <va-list-item>Item 1</va-list-item>
      <va-divider inset>
        Inset
      </va-divider>
      <va-list-item>Item 2</va-list-item>
      <va-divider inset />
      <va-list-item>Item 3</va-list-item>
    </va-list>
  </VbCard>
</template>

<script>
import VaList, { VaListItem } from '../va-list'
import VaDivider from './VaDivider'

export default {
  name: 'DividerWithList',
  components: { VaDivider, VaListItem, VaList },
  data () {
    return {
      isInset: false,
    }
  },
}
</script>
