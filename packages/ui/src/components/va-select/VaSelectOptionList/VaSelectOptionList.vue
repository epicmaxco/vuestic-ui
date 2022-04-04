<template>
  <div
    class="va-select-option-list"
    ref="rootElement"
    :tabindex="tabindex"
    @keydown.up.stop.prevent="hoverPreviousOption"
    @keydown.left.stop.prevent="hoverPreviousOption"
    @keydown.down.stop.prevent="hoverNextOption"
    @keydown.right.stop.prevent="hoverNextOption"
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
      <div
        v-for="option in options"
        :key="$props.getTrackBy(option)"
        :ref="setItemRef(option)"
        :class="getOptionClass(option)"
        :style="getOptionStyle(option)"
        @click.stop="selectOption(option)"
        @mouseover="updateHoveredOption(option)"
      >
        <va-icon
          v-if="getOptionIcon(option)"
          size="small"
          class="va-select-option-list__option--icon"
          :name="getOptionIcon(option)"
        />
        <span>{{ getText(option) }}</span>
        <va-icon
          v-show="$props.getSelectedState(option)"
          class="va-select-option-list__option--selected-icon"
          size="small"
          name="done"
          :color="getColor($props.color)"
        />
      </div>
    </template>
    <div
      v-if="!filteredOptions.length"
      class="va-select-option-list no-options"
    >
      {{ noOptionsText }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, watch, ref, Ref, computed } from 'vue'

import { getHoverColor } from '../../../services/color-config/color-functions'
import { useColors, useColorProps } from '../../../composables/useColor'
import { SelectableOption } from '../../..//composables/useSelectableList'
import VaIcon from '../../va-icon/'
import { scrollToElement } from '../../../utils/scroll-to-element'

