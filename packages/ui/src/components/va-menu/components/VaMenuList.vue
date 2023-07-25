<template>
  <div class="va-menu-list">
    <template v-for="(options, groupName) in optionGroups" :key="groupName">
      <span v-if="groupName !== '_noGroup'" class="va-select-option-list__group-name">
        {{ groupName }}
      </span>
      <template v-for="(option) in options" :key="getTrackBy(option)">
        <va-menu-item :name="getText(option)" :icon="option.icon" :right-icon="option.rightIcon"
          :disabled="getDisabled(option)" @option-click="$emit('option-click', getValue(option))" />
      </template>
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
    const { getText, getValue, getDisabled, getGroupBy, getTrackBy } = useSelectableList(props)

    const optionGroups = computed(() => props.options
      .reduce((groups: Record<string, VaMenuOption[]>, option) => {
        const groupBy = getGroupBy(option)

        if (!groupBy) {
          groups._noGroup.push(option)
        } else {
          if (!groups[groupBy]) { groups[groupBy] = [] }

          groups[groupBy].push(option)
        }

        return groups
      }, { _noGroup: [] }))

    return {
      getText,
      getValue,
      getDisabled,
      getTrackBy,
      optionGroups,
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
