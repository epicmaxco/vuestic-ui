<template>
  <VbDemo>
    <VbCard title="With list" style="width: 200px;">
      <VaList>
        <VaListItem style="background-color: lightgray;">One</VaListItem>
        <va-separator />
        <VaListItem  style="background-color: lightgray;">Two</VaListItem>
        <va-separator />
        <VaListItem  style="background-color: lightgray;">Three</VaListItem>
      </VaList>
    </VbCard>

    <VbCard title="With tabs" style="width: 400px;">
      <va-tabs v-model="value">
        <template #tabs>
          <va-tab>One</va-tab>
          <va-tab>Two</va-tab>
          <va-tab>Three</va-tab>
        </template>
      </va-tabs>
      <va-separator />
    </VbCard>

    <VbCard title="With card">
      <va-card>
        <va-card-content  style="background-color: lightgray;">
          Some 1
          <va-separator />
          Some 2
        </va-card-content>
        <va-separator />
        <va-card-content  style="background-color: lightgray;">
          Another card content
        </va-card-content>
      </va-card>
    </VbCard>
  </VbDemo>
</template>

<script>
import { VaSeparator } from './index'
import { VaTabs, VaTab } from '../va-tabs'
import { VaList, VaListItem } from '../va-list'
import { VaCard, VaCardContent } from '../va-card'

export default {
  components: {
    VaCard,
    VaCardContent,
    VaTab,
    VaTabs,
    VaSeparator,
    VaList,
    VaListItem,
  },
  data () {
    return {
      value: 0,
    }
  },
}
</script>
