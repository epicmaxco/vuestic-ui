<template>
  <div class="va-spacer" aria-hidden="true" />
</template>

<script lang="ts" setup>

defineOptions({
  name: 'VaSpacer',
})

</script>

<style lang="scss">
@use "variables";

.va-spacer {
  flex-grow: var(--va-spacer-flex-grow);
}
</style>
