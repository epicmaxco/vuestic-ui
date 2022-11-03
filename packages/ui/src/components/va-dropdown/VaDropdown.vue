<template>
  <div
    class="va-dropdown"
    :class="computedClass"
    ref="anchorRef"
    role="button"
    :aria-label="t('toggleDropdown')"
    :aria-disabled="$props.disabled"
    :aria-expanded="!!valueComputed"
    :aria-controls="idComputed"
    style="position: relative;"
  >
    <slot name="anchor" v-bind="{ value: valueComputed, hide, show }" />

    <teleport v-if="isMounted" :to="teleportTargetComputed" :disabled="teleportDisabled">
      <div
        v-if="valueComputed"
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
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, nextTick, PropType, shallowRef, toRef } from 'vue'
import pick from 'lodash/pick.js'
import kebabCase from 'lodash/kebabCase.js'

import { generateUniqueId } from '../../services/utils'

import {
  useComponentPresetProp,
  useStateful, useStatefulEmits, createStatefulProps,
  useDebounceFn,
  useDropdown, placementsPositions, Placement,
  useClickOutside,
  useBem,
  useHTMLElementSelector,
  useIsMounted,
  useDocument,
  useHTMLElement,
  MaybeHTMLElementOrSelector,
  useTranslation,
} from '../../composables'
import { useAnchorSelector } from './hooks/useAnchorSelector'
import { useCursorAnchor } from './hooks/useCursorAnchor'
import { useKeyboardNavigation, useMouseNavigation } from './hooks/useDropdownNavigation'
import type { DropdownOffsetProp } from './types'

export default defineComponent({
  name: 'VaDropdown',

  props: {
    ...createStatefulProps(Boolean, true),
    ...useComponentPresetProp,
    disabled: { type: Boolean },
    readonly: { type: Boolean },
    anchorSelector: { type: String, default: '' },
    innerAnchorSelector: { type: String, default: '' },
    /** Element where dropdown content will be rendered */
    target: { type: [String, Object] as PropType<MaybeHTMLElementOrSelector>, default: undefined },
    preventOverflow: { type: Boolean, default: false },
    keepAnchorWidth: { type: Boolean, default: false },
    isContentHoverable: { type: Boolean, default: true },
    closeOnContentClick: { type: Boolean, default: true },
    closeOnClickOutside: { type: Boolean, default: true },
    closeOnAnchorClick: { type: Boolean, default: true },
    hoverOverTimeout: { type: Number, default: 30 },
    hoverOutTimeout: { type: Number, default: 200 },
    offset: { type: [Array, Number] as PropType<DropdownOffsetProp>, default: 0 },
    stickToEdges: { type: Boolean, default: false },
    autoPlacement: { type: Boolean, default: true },
    cursor: { type: Boolean, default: false },
    trigger: {
      type: String as PropType<'click' | 'right-click' | 'hover' | 'dblclick' | 'none'>,
      default: 'click',
      validator: (value: string) => ['click', 'right-click', 'hover', 'dblclick', 'none'].includes(value),
    },
    placement: {
      type: String as PropType<Placement>,
      default: 'auto',
      validator: (value: string) => placementsPositions.includes(value),
    },
    /** Not reactive */
    keyboardNavigation: { type: Boolean, default: false },
  },

  emits: [...useStatefulEmits, 'anchor-click', 'anchor-right-click', 'content-click', 'click-outside', 'close', 'open'],

  setup (props, { emit }) {
    const contentRef = shallowRef<HTMLElement>()

    const { valueComputed: statefulVal } = useStateful(props, emit)
    const valueComputed = computed({
      get: () => statefulVal.value && !props.disabled && !props.readonly,
      set (val) {
        statefulVal.value = val
        if (val) {
          emit('open')
        } else {
          emit('close')
        }
      },
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

    const elRef = useHTMLElement('anchorRef')

    if (props.keyboardNavigation) {
      useKeyboardNavigation(elRef, valueComputed)
    }

    useMouseNavigation(elRef, {
      click (e) {
        if ((props.trigger !== 'click' && kebabCase(props.trigger) !== 'right-click') || props.disabled) { return }

        if (valueComputed.value) {
          emitAndClose('anchor-click', props.closeOnAnchorClick, e)
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
      dblclick (e) {
        if (props.trigger !== 'dblclick' || props.disabled) { return }
        if (valueComputed.value) {
          emitAndClose('anchor-dblclick', props.closeOnAnchorClick, e)

          if (props.cursor) {
            nextTick(() => { valueComputed.value = true })
          }
        } else {
          valueComputed.value = true
          emit('anchor-dblclick', e)
        }
      },
      mouseenter: onMouseEnter,
      mouseleave: onMouseLeave,
    })

    const { anchorRef: computedAnchorRef } = useAnchorSelector(props)
    useClickOutside([computedAnchorRef, contentRef], () => {
      if (props.closeOnClickOutside && valueComputed.value) {
        emitAndClose('click-outside', props.closeOnClickOutside)
      }
    })

    const cursorAnchor = useCursorAnchor(computedAnchorRef, valueComputed)
    const document = useDocument()
    const isPopoverFloating = computed(() => props.preventOverflow || props.cursor)

    const target = useHTMLElementSelector(computed(() => props.target || 'body'))

    const targetComputed = computed(() => {
      if (computedAnchorRef.value && !target.value?.contains?.(computedAnchorRef.value)) { return document.value?.body }

      return target.value
    })

    const teleportTargetComputed = computed(() => {
      if (!isPopoverFloating.value) {
        return elRef.value
      }
      return targetComputed.value
    })

    const teleportDisabled = computed(() => props.disabled || !isPopoverFloating.value)

    useDropdown(
      computed(() => props.cursor ? cursorAnchor.value : computedAnchorRef.value),
      contentRef,
      computed(() => ({
        placement: props.placement,
        keepAnchorWidth: props.keepAnchorWidth,
        offset: props.offset,
        stickToEdges: props.stickToEdges,
        autoPlacement: props.autoPlacement,
        root: teleportTargetComputed.value,
        viewport: targetComputed.value,
      })),
    )

    const idComputed = computed(generateUniqueId)

    // useEvent('blur', () => {
    //   if (props.closeOnClickOutside && valueComputed.value) {
    //     emitAndClose('click-outside', props.closeOnClickOutside)
    //   }
    // })

    return {
      ...useTranslation(),
      teleportTargetComputed,
      teleportDisabled,
      isMounted: useIsMounted(),
      anchorRef: computedAnchorRef,
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
  position: relative;
  max-width: 100%;
  vertical-align: middle;

  &--disabled {
    @include va-disabled;
  }

  &__content-wrapper {
    z-index: var(--va-dropdown-content-wrapper-z-index);
    font-family: var(--va-font-family);
    top: 0;
    left: 0;
  }
}
</style>
