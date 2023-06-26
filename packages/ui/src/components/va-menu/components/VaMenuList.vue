<template>
  <div class="va-menu-list">
    <template
      v-for="(option, index) in options" :key="index"
    >
      <va-menu-item
        :name="getText(option)"
        :icon="option.icon"
        :right-icon="option.rightIcon"
        :disabled="getDisabled(option)"
        @option-click="$emit('option-click', getValue(option))"
      />
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, shallowRef, watch, computed } from 'vue'
import VaMenuItem from './VaMenuItem.vue'
import { VaMenuOption } from '../types'
import { SelectableOption, useSelectableList, useSelectableListProps } from '../../../composables'

export default defineComponent({
  name: 'VaMenuList',
  components: { VaMenuItem },
  props: {
    ...useSelectableListProps,
    options: { type: Array as PropType<VaMenuOption[]>, default: () => [] },
  },
  setup (props) {
    const { getText, getValue, getDisabled } = useSelectableList(props)

    return {
      getText,
      getValue,
      getDisabled,
    }
  },
})

</script>

<style lang="scss">

.va-menu-list {
  overflow: auto;
  display: flex;
  flex-direction: column;
}

</style>
