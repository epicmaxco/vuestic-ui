<template>
  <div
    ref="root"
    class="va-select-option-list"
    :tabindex="tabindex"
    @keydown.up.stop.prevent="focusPreviousOption"
    @keydown.left.stop.prevent="focusPreviousOption"
    @keydown.down.stop.prevent="focusNextOption"
    @keydown.right.stop.prevent="focusNextOption"
    @keydown.enter.stop.prevent="selectOption"
    @keydown.space.stop.prevent="selectOption"
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
        :track-by="getTrackBy"
        :wrapper-size="rootHeight"
        @scroll:bottom="handleScrollToBottom"
        v-slot="{ item: option, index }"
      >
        <slot v-bind="{ option, index, selectOption }">
          <va-select-option
            :option="option"
            :current-option="currentOptionComputed"
            :disabled="getDisabled(option)"
            v-bind="selectOptionProps"
            @click.stop="selectOption"
            @mouseenter="handleMouseEnter(option)"
            @mousemove="handleMouseMove(option)"
          />
        </slot>
      </va-virtual-scroller>

      <template v-else>
        <template v-for="(option, index) in options" :key="getTrackBy(option)">
          <slot v-bind="{ option, index, selectOption }">
            <va-select-option
              :ref="setItemRef(getTrackBy(option))"
              :current-option="currentOptionComputed"
              :option="option"
              :disabled="getDisabled(option)"
              v-bind="selectOptionProps"
              @click.stop="selectOption"
              @mouseenter="handleMouseEnter(option)"
              @mousemove="handleMouseMove(option)"
            />
          </slot>
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

import {
  useComponentPresetProp,
  useColorProps,
  extractHTMLElement,
  useObjectRefs,
  useSelectableList, useSelectableListProps,
  useThrottleValue, useThrottleProps,
} from '../../../../composables'

import { scrollToElement } from '../../../../utils/scroll-to-element'

import { VaVirtualScroller } from '../../../va-virtual-scroller'
import { VaSelectOption } from '../VaSelectOption'

