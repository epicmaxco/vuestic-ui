<template>
  <div
    ref="anchor"
    :class="$attrs.class"
    class="va-dropdown"
    style="position: relative;"
  >
    <slot
      name="anchor"
    >
    </slot>
  </div>
  <Teleport
    v-if="showFloating"
    :to="teleportTarget ?? undefined"
    :disabled="teleportDisabled"
  >
    <div
      ref="floating"
      :style="floatingStyles"
      class="va-dropdown__content-wrapper"
      v-on="floatingListeners"
    >
      <slot
      ></slot>
    </div>
  </Teleport>
</template>

<script lang="ts">
import { defineComponent, PropType, computed, nextTick, ref, toRef } from 'vue'
import { useFloating, autoUpdate, flip, shift, Placement, offset, size } from '@floating-ui/vue'
import kebabCase from 'lodash/kebabCase'
import {
  createStatefulProps,
  MaybeHTMLElementOrSelector,
  useClickOutside, useDebounceFn,
  useHTMLElement,
  useHTMLElementSelector,
  useIsMounted, useStateful,
} from '../../composables'
import { useKeyboardNavigation, useMouseNavigation } from '../va-dropdown/hooks/useDropdownNavigation'
import { DropdownOffsetProp } from '../va-dropdown/types'
import { useCursorAnchor } from './useCursorAnchor'
import { useAnchorSelector } from '../va-dropdown/hooks/useAnchorSelector'

export default defineComponent({
  name: 'VaDropdownNew',
  props: {
    ...createStatefulProps(Boolean, true),
    anchorSelector: { type: String, default: '' },
    innerAnchorSelector: { type: String, default: '' },
    trigger: {
      type: String as PropType<'click' | 'right-click' | 'hover' | 'dblclick' | 'none'>,
      default: 'click',
      validator: (value: string) => ['click', 'right-click', 'hover', 'dblclick', 'none'].includes(value),
    },
    disabled: { type: Boolean },
    readonly: { type: Boolean },
    closeOnClickOutside: { type: Boolean, default: true },
    closeOnAnchorClick: { type: Boolean, default: true },
    closeOnContentClick: { type: Boolean, default: true },
    hoverOverTimeout: { type: Number, default: 30 },
    hoverOutTimeout: { type: Number, default: 200 },
    isContentHoverable: { type: Boolean, default: true },
    placement: { type: String as PropType<Placement | 'auto'>, default: 'bottom' },
    offset: { type: [Array, Number] as PropType<DropdownOffsetProp>, default: 0 },
    keepAnchorWidth: { type: Boolean, default: false },
    target: { type: [String, Object] as PropType<MaybeHTMLElementOrSelector>, default: undefined },
    cursor: { type: Boolean, default: false },
    preventOverflow: { type: Boolean, default: false },
    teleport: { type: [String, Object] as PropType<MaybeHTMLElementOrSelector>, default: undefined },
    /** Not reactive */
    keyboardNavigation: { type: Boolean, default: false },
  },
  setup (props, { emit }) {
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

    const isMounted = useIsMounted()

    const { anchorRef: anchor } = useAnchorSelector(props)
    const floating = useHTMLElement('floating')
    const target = useHTMLElementSelector(computed(() => props.target || 'body'))
    const teleport = useHTMLElementSelector(computed(() => props.teleport))
    const cursorAnchor = props.cursor ? useCursorAnchor(anchor, valueComputed) : ref(undefined)

    const isPopoverFloating = computed(() => props.preventOverflow)
    const teleportTarget = computed<HTMLElement | undefined>(() => {
      if (teleport.value) {
        return teleport.value
      }

      if (!isPopoverFloating.value) {
        // If not floating just render inside the parent element
        return undefined
      }

      return target.value
    })

    const teleportDisabled = computed(() => !teleport.value)
    const showFloating = computed(() => isMounted.value && valueComputed.value)

    const { debounced: debounceHover, cancel: cancelHoverDebounce } = useDebounceFn(toRef(props, 'hoverOverTimeout'))
    const { debounced: debounceUnHover, cancel: cancelUnHoverDebounce } = useDebounceFn(toRef(props, 'hoverOutTimeout'))

    const onClick = (e: MouseEvent) => {
      if ((props.trigger !== 'click' && kebabCase(props.trigger) !== 'right-click')) { return } // || props.disabled) { return }

      if (valueComputed.value) {
        emitAndClose('anchor-click', props.closeOnAnchorClick, e)
      } else {
        if (props.trigger !== 'click') { return }
        valueComputed.value = true
        emit('anchor-click', e)
      }
    }
    const onContextmenu = (e: MouseEvent) => {
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
    }
    const onDblclick = () => { return undefined }
    const onMouseenter = () => {
      if (props.trigger !== 'hover' || props.disabled) { return }

      debounceHover(() => { valueComputed.value = true })
      cancelUnHoverDebounce()
    }
    const onMouseleave = () => {
      if (props.trigger !== 'hover' || props.disabled) { return }

      if (props.isContentHoverable) {
        debounceUnHover(() => { valueComputed.value = false })
      } else {
        valueComputed.value = false
      }
      cancelHoverDebounce()
    }

    useMouseNavigation(anchor, {
      click: onClick,
      contextmenu: onContextmenu,
      dblclick: onDblclick,
      mouseenter: onMouseenter,
      mouseleave: onMouseleave,
    })

    if (props.keyboardNavigation) {
      useKeyboardNavigation(anchor, valueComputed)
    }

    const emitAndClose = (eventName: Parameters<typeof emit>[0], close?: boolean, e?: Event) => {
      emit(eventName, e)
      if (close && props.trigger !== 'none') { valueComputed.value = false }
    }

    const floatingListeners = {
      mouseover: () => props.isContentHoverable && onMouseenter(),
      mouseout: () => onMouseleave(),
      click: () => emitAndClose('content-click', props.closeOnContentClick),
    }

    useClickOutside([anchor, floating], () => {
      if (props.closeOnClickOutside && valueComputed.value) {
        emitAndClose('click-outside', props.closeOnClickOutside)
      }
    })

    const placementComputed = computed(() => {
      if (props.placement === 'auto') {
        return 'bottom'
      }

      return props.placement
    })

    const offsetComputed = computed(() => {
      const result = { mainAxis: 0, crossAxis: 0 }
      if (Array.isArray(props.offset)) {
        result.mainAxis = props.offset[0]
        result.crossAxis = props.offset[1]
      } else {
        result.mainAxis = props.offset
      }

      return result
    })

    const middlewareComputed = computed(() => {
      const result = [
        offset(offsetComputed.value),
        // flip element, works for -start, -end
        // boundary doesn't work with ssr (trying to access document)
        flip({
          boundary: isMounted.value ? target.value : undefined,
        }),
        // shift the element into the view
        shift(),
      ]

      if (props.keepAnchorWidth) {
        result.push(size({
          apply ({ elements }) {
            const reference = elements.reference
            const availableWidth = reference.getBoundingClientRect().width
            Object.assign(elements.floating.style, {
              maxWidth: `${availableWidth}px`,
            })
          },
        }),
        )
      }

      return result
    })

    const anchorComputed = computed(() => {
      return props.cursor ? cursorAnchor.value : anchor.value
    })

    const { floatingStyles } = useFloating(anchorComputed, floating, {
      placement: placementComputed,
      whileElementsMounted: autoUpdate,
      middleware: middlewareComputed,
    })

    return {
      anchor,
      floating,
      floatingStyles,
      teleportDisabled,
      showFloating,
      teleportTarget,
      floatingListeners,
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
    position: absolute;
  }
}
</style>
