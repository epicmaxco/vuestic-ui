<template>
  <div class="va-navbar__item">
    <slot />
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'VaNavbarItem',

  props: {}, // TODO: In web components build props are required (it's a vue bug)
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