import { isNilValue } from '../../../../utils/isNilValue'

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
    ...useSelectableListProps,
    ...useThrottleProps,
    noOptionsText: { type: String, default: 'Items not found' },
    getSelectedState: { type: Function as PropType<(option: SelectOption) => boolean>, required: true },
    multiple: { type: Boolean, default: false },
    search: { type: String, default: '' },
    tabindex: { type: Number, default: 0 },
    hoveredOption: { type: [String, Number, Boolean, Object] as PropType<SelectOption | null>, default: null },
    virtualScroller: { type: Boolean, default: true },
    highlightMatchedText: { type: Boolean, default: true },
    minSearchChars: { type: Number, default: 0 },
    autoSelectFirstOption: { type: Boolean, default: false },
    selectedTopShown: { type: Boolean, default: false },
  },

  setup (props, { emit }) {
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
    const currentOptionComputed = computed(() => props.hoveredOption ?? null)
    const updateCurrentOption = (option: SelectOption | null, source: EventSource) => {
      emit('update:hoveredOption', option)
      lastInteractionSource.value = source
    }

    const { getText, getGroupBy, getTrackBy, getDisabled } = useSelectableList(props)

    const currentSelectedOptionText = computed(() => {
      const selected = props.options?.find((option) => props.getSelectedState(option))

      return selected ? getText(selected) : ''
    })

    const isSearchedOptionSelected = computed(() => {
      return currentSelectedOptionText.value.toLowerCase() === props.search?.toLowerCase()
    })

    const filteredOptions = computed((): SelectOption[] => {
      if (!props.search || props.search.length < props.minSearchChars || isSearchedOptionSelected.value) {
        return props.options
      }

      return props.options.filter((option: SelectOption) => {
        const optionText = getText(option).toUpperCase()
        const search = props.search.toUpperCase()
        return optionText.includes(search)
      })
    })

    const optionGroups = computed(() => filteredOptions.value
      .reduce((groups: Record<string, SelectOption[]>, option) => {
        const groupBy = getGroupBy(option)

        if (!groupBy) {
          groups._noGroup.push(option)
        } else {
          if (!groups[groupBy]) { groups[groupBy] = [] }

          groups[groupBy].push(option)
        }

        return groups
      }, { _noGroup: [] }))
    const optionGroupsThrottled = useThrottleValue(optionGroups, props)

    const isValueExists = (value: SelectOption | null | undefined): value is SelectOption => !isNilValue(value)

    const updateHoveredOption = (option?: SelectOption) => {
      if (option === currentOptionComputed.value || (isValueExists(option) && getDisabled(option))) { return }

      updateCurrentOption(option ?? null, 'mouse')
    }
    const updateFocusedOption = (option?: SelectOption) => { updateCurrentOption(option ?? null, 'keyboard') }

    const selectOption = () => {
      const previousOption =
        previousOptionComputed.value && typeof previousOptionComputed.value === 'object'
          ? { ...previousOptionComputed.value }
          : previousOptionComputed.value

      emit('select-option')

      if (props.selectedTopShown) {
        updateHoveredOption(previousOption)
      }
    }

    const groupedOptions = computed(() => Object.values(optionGroupsThrottled.value).flat())
    const currentOptions = computed(() =>
      filteredOptions.value.some((el) => getGroupBy(el)) ? groupedOptions.value : filteredOptions.value)

    const currentOptionIndex = computed(() => currentOptions.value.findIndex((option) => {
      return isValueExists(currentOptionComputed.value) && getTrackBy(option) === getTrackBy(currentOptionComputed.value)
    }))

    const selectOptionProps = computed(() => ({
      ...pick(props, ['getSelectedState', 'color', 'search', 'highlightMatchedText', 'minSearchChars']),
      getText,
      getTrackBy,
    }))

    const findNextActiveOption = (startSearchIndex: number, reversedSearch = false) => {
      const searchBase = [...(currentOptions.value || [])]
      const searchBaseOrdered = reversedSearch ? searchBase.reverse() : searchBase
      const startIndex = reversedSearch ? (startSearchIndex * -1) - 1 : startSearchIndex

      return searchBaseOrdered.slice(startIndex).find((option) => !getDisabled(option))
    }

    const previousOptionComputed = computed((): SelectOption | undefined => {
      const previousOptionIndex = currentOptionIndex.value - 1
      const previousOption = currentOptions.value[previousOptionIndex]
      const previousOptionCheck = isValueExists(previousOption) && !(previousOptionIndex === 0 && getDisabled(previousOption))

      if (previousOptionCheck) {
        return findNextActiveOption(currentOptionIndex.value - 1, true)
      }

      return undefined
    })

    const handleMouseMove = (option: SelectOption) => {
      if (!props.selectedTopShown) { updateHoveredOption(option) }
    }

    const handleMouseEnter = (option: SelectOption) => {
      if (props.selectedTopShown) { updateHoveredOption(option) }
    }

    // public
    const focusPreviousOption = () => {
      if (!isValueExists(currentOptionComputed.value)) {
        updateFocusedOption(findNextActiveOption(0, true))
        return
      }

      if (isValueExists(previousOptionComputed.value)) {
        updateFocusedOption(previousOptionComputed.value)
      } else {
        emit('no-previous-option-to-hover')
      }
    }

    const focusNextOption = () => {
      if (!isValueExists(currentOptionComputed.value)) {
        focusFirstOption()
        return
      }

      const nextOptionIndex = currentOptionIndex.value + 1
      const nextOption = currentOptions.value[nextOptionIndex]
      const nextOptionCheck = isValueExists(nextOption) && !(nextOptionIndex === currentOptions.value.length - 1 && getDisabled(nextOption))
      if (nextOptionCheck) {
        updateFocusedOption(findNextActiveOption(currentOptionIndex.value + 1))
      }
    }

    const focusFirstOption = () => updateFocusedOption(findNextActiveOption(0))

    const { itemRefs, setItemRef } = useObjectRefs()
    const virtualScrollerRef = shallowRef<Array<InstanceType<typeof VaVirtualScroller>>>()
    const scrollToOption = (option: SelectOption) => {
      if (!isValueExists(option)) { return }

      const element = itemRefs.value[getTrackBy(option)]
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
      (!lastInteractionSource.value || lastInteractionSource.value === 'keyboard') &&
      (isValueExists(newOption)) && scrollToOption(newOption)
    })

    watch(filteredOptions, () => {
      if (!props.autoSelectFirstOption) { return }

      focusFirstOption()
    }, { immediate: true })

    return {
      root,
      virtualScrollerRef,

      rootHeight,
      optionGroups: optionGroupsThrottled,
      filteredOptions,
      selectOptionProps,
      currentOptionComputed,

      onScroll,
      getTrackBy,
      setItemRef,
      getDisabled,
      selectOption,
      handleMouseMove,
      handleMouseEnter,
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
