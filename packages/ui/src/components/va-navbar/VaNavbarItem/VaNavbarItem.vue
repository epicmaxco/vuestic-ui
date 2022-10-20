<template>
  <div class="va-navbar__item">
    <slot />
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'VaNavbarItem',
})
</script>

<style lang="scss">
@import "../../../styles/resources";

.va-navbar__item {
  display: flex;
  align-items: center;
  font-family: var(--va-font-family);
}
</style>
