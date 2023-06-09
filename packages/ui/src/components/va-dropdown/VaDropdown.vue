<script lang="ts">
import { h, defineComponent, PropType, computed, nextTick, ref, toRef, Fragment, Teleport } from 'vue'
import { useFloating, autoUpdate, flip, shift, Placement, offset, size } from '@floating-ui/vue'
import kebabCase from 'lodash/kebabCase'
import pick from 'lodash/pick'
import {
  createStatefulProps,
  MaybeHTMLElementOrSelector, useBem,
  useClickOutside, useDebounceFn,
  useHTMLElement,
  useHTMLElementSelector,
  useIsMounted, useStateful, useStatefulEmits, useTranslation,
} from '../../composables'
import { useKeyboardNavigation, useMouseNavigation } from './hooks/useDropdownNavigation'
import { useAnchorSelector } from '../va-dropdown/hooks/useAnchorSelector'
import { useCursorAnchor } from './hooks/useCursorAnchor'
import { DropdownOffsetProp } from '../va-dropdown/types'
import { renderSlotNode } from '../../utils/headless'

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
    cursor: { type: Boolean, default: false },
    autoPlacement: { type: Boolean, default: true },
    stickToEdges: { type: Boolean, default: false },
    /** Viewport where dropdown will be rendered if preventOverflow is true. Autoplacement will be calculated relative to `target` */
    target: { type: [String, Object] as PropType<MaybeHTMLElementOrSelector>, default: undefined },
    /** Element where dropdown content will be rendered. */
    teleport: { type: [String, Object] as PropType<MaybeHTMLElementOrSelector>, default: undefined },
    preventOverflow: { type: Boolean, default: false },
    /** Not reactive */
    keyboardNavigation: { type: Boolean, default: false },
    ariaLabel: { type: String, default: '$t:toggleDropdown' },
  },

  emits: [...useStatefulEmits, 'anchor-click', 'anchor-right-click', 'content-click', 'click-outside', 'close', 'open', 'anchor-dblclick'],

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
    console.log('anchor', anchor)
    const floating = useHTMLElement('floating')
    const target = useHTMLElementSelector(computed(() => props.target || 'body'))
    const teleport = useHTMLElementSelector(computed(() => props.teleport))
    const cursorAnchor = props.cursor ? useCursorAnchor(anchor, valueComputed) : ref(undefined)

    const anchorClass = useBem('va-dropdown', () => pick(props, ['disabled']))
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
      console.log('click')
      if ((props.trigger !== 'click' && kebabCase(props.trigger) !== 'right-click') || props.disabled) { return }

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
      onMouseover: () => props.isContentHoverable && onMouseenter(),
      onMouseout: () => onMouseleave(),
      onClick: () => emitAndClose('content-click', props.closeOnContentClick),
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
      ]

      if (props.autoPlacement) {
        result.push(
          // boundary doesn't work with ssr (trying to access document)
          flip({
            boundary: isMounted.value ? target.value : undefined,
          }),
        )
      }

      if (props.stickToEdges) {
        result.push(
          shift(),
        )
      }

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
      ...useTranslation(),
      anchor,
      anchorClass,
      floating,
      floatingStyles,
      teleportDisabled,
      showFloating,
      teleportTarget,
      floatingListeners,
      isMounted,
      valueComputed,
    }
  },
  render () {
    const floatingSlotNode = renderSlotNode(this.$slots.default, {}, {
      ref: 'floating',
      class: 'va-dropdown__content-wrapper',
      style: this.floatingStyles,
      ...this.floatingListeners,
    })

    const anchorSlotVNode = renderSlotNode(this.$slots.anchor, {}, {
      ref: 'anchor',
      role: 'button',
      class: ['va-dropdown', ...this.anchorClass.asArray.value],
      style: { position: 'relative' },
      'aria-label': this.tp(this.$props.ariaLabel),
      'aria-disabled': this.$props.disabled,
      'aria-expanded': !!this.showFloating.value,
      ...this.$attrs,
    })

    return h(Fragment, {}, [
      anchorSlotVNode,
      (this.isMounted && this.valueComputed) && h(
        Teleport,
        {
          to: this.teleportTarget,
          disabled: this.teleportDisabled,
        },
        [floatingSlotNode],
      ),
    ])
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
