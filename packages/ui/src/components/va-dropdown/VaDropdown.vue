<script lang="ts">
import {
  computed,
  defineComponent,
  h,
  nextTick,
  type PropType,
  shallowRef,
  toRef,
  Fragment,
  Teleport,
} from 'vue'

import pick from 'lodash/pick.js'
import kebabCase from 'lodash/kebabCase.js'

import {
  useComponentPresetProp,
  useStateful, useStatefulEmits, createStatefulProps,
  useDebounceFn,
  useDropdown,
  usePlacementAliasesProps,
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

import { renderSlotNode } from '../../utils/headless'
import { warn } from '../../utils/console'

import type { DropdownOffsetProp } from './types'

export default defineComponent({
  name: 'VaDropdown',

  inheritAttrs: false,

  props: {
    ...createStatefulProps(Boolean, true),
    ...useComponentPresetProp,
    ...usePlacementAliasesProps,
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
    /** Not reactive */
    keyboardNavigation: { type: Boolean, default: false },
  },

  emits: [...useStatefulEmits, 'anchor-click', 'anchor-right-click', 'content-click', 'click-outside', 'close', 'open'],

  setup (props, { emit, slots, attrs }) {
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

    const elRef = useHTMLElement('computedAnchorRef')

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

    const teleportTargetComputed = computed<HTMLElement | undefined>(() => {
      if (!isPopoverFloating.value) {
        // If not floating just render inside the parent element
        return elRef.value?.parentElement || undefined
      }
      return targetComputed.value
    })

    const teleportDisabled = computed(() => props.disabled || !isPopoverFloating.value)

    useDropdown(
      computed(() => props.cursor ? cursorAnchor.value : computedAnchorRef.value),
      contentRef,
      computed(() => ({
        keepAnchorWidth: props.keepAnchorWidth,
        offset: props.offset,
        stickToEdges: props.stickToEdges,
        autoPlacement: props.autoPlacement,
        root: teleportTargetComputed.value,
        viewport: targetComputed.value,
      })),
      props,
    )

    const { t } = useTranslation()
    const isMounted = useIsMounted()

    return {
      t,
      isMounted,
      valueComputed,
      computedAnchorRef,
      computedClass,
      onMouseEnter,
      teleportTargetComputed,
      teleportDisabled,
      onMouseLeave,
      emitAndClose,
      contentRef,
    }
  },

  render () {
    const slotBinds = {
      value: this.valueComputed.value,
      hide: () => { this.valueComputed.value = false },
      show: () => { this.valueComputed.value = true },
    }

    const defaultSlotVNode = renderSlotNode(this.$slots.default, slotBinds, {
      ref: 'contentRef',
      class: 'va-dropdown__content-wrapper',
      onMouseOver: () => this.$props.isContentHoverable && this.onMouseEnter(),
      onMouseOut: () => this.onMouseLeave(),
      onClick: () => this.emitAndClose('content-click', this.$props.closeOnContentClick),
    })

    const anchorSlotVNode = renderSlotNode(this.$slots.anchor, slotBinds, {
      ref: 'computedAnchorRef',
      role: 'button',
      class: ['va-dropdown', ...this.computedClass.asArray.value],
      style: { position: 'relative' },
      'aria-label': this.t('toggleDropdown'),
      'aria-disabled': this.$props.disabled,
      'aria-expanded': !!this.valueComputed.value,
      ...this.$attrs,
    })

    if (!anchorSlotVNode) {
      warn('VaDropdown: You must provide an anchor slot')
      return
    }

    if (!defaultSlotVNode) {
      warn('VaDropdown: default slot is missing')
      return h(anchorSlotVNode)
    }

    return h(Fragment, {}, [
      anchorSlotVNode,

      (this.isMounted && this.valueComputed) && h(
        Teleport,
        {
          to: this.teleportTargetComputed,
          disabled: this.teleportDisabled,
        },
        [defaultSlotVNode],
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
  }
}
</style>
