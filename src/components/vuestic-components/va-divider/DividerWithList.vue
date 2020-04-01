<template>
  <VbCard title="divider with list">
    <VaList
      style="width: 400px;"
      class="ma-2"
    >
      <VaItem>Item 1</VaItem>
      <VaDivider>Default</VaDivider>
      <VaItem>Item 2</VaItem>
      <VaDivider />

      <VaItem>Item 1</VaItem>
      <VaDivider inset>
        Inset
      </VaDivider>
      <VaItem>Item 2</VaItem>
      <VaDivider inset />
      <VaItem>Item 3</VaItem>
    </VaList>
  </VbCard>
</template>

<script>
import VaList from '../va-list/VaList'
import VaItem from '../va-list/VaItem'
import VaDivider from './VaDivider'

export default {
  name: 'DividerWithList',
  components: { VaDivider, VaItem, VaList },
  data () {
    return {
      isInset: false,
    }
  },
}
</script>
