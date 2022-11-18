<template>
  <div
    ref="root"
    class="va-select-option-list"
    :tabindex="tabindex"
    @keydown.up.stop.prevent="focusPreviousOption"
    @keydown.left.stop.prevent="focusPreviousOption"
    @keydown.down.stop.prevent="focusNextOption"
    @keydown.right.stop.prevent="focusNextOption"
    @scroll.passive="onScroll"
  >
    <template
      v-for="(options, groupName) in optionGroups"
      :key="groupName"
    >
      <span
        v-if="groupName !== '_noGroup'"
        class="va-select-option-list__group-name"
      >
        {{ groupName }}
      </span>
      <va-virtual-scroller
        v-if="$props.virtualScroller"
        ref="virtualScrollerRef"
        :items="options"
        :track-by="$props.getTrackBy"
        :wrapper-size="rootHeight"
        @scroll:bottom="handleScrollToBottom"
        v-slot="{ item: option, index }"
      >
        <va-select-option
          v-if="!isSlotContentPassed"
          :option="option"
          :current-option="currentOptionComputed"
          v-bind="selectOptionProps"
          @click="selectOption(option)"
          @mousemove="updateHoveredOption(option)"
        />
        <template v-else>
          <slot v-bind="{ option, index, selectOption }" />
        </template>
      </va-virtual-scroller>

      <template v-else>
        <template v-for="(option, index) in options" :key="$props.getTrackBy(option)">
          <va-select-option
            v-if="!isSlotContentPassed"
            :ref="setItemRef($props.getTrackBy(option))"
            :current-option="currentOptionComputed"
            :option="option"
            v-bind="selectOptionProps"
            @click="selectOption(option)"
            @mousemove="updateHoveredOption(option)"
          />
          <template v-else>
            <slot v-bind="{ option, index, selectOption }" />
          </template>
        </template>
      </template>
    </template>
    <div
      v-if="!filteredOptions.length"
      class="va-select-option-list--empty"
    >
      {{ noOptionsText }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, shallowRef, watch, computed } from 'vue'
import pick from 'lodash/pick.js'

import { useComponentPresetProp, useColorProps, extractHTMLElement, useObjectRefs, useSlotPassed } from '../../../../composables'

import { scrollToElement } from '../../../../utils/scroll-to-element'

import { VaVirtualScroller } from '../../../va-virtual-scroller'
import { VaSelectOption } from '../VaSelectOption'

import type { SelectOption, EventSource } from '../../types'

