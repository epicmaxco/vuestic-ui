<template>
  <td class="va-menu-list__group-name-wrapper" colspan="99999">
    <span class="va-menu-list__group-name">
      {{ groupName }}
    </span>
  </td>
  <slot />
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useColors } from '../../../composables'

defineOptions({
  name: 'VaMenuGroup',
})

const props = defineProps({
  groupName: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    default: 'secondary',
  },
})

const { getColor } = useColors()

const colorComputed = computed(() => getColor(props.color))
</script>

<style lang="scss" scoped>
.va-menu-list__group-name-wrapper {
  font-size: 9px;
  font-style: normal;
  font-weight: 700;
  letter-spacing: 0.4px;
  text-transform: uppercase;
  padding: 0 var(--va-menu-padding-x);
  overflow: hidden;
  height: 1rem;
  position: relative;
  color: v-bind("colorComputed");

  .va-menu-list__group-name {
    position: absolute;
    width: 100%;
    top: 0;
    left: 0;
    // Truncate text
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
</style>
