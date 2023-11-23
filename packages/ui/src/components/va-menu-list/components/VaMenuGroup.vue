<template>
  <tr v-bind="$attrs">
    <td class="va-menu-list__group-name-wrapper" colspan="99999">
      <span class="va-menu-list__group-name">
        {{ groupName }}
      </span>
    </td>
  </tr>
  <slot />
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useColors } from '../../../composables'

export default defineComponent({
  name: 'VaMenuGroup',
  props: {
    groupName: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      default: 'secondary',
    },
  },
  setup (props) {
    const { getColor } = useColors()

    const colorComputed = computed(() => getColor(props.color))

    return {
      colorComputed,
    }
  },
})
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
    // Truncate text
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
</style>