export default defineComponent({
  name: 'VaSelectOptionList',
  components: { VaVirtualScroller, VaSelectOption },
  emits: [
    'select-option',
    'update:hoveredOption',
    'no-previous-option-to-hover',
    'scroll-bottom',
  ],
  props: {
    ...useColorProps,
    ...useComponentPresetProp,
    options: { type: Array as PropType<SelectOption[]>, default: () => [] },
    noOptionsText: { type: String, default: 'Items not found' },
    getSelectedState: { type: Function as PropType<(option: SelectOption) => boolean>, required: true },
    getText: { type: Function as PropType<(option: SelectOption) => string>, required: true },
    getTrackBy: { type: Function as PropType<(option: SelectOption) => number>, required: true },
    getGroupBy: { type: Function as PropType<(option: SelectOption) => string>, required: true },
    multiple: { type: Boolean, default: false },
    search: { type: String, default: '' },
    tabindex: { type: Number, default: 0 },
    hoveredOption: { type: [String, Number, Object] as PropType<SelectOption | null>, default: null },
    virtualScroller: { type: Boolean, default: true },
  },

  setup (props, { emit, slots }) {
    const root = shallowRef<HTMLElement>()
    const focus = () => {
      // Prevent scroll since element in dropdown and it causes scrolling to page end.
      root.value?.focus({ preventScroll: true })
    }
    const rootHeight = computed(() => root.value?.clientHeight ?? 200)

    const handleScrollToBottom = () => emit('scroll-bottom')
    const onScroll = (event: UIEvent) => {
      const target = event.target as Element
      if (!target) { return }

      if (target.scrollTop + target.clientHeight === target.scrollHeight) {
        handleScrollToBottom()
      }
    }

    const lastInteractionSource = ref<EventSource>('')
    const currentOptionComputed = computed(() => props.hoveredOption || null)
    const updateCurrentOption = (option: SelectOption | null, source: EventSource) => {
      emit('update:hoveredOption', option)
      lastInteractionSource.value = source
    }

    const filteredOptions = computed(() => {
      if (!props.search) { return props.options }

      return props.options.filter((option: SelectOption) => {
        const optionText = props.getText(option).toString().toUpperCase()
        const search = props.search.toUpperCase()
        return optionText.includes(search)
      })
    })

    const optionGroups = computed(() => filteredOptions.value
      .reduce((groups: Record<string, SelectOption[]>, option) => {
        if (typeof option !== 'object' || !props.getGroupBy(option)) {
          groups._noGroup.push(option)
        } else {
          const groupBy = props.getGroupBy(option)

          if (!groups[groupBy]) { groups[groupBy] = [] }

          groups[groupBy].push(option)
        }

        return groups
      }, { _noGroup: [] }))

    const updateHoveredOption = (option?: SelectOption) => {
      if (option === currentOptionComputed.value) { return }

      updateCurrentOption(option || null, 'mouse')
    }
    const updateFocusedOption = (option?: SelectOption) => { updateCurrentOption(option || null, 'keyboard') }

    const selectOption = (option: SelectOption) => emit('select-option', option)

    const currentOptionIndex = computed(() => filteredOptions.value.findIndex((option) => {
      return !!currentOptionComputed.value && props.getTrackBy(option) === props.getTrackBy(currentOptionComputed.value)
    }))

    const selectOptionProps = computed(
      () => pick(props, ['getSelectedState', 'getText', 'getTrackBy', 'color']),
    )

    const isSlotContentPassed = useSlotPassed()

    // public
    const focusPreviousOption = () => {
      if (!currentOptionComputed.value) {
        // Hover last option from list
        filteredOptions.value.length && updateFocusedOption(filteredOptions.value.at(-1))
        return
      }

      if (filteredOptions.value[currentOptionIndex.value - 1]) {
        updateFocusedOption(filteredOptions.value[currentOptionIndex.value - 1])
      } else {
        emit('no-previous-option-to-hover')
      }
    }

    const focusNextOption = () => {
      if (!currentOptionComputed.value) {
        // Hover first option from list
        filteredOptions.value.length && updateFocusedOption(filteredOptions.value[0])
        return
      }

      if (filteredOptions.value[currentOptionIndex.value + 1]) {
        updateFocusedOption(filteredOptions.value[currentOptionIndex.value + 1])
      }
    }

    const focusFirstOption = () => updateFocusedOption(filteredOptions.value?.[0])

    const { itemRefs, setItemRef } = useObjectRefs()
    const virtualScrollerRef = shallowRef<Array<InstanceType<typeof VaVirtualScroller>>>()
    const scrollToOption = (option: SelectOption) => {
      if (!option) { return }

      const element = itemRefs.value[props.getTrackBy(option)]
      if (element) { scrollToElement(extractHTMLElement(element)) }

      if (props.virtualScroller) { virtualScrollerRef.value?.[0].virtualScrollTo(currentOptionIndex.value) }
    }

    const publicMethods = {
      focusPreviousOption,
      focusNextOption,
      focusFirstOption,
      scrollToOption,
      focus,
    }

    watch(() => props.hoveredOption, (newOption: SelectOption | null) => {
      (!lastInteractionSource.value || lastInteractionSource.value === 'keyboard') && newOption && scrollToOption(newOption)
    })

    return {
      root,
      virtualScrollerRef,

      rootHeight,
      optionGroups,
      filteredOptions,
      selectOptionProps,
      isSlotContentPassed,
      currentOptionComputed,

      onScroll,
      setItemRef,
      selectOption,
      updateHoveredOption,
      handleScrollToBottom,

      ...publicMethods,
    }
  },
})
</script>

<style lang="scss">
@import "../../../../styles/resources";
@import "variables";

.va-select-option-list {
  overflow: auto;
  width: var(--va-select-option-list-width);
  max-height: var(--va-select-option-list-max-height);
  display: flex;
  flex-direction: column;
  font-family: var(--va-font-family);

  &--empty {
    padding: var(--va-select-option-list-empty-block-padding);
  }

  @include va-scroll(var(--va-primary));

  &__group-name {
    padding: var(--va-select-option-list-group-name-padding);
    font-size: var(--va-select-option-list-group-name-font-size);
    color: var(--va-select-option-list-group-name-color);
    font-weight: var(--va-select-option-list-group-name-font-weight);
    text-transform: var(--va-select-option-list-group-name-text-transform);
  }
}
</style>
