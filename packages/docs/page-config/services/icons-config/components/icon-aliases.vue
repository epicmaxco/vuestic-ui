<template>
  <VaList>
    <VaListItem
      v-for="{ name, to } in VuesticIconAliases"
      :key="name"
      class="mt-2"
    >
      <VaListItemSection avatar>
        <VaIcon
          :name="name"
          size="32px"
        />
      </VaListItemSection>
      <VaListItemSection>
        <VaListItemLabel>
          {{ name }}
        </VaListItemLabel>

        <VaListItemLabel caption>
          {{ to }}
        </VaListItemLabel>
      </VaListItemSection>
    </VaListItem>
  </VaList>
</template>

<script setup lang="ts">
import { VuesticIconAliases } from "vuestic-ui/src/services/icon/presets/vuestic-aliases";
</script>

<style lang="scss" scoped>
.va-list {
  width: 100%;

  .va-list-item {
    width: 25%;
    display: inline-block;

    @media screen and (max-width: 1024px) {
      width: 33%;
    }

    @media screen and (max-width: 768px) {
      width: 50%;
    }

    @media screen and (max-width: 480px) {
      width: 100%;
    }
  }
}
</style>
