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

<script lang='ts' setup>
import { ref, computed } from 'vue'
import { useColors } from 'vuestic-ui'

const props = defineProps({
  path: { type: String },
})

const isHovered = ref(false)

const { getColor, getHoverColor } = useColors()

const computedStyle = computed(() => ({
  backgroundColor: isHovered.value ? getHoverColor(getColor('primary', '#ecf4f8')) : '',
  color: isHovered.value ? getColor('primary', '#2c82e0') : '',
}))
</script>

<style lang="scss" scoped>
@import "../../../../ui/src/styles/resources";

.sidebar__link {
  display: block;
  color: inherit;
  padding: 1rem 0 1rem 2rem;
  line-height: normal;

  .va-list-item-section {
    color: inherit;

    .va-list-item-label {
      color: inherit;
    }
  }
}
</style>
