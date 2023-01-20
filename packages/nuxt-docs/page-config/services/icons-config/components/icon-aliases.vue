<template>
  <va-list>
    <va-list-item v-for="{ name, to } in VuesticIconAliases" :key="name" class="mt-2">
      <va-list-item-section avatar>
        <va-icon :name="name" size="32px" />
      </va-list-item-section>
      <va-list-item-section>
        <va-list-item-label>
          {{ name }}
        </va-list-item-label>

        <va-list-item-label caption>
          {{ to }}
        </va-list-item-label>
      </va-list-item-section>
    </va-list-item>
  </va-list>
</template>

<script setup lang="ts">
import { VuesticIconAliases } from 'vuestic-ui/src/services/icon/presets/vuestic-aliases'
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
