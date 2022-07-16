<template>
  <div
    class="va-dropdown"
    :class="computedClass"
    ref="anchorRef"
    role="button"
    aria-label="toggle dropdown"
    :aria-disabled="$props.disabled"
    :aria-expanded="!!valueComputed"
    :aria-controls="idComputed">
    <slot name="anchor" />

    <template v-if="valueComputed">
      <teleport :to="target" :disabled="disableAttachment">
        <div
          ref="contentRef"
          class="va-dropdown__content-wrapper"
          :id="idComputed"
          @mouseover="$props.isContentHoverable && onMouseEnter()"
          @mouseout="onMouseLeave"
          @click.stop="emitAndClose('dropdown-content-click', closeOnContentClick)"
        >
          <slot />
        </div>
      </teleport>
    </template>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, shallowRef, toRef } from 'vue'
import pick from 'lodash/pick.js'
import kebabCase from 'lodash/kebabCase.js'

import { generateUniqueId } from '../../services/utils'

import {
  useStateful, useStatefulEmits, useStatefulProps,
  useDebounceFn,
  usePopover, placementsPositions, Placement,
  useClickOutside,
  useBem,
} from '../../composables'
import { useAnchorSelector } from './hooks/useAnchorSelector'

export default defineComponent({
  name: 'VaDropdown',

  props: {
    ...useStatefulProps,
    stateful: { default: true },
    modelValue: { type: Boolean, default: false },
    disabled: { type: Boolean },
    readonly: { type: Boolean },
    anchorSelector: { type: String, default: '' },
    /** Element where dropdown content will be rendered */
    target: { type: String, default: 'body' },
    disableAttachment: { type: Boolean, default: false },
    keepAnchorWidth: { type: Boolean, default: false },
    isContentHoverable: { type: Boolean, default: true },
    closeOnContentClick: { type: Boolean, default: true },
    closeOnClickOutside: { type: Boolean, default: true },
    closeOnAnchorClick: { type: Boolean, default: true },
    hoverOverTimeout: { type: Number, default: 30 },
    hoverOutTimeout: { type: Number, default: 200 },
    offset: { type: [Array, Number] as PropType<number | [number, number]>, default: 0 },
    stickToEdges: { type: Boolean, default: false },
    autoPlacement: { type: Boolean, default: false },
    trigger: {
      type: String as PropType<'click' | 'hover' | 'none'>,
      default: 'click',
      validator: (value: string) => ['click', 'hover', 'none'].includes(value),
    },
    placement: {
      type: String as PropType<Placement>,
      default: 'bottom',
      validator: (value: string) => placementsPositions.includes(value),
    },
  },

  emits: [...useStatefulEmits, 'anchor-click', 'dropdown-content-click', 'click-outside'],

  setup (props, { emit }) {
    const contentRef = shallowRef<HTMLElement>()

    const { valueComputed: statefulVal } = useStateful(props, emit)
    const valueComputed = computed({
      get: () => statefulVal.value && !props.disabled && !props.readonly,
      set (val) { statefulVal.value = val },
    })

    const computedClass = useBem('va-dropdown', () => pick(props, ['disabled']))

    const { debounced: debounceHover, cancel: cancelHoverDebounce } = useDebounceFn(toRef(props, 'hoverOverTimeout'))
    const onMouseEnter = () => {
      if (props.trigger !== 'hover' || props.disabled) { return }

      debounceHover(() => { valueComputed.value = true })
      cancelUnHoverDebounce()
    }

    const { debounced: debounceUnHover, cancel: cancelUnHoverDebounce } = useDebounceFn(toRef(props, 'hoverOutTimeout'))
    const onMouseLeave = () => {
      if (props.trigger !== 'hover' || props.disabled) { return }

      if (props.isContentHoverable) {
        debounceUnHover(() => { valueComputed.value = false })
      } else {
        valueComputed.value = false
      }
      cancelHoverDebounce()
    }

    const emitAndClose = (eventName: string, close?: boolean) => {
      emit(eventName)
      if (close) { valueComputed.value = false }
    }

    const onAnchorClick = () => {
      if (props.trigger !== 'click' || props.disabled) { return }

      if (valueComputed.value) {
        emitAndClose('anchor-click', props.closeOnAnchorClick)
      } else {
        valueComputed.value = true
        emit('anchor-click')
      }
    }

    const { anchorRef, computedAnchorRef } = useAnchorSelector(props, {
      click () {
        if (props.trigger !== 'click' || props.disabled) { return }

        if (valueComputed.value) {
          emitAndClose('anchor-click', props.closeOnAnchorClick)
        } else {
          valueComputed.value = true
          emit('anchor-click')
        }
      },
      contextmenu (e) {
        if (kebabCase(props.trigger) !== 'right-click' || props.disabled) { return }

        e.preventDefault()

        if (valueComputed.value) {
          emitAndClose('anchor-click', props.closeOnAnchorClick)
        } else {
          valueComputed.value = true
          emit('anchor-click')
        }
      },
      mouseenter () {
        if (props.trigger !== 'hover' || props.disabled) { return }

        debounceHover(() => { valueComputed.value = true })
        cancelUnHoverDebounce()
      },
      mouseleave () {
        if (props.trigger !== 'hover' || props.disabled) { return }

        if (props.isContentHoverable) {
          debounceUnHover(() => { valueComputed.value = false })
        } else {
          valueComputed.value = false
        }
        cancelHoverDebounce()
      },
    })

    useClickOutside([computedAnchorRef, contentRef], () => {
      if (props.closeOnClickOutside && valueComputed.value) {
        emitAndClose('click-outside', props.closeOnClickOutside)
      }
    })

    usePopover(computedAnchorRef, contentRef, computed(() => ({
      placement: props.placement,
      keepAnchorWidth: props.keepAnchorWidth,
      offset: props.offset,
      stickToEdges: props.stickToEdges,
      autoPlacement: props.autoPlacement,
      root: props.target,
    })))

    const idComputed = computed(generateUniqueId)

    return {
      valueComputed,
      anchorRef,
      contentRef,
      computedClass,
      idComputed,
      emitAndClose,
      onAnchorClick,
      onMouseEnter,
      onMouseLeave,
      computedAnchorRef,
    }
  },
})
</script>

<style lang="scss">
@import '../../styles/resources';
@import 'variables';

.va-dropdown {
  /* Solved the alignment problem (if we try to align inline and block elements) */
  line-height: var(--va-dropdown-line-height);
  font-family: var(--va-font-family);
  display: var(--va-dropdown-display);

  &--disabled {
    @include va-disabled;
  }

  &__content-wrapper {
    z-index: var(--va-dropdown-content-wrapper-z-index);
    font-family: var(--va-font-family);
  }
}
</style>