export default defineComponent({
  name: 'VaSelectOptionList',
  components: { VaIcon },
  emits: [
    'select-option',
    'update:hoveredOption',
    'no-previous-option-to-hover',
    'scroll-bottom',
  ],
  props: {
    ...useColorProps,
    options: { type: Array as PropType<SelectableOption[]>, default: () => [] },
    noOptionsText: { type: String as PropType<string>, default: 'Items not found' },
    getSelectedState: { type: Function as PropType<(option: SelectableOption) => boolean>, required: true },
    getText: { type: Function as PropType<(option: SelectableOption) => string>, required: true },
    getTrackBy: { type: Function as PropType<(option: SelectableOption) => number>, required: true },
    getGroupBy: { type: Function as PropType<(option: SelectableOption) => string>, required: true },
    multiple: { type: Boolean as PropType<boolean>, default: false },
    search: { type: String as PropType<string>, default: '' },
    tabindex: { type: Number as PropType<number>, default: 0 },
    hoveredOption: {
      type: [String, Number, Object] as PropType<SelectableOption | null>,
      default: null,
    },
  },
  setup (props, { emit }) {
    const { getColor } = useColors()

    const itemRefs: Ref<Record<number, HTMLElement>> = ref({})
    const rootElement: Ref<HTMLElement | null> = ref(null)

    const onScroll = ({ target }: { target: HTMLDivElement }) => {
      if (target.scrollTop + target.clientHeight === target.scrollHeight) {
        emit('scroll-bottom')
      }
    }

    const beforeUpdate = () => { itemRefs.value = {} }

    const setItemRef = (option: SelectableOption) => (el: HTMLElement) => {
      if (el) {
        itemRefs.value[props.getTrackBy(option)] = el
      }
    }

    const hoveredOptionComputed = computed({
      get: () => props.hoveredOption || null,
      set: (value: SelectableOption | null) => emit('update:hoveredOption', value),
    })

    const filteredOptions = computed(() => {
      if (!props.search) {
        return props.options
      }

      return props.options.filter((option: SelectableOption) => {
        const optionText = props.getText(option).toString().toUpperCase()
        const search = props.search.toUpperCase()
        return optionText.includes(search)
      })
    })

    const optionGroups = computed(() => filteredOptions.value.reduce((groups: Record<string, SelectableOption[]>, option) => {
      if (typeof option !== 'object' || !option.group) {
        groups._noGroup.push(option)
      } else {
        const groupBy = props.getGroupBy(option)

        if (!groups[groupBy]) { groups[groupBy] = [] }

        groups[groupBy].push(option)
      }

      return groups
    }, { _noGroup: [] }))

    const selectOption = (option: SelectableOption) => emit('select-option', option)

    const getOptionIcon = (option: SelectableOption) => typeof option === 'object' && option.icon

    const getOptionClass = (option: SelectableOption) => ({
      'va-select-option-list__option': true,
      'va-select-option-list__option--selected': props.getSelectedState(option),
    })

    const getOptionStyle = (option: SelectableOption) => ({
      color: props.getSelectedState(option) ? getColor(props.color) : 'inherit',
      backgroundColor: isHovered(option) ? getHoverColor(getColor(props.color)) : 'transparent',
    })

    const isHovered = (option: SelectableOption) => {
      if (!hoveredOptionComputed.value) { return false }
      if (typeof option === 'string') { return option === hoveredOptionComputed.value }
      if (!props.getTrackBy) { return false }

      return props.getTrackBy(hoveredOptionComputed.value) === props.getTrackBy(option)
    }

    const updateHoveredOption = (option?: SelectableOption) => { hoveredOptionComputed.value = option || null }

    const hoveredOptionIndex = computed(() => filteredOptions.value.findIndex((option) => {
      return !!hoveredOptionComputed.value && props.getTrackBy(option) === props.getTrackBy(hoveredOptionComputed.value)
    }))

    const hoverPreviousOption = () => {
      if (!hoveredOptionComputed.value) {
        // Hover last option from list
        filteredOptions.value.length && updateHoveredOption(filteredOptions.value.at(-1))
      } else {
        if (filteredOptions.value[hoveredOptionIndex.value - 1]) {
          hoveredOptionComputed.value = filteredOptions.value[hoveredOptionIndex.value - 1]
        } else {
          emit('no-previous-option-to-hover')
        }
      }
    }

    const hoverNextOption = () => {
      if (!hoveredOptionComputed.value) {
        // Hover first option from list
        filteredOptions.value.length && updateHoveredOption(filteredOptions.value[0])
      } else {
        if (filteredOptions.value[hoveredOptionIndex.value + 1]) {
          hoveredOptionComputed.value = filteredOptions.value[hoveredOptionIndex.value + 1]
        }
      }
    }

    const hoverFirstOption = () => {
      if (filteredOptions.value.length > 0) {
        updateHoveredOption(filteredOptions.value[0])
      }
    }

    const focus = () => {
      // Prevent scroll since element in dropdown and it cause scrolling to page end.
      rootElement.value?.focus({ preventScroll: true })
    }

    const scrollToOption = (option: SelectableOption) => {
      if (!option) { return }

      const element = itemRefs.value[props.getTrackBy(option)]

      if (element) {
        scrollToElement(element)
      }
    }

    watch(() => props.hoveredOption, (newOption: SelectableOption | null) => newOption && scrollToOption(newOption))

    const publicMethods = {
      hoverPreviousOption,
      hoverNextOption,
      hoverFirstOption,
      focus,
    }

    return {
      getColor,
      filteredOptions,
      optionGroups,
      onScroll,
      beforeUpdate,
      setItemRef,
      selectOption,
      getOptionIcon,
      getOptionClass,
      getOptionStyle,
      updateHoveredOption,
      ...publicMethods,
    }
  },

  // we will use this while we have 'withConfigTransport'
  methods: {
    hoverPreviousOption () { (this as any).rootElement?.hoverPreviousOption() },
    hoverNextOption () { (this as any).rootElement?.hoverNextOption() },
    hoverFirstOption () { (this as any).rootElement?.hoverFirstOption() },
    focus () { (this as any).rootElement?.focus() },
    scrollToOption () { (this as any).rootElement?.scrollToOption() },

  },
})
</script>

<style lang="scss">
@import "../../../styles/resources";
@import "variables";

.va-select-option-list {
  display: var(--va-select-option-list-display);
  flex-direction: var(--va-select-option-list-flex-direction);
  width: var(--va-select-option-list-width);
  list-style: var(--va-select-option-list-list-style);
  max-height: var(--va-select-option-list-max-height);
  font-family: var(--va-font-family);
  overflow: auto;

  @include va-scroll();

  &__group-name {
    padding: var(--va-select-option-list-group-name-padding);
    font-size: var(--va-select-option-list-group-name-font-size);
    color: var(--va-select-option-list-group-name-color);
    font-weight: var(--va-select-option-list-group-name-font-weight);
    text-transform: uppercase;
  }

  &__option {
    cursor: var(--va-select-option-list-option-cursor);
    display: var(--va-select-option-list-option-display);
    align-items: var(--va-select-option-list-option-align-items);
    padding: var(--va-select-option-list-option-padding);
    min-height: var(--va-select-option-list-option-min-height);
    word-break: var(--va-select-option-list-option-word-break);

    &--icon {
      margin-right: var(--va-select-option-list-icon-margin-right);
    }

    &--selected-icon {
      margin-left: var(--va-select-option-list-selected-icon-margin-left);
      font-size: var(--va-select-option-list-selected-icon-font-size);
    }
  }

  &.no-options {
    padding: 0.5rem;
  }
}
</style>
