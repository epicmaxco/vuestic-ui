<template>
  <div
    ref="anchor"
    :class="$attrs.class"
  >
    <slot
      name="anchor"
    >
    </slot>
  </div>
  <div
    v-if="isMounted && valueComputed"
    ref="floating"
    :style="floatingStyles"
  >
    <slot
    ></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed, nextTick } from 'vue'
import { useFloating, autoUpdate, flip, shift, Placement, offset, size } from '@floating-ui/vue'
import kebabCase from 'lodash/kebabCase'
import {
  createStatefulProps,
  MaybeHTMLElementOrSelector, useClickOutside, useHTMLElement,
  useHTMLElementSelector,
  useIsMounted, useStateful,
} from '../../composables'
import { useMouseNavigation } from '../va-dropdown/hooks/useDropdownNavigation'
import { DropdownOffsetProp } from '../va-dropdown/types'
import { useCursorAnchor } from '../va-dropdown/hooks/useCursorAnchor'

// TODO
// cursor
// teleport

export default defineComponent({
  name: 'VaDropdownNew',
  props: {
    ...createStatefulProps(Boolean, true),
    trigger: {
      type: String as PropType<'click' | 'right-click' | 'hover' | 'dblclick' | 'none'>,
      default: 'click',
      validator: (value: string) => ['click', 'right-click', 'hover', 'dblclick', 'none'].includes(value),
    },
    closeOnClickOutside: { type: Boolean, default: true },
    placement: { type: String as PropType<Placement>, default: 'bottom' },
    offset: { type: [Array, Number] as PropType<DropdownOffsetProp>, default: 0 },
    keepAnchorWidth: { type: Boolean, default: false },
    target: { type: [String, Object] as PropType<MaybeHTMLElementOrSelector>, default: undefined },
    cursor: { type: Boolean, default: false },
  },
  setup (props, { emit }) {
    const { valueComputed: statefulVal } = useStateful(props, emit)
    const valueComputed = computed({
      get: () => statefulVal.value, // && !props.disabled && !props.readonly,
      set (val) {
        statefulVal.value = val
        if (val) {
          emit('open')
        } else {
          emit('close')
        }
      },
    })

    const anchor = useHTMLElement('anchor')
    // const cursorAnchor = useCursorAnchor(anchor, valueComputed)
    const floating = useHTMLElement('floating')
    const targetElement = useHTMLElementSelector(computed(() => props.target || 'body'))

    const onClick = (e: MouseEvent) => {
      if ((props.trigger !== 'click' && kebabCase(props.trigger) !== 'right-click')) { return } // || props.disabled) { return }

      if (valueComputed.value) {
        // emitAndClose('anchor-click', props.closeOnAnchorClick, e)
      } else {
        if (props.trigger !== 'click') { return }
        valueComputed.value = true
        emit('anchor-click', e)
      }
    }
    const onContextmenu = (e: MouseEvent) => {
      if (kebabCase(props.trigger) !== 'right-click') { return } // || props.disabled) { return }
      e.preventDefault()

      if (valueComputed.value) {
        // emitAndClose('anchor-right-click', props.closeOnAnchorClick, e)

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
      if (props.trigger !== 'hover') { return } // || props.disabled) { return }
      valueComputed.value = true

      // debounceHover(() => { valueComputed.value = true })
      // cancelUnHoverDebounce()
    }
    const onMouseleave = () => {
      if (props.trigger !== 'hover') { return } // || props.disabled) { return }
      valueComputed.value = false

      // if (props.isContentHoverable) {
      //   debounceUnHover(() => { valueComputed.value = false })
      // } else {
      //   valueComputed.value = false
      // }
      // cancelHoverDebounce()
    }

    useMouseNavigation(anchor, {
      click: onClick,
      contextmenu: onContextmenu,
      dblclick: onDblclick,
      mouseenter: onMouseenter,
      mouseleave: onMouseleave,
    })

    const emitAndClose = (eventName: Parameters<typeof emit>[0], close?: boolean, e?: Event) => {
      emit(eventName, e)
      if (close && props.trigger !== 'none') { valueComputed.value = false }
    }

    useClickOutside([anchor, floating], () => {
      if (props.closeOnClickOutside && valueComputed.value) {
        emitAndClose('click-outside', props.closeOnClickOutside)
      }
    })

    const placementComputed = computed(() => {
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
        flip({
          boundary: targetElement.value,
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

    const { floatingStyles } = useFloating(anchor, floating, {
      placement: placementComputed,
      whileElementsMounted: autoUpdate,
      middleware: middlewareComputed,
    })

    const isMounted = useIsMounted()

    return {
      valueComputed,
      anchor,
      floating,
      floatingStyles,
      isMounted,
    }
  },
})
</script>
