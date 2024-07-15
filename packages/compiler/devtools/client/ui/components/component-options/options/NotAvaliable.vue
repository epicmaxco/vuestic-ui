<script lang="ts" setup>
const props = defineProps<{
  label: string,
}>()
</script>

<template>
  <div class="not-avaliable-option">
    <div class="va-label">{{ props.label }}</div>
    <div class="not-avaliable-option__box">
      Not avaliable
    </div>
  </div>
</template>

<style lang="scss">
.not-avaliable-option {
  opacity: 0.5;

  &__box {
    height: 36px;
    display: flex;
    align-items: center;
  }
}
</style>