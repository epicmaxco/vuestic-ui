<template>
  <div
    class="va-dropdown"
    :class="computedClass"
    ref="anchorRef"
    role="button"
    aria-label="toggle dropdown"
    :aria-disabled="$props.disabled"
    :aria-expanded="!!valueComputed"
    :aria-controls="idComputed"
  >
    <slot name="anchor" v-bind="{ value: valueComputed, hide, show }" />

    <template v-if="valueComputed">
      <teleport v-if="isMounted" :to="teleportTargetComputed" :disabled="disabled">
        <div
          ref="contentRef"
          class="va-dropdown__content-wrapper"
          :id="idComputed"
          @mouseover="$props.isContentHoverable && onMouseEnter()"
          @mouseout="onMouseLeave"
          @click.stop="emitAndClose('content-click', closeOnContentClick)"
        >
          <slot v-bind="{ value: valueComputed, hide, show }" />
        </div>
      </teleport>
    </template>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, nextTick, PropType, shallowRef, toRef } from 'vue'
import pick from 'lodash/pick.js'
import kebabCase from 'lodash/kebabCase.js'

import { generateUniqueId } from '../../services/utils'

import {
  useComponentPresetProp,
  useStateful, useStatefulEmits, useStatefulProps,
  useDebounceFn,
  usePopover, placementsPositions, Placement,
  useClickOutside,
  useBem,
  useEvent,
  useIsMounted,
  useDocument,
} from '../../composables'
import { useAnchorSelector } from './hooks/useAnchorSelector'
import { useCursorAnchor } from './hooks/useCursorAnchor'

export default defineComponent({
  name: 'VaDropdown',

  props: {
    ...useStatefulProps,
    ...useComponentPresetProp,
    stateful: { default: true },
    modelValue: { type: Boolean, default: false },
    disabled: { type: Boolean },
    readonly: { type: Boolean },
    anchorSelector: { type: String, default: '' },
    innerAnchorSelector: { type: String, default: '' },
    /** Element where dropdown content will be rendered */
    target: { type: String, default: 'body' },
    // TODO: This prop must turn off DOM Rect observer. For now it is useless to disable teleport.
    // disableTeleport: { type: Boolean, default: true },
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
    cursor: { type: Boolean, default: false },
    trigger: {
      type: String as PropType<'click' | 'right-click' | 'hover' | 'none'>,
      default: 'click',
      validator: (value: string) => ['click', 'right-click', 'hover', 'none'].includes(value),
    },
    placement: {
      type: String as PropType<Placement>,
      default: 'auto',
      validator: (value: string) => placementsPositions.includes(value),
    },
  },

  emits: [...useStatefulEmits, 'anchor-click', 'anchor-right-click', 'content-click', 'click-outside'],

  setup (props, { emit }) {
    const contentRef = shallowRef<HTMLElement>()

    const { valueComputed: statefulVal } = useStateful(props, emit)
    const valueComputed = computed({
      get: () => statefulVal.value && !props.disabled && !props.readonly,
      set (val) { statefulVal.value = val },
    })

    const computedClass = useBem('va-dropdown', () => pick(props, ['disabled']))

    const { debounced: debounceHover, cancel: cancelHoverDebounce } = useDebounceFn(toRef(props, 'hoverOverTimeout'))
    const { debounced: debounceUnHover, cancel: cancelUnHoverDebounce } = useDebounceFn(toRef(props, 'hoverOutTimeout'))

    const onMouseEnter = () => {
      if (props.trigger !== 'hover' || props.disabled) { return }

      debounceHover(() => { valueComputed.value = true })
      cancelUnHoverDebounce()
    }

    const onMouseLeave = () => {
      if (props.trigger !== 'hover' || props.disabled) { return }

      if (props.isContentHoverable) {
        debounceUnHover(() => { valueComputed.value = false })
      } else {
        valueComputed.value = false
      }
      cancelHoverDebounce()
    }

    const emitAndClose = (eventName: string, close?: boolean, e?: Event) => {
      emit(eventName, e)
      if (close && props.trigger !== 'none') { valueComputed.value = false }
    }

    const { anchorRef } = useAnchorSelector(props, {
      click (e) {
        if ((props.trigger !== 'click' && kebabCase(props.trigger) !== 'right-click') || props.disabled) { return }

        if (valueComputed.value) {
          emitAndClose('anchor-click', props.closeOnAnchorClick, e)
          if (props.cursor) {
            nextTick(() => { valueComputed.value = true })
          }
        } else {
          if (props.trigger !== 'click') { return }
          valueComputed.value = true
          emit('anchor-click', e)
        }
      },
      contextmenu (e) {
        if (kebabCase(props.trigger) !== 'right-click' || props.disabled) { return }
        e.preventDefault()

        if (valueComputed.value) {
          emitAndClose('anchor-right-click', props.closeOnAnchorClick, e)

          if (props.cursor) {
            nextTick(() => { valueComputed.value = true })
          }
        } else {
          valueComputed.value = true
          emit('anchor-right-click', e)
        }
      },
      mouseenter: onMouseEnter,
      mouseleave: onMouseLeave,
    })

    useClickOutside([anchorRef, contentRef], () => {
      if (props.closeOnClickOutside && valueComputed.value) {
        emitAndClose('click-outside', props.closeOnClickOutside)
      }
    })

    const cursorAnchor = useCursorAnchor(anchorRef, valueComputed)
    usePopover(computed(() => props.cursor ? cursorAnchor.value : anchorRef.value), contentRef, computed(() => ({
      placement: props.placement,
      keepAnchorWidth: props.keepAnchorWidth,
      offset: props.offset,
      stickToEdges: props.stickToEdges,
      autoPlacement: props.autoPlacement,
      root: props.target,
    })))

    const idComputed = computed(generateUniqueId)

    useEvent('blur', () => {
      if (props.closeOnClickOutside && props.trigger !== 'none') {
        valueComputed.value = false
      }
    })

    const document = useDocument()

    const teleportTargetComputed = computed(() => document.value?.querySelector(props.target) ? props.target : 'body')

    return {
      teleportTargetComputed,
      isMounted: useIsMounted(),
      anchorRef,
      valueComputed,
      contentRef,
      computedClass,
      idComputed,
      emitAndClose,
      onMouseEnter,
      onMouseLeave,
      hide: () => { valueComputed.value = false },
      show: () => { valueComputed.value = true },
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
