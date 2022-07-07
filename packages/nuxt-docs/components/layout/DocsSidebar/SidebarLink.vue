<template>
  <va-list-item
    :to="path"
    class="sidebar__link"
    :style="computedStyle"
    active-class="text--primary"
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
  >
    <va-list-item-section>
      <va-list-item-label>
        <slot></slot>
      </va-list-item-label>
    </va-list-item-section>
  </va-list-item>
</template>

<script setup lang="ts">
  import { useColors } from 'vuestic-ui'

  const props = defineProps({
    path: { type: String, default: undefined }
  })

  const { getColor, getHoverColor } = useColors()

  const isHovered = ref(false)

  const computedStyle = computed(() => ({
    backgroundColor: isHovered.value ? getHoverColor(getColor('primary', '#ECF4F8')) : '',
    color: isHovered.value ? getColor('primary', '#2C82E0') : '',
  }))
</script>

<style lang="scss" scoped>
@import "vuestic-ui/styles/resources";

.sidebar__link {
  display: block;
  padding: 1rem 0 1rem 2rem;
  line-height: normal;
}
</style>
