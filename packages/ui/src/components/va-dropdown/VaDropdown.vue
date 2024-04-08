<script lang="ts">
import {
  h,
  defineComponent,
  PropType,
  computed,
  nextTick,
  ref,
  toRef,
  Fragment,
  Teleport,
  watchEffect,
} from 'vue'
import kebabCase from 'lodash/kebabCase'
import pick from 'lodash/pick'
import {
  MaybeHTMLElementOrSelector,
  createStatefulProps,
  useBem,
  useClickOutside,
  useDebounceFn,
  useHTMLElement,
  useHTMLElementSelector,
  useIsMounted,
  useStateful,
  useStatefulEmits,
  useTranslation,
  usePlacementAliasesProps,
} from '../../composables'
import { renderSlotNode } from '../../utils/headless'
import { useKeyboardNavigation, useMouseNavigation } from './hooks/useDropdownNavigation'
import { useAnchorSelector } from './hooks/useAnchorSelector'
import { useCursorAnchor } from './hooks/useCursorAnchor'
import { CursorAnchor, DropdownOffsetProp } from './types'
import { useDropdown } from './hooks/useDropdown'
import { warn } from '../../utils/console'
import { useFocusOutside } from '../../composables/useFocusOutside'
import { useTeleported } from '../../composables/useTeleported'
import { StringWithAutocomplete } from '../../utils/types/prop-type'
import { useZIndex } from '../../composables/useZIndex'

export default defineComponent({
  name: 'VaDropdown',
  props: {
    ...usePlacementAliasesProps,
    ...createStatefulProps(true),
    modelValue: { type: Boolean, default: false },
    anchor: { type: [String, Object] as PropType<MaybeHTMLElementOrSelector>, default: undefined },
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
    closeOnFocusOutside: { type: Boolean, default: true },
    closeOnAnchorClick: { type: Boolean, default: true },
    closeOnContentClick: { type: Boolean, default: true },
    hoverOverTimeout: { type: Number, default: 30 },
    hoverOutTimeout: { type: Number, default: 200 },
    isContentHoverable: { type: Boolean, default: true },
    offset: { type: [Array, Number] as PropType<DropdownOffsetProp>, default: 0 },
    keepAnchorWidth: { type: Boolean, default: false },
    verticalScrollOnOverflow: { type: Boolean, default: true },
    cursor: { type: [Boolean, Object] as PropType<boolean | CursorAnchor>, default: false },
    autoPlacement: { type: Boolean, default: true },
    stickToEdges: { type: Boolean, default: false },
    /** Viewport where dropdown will be rendered. Autoplacement will be calculated relative to `target` */
    target: { type: [String, Object] as PropType<MaybeHTMLElementOrSelector>, default: undefined },
    /** Element where dropdown content will be rendered. */
    teleport: { type: [String, Object] as PropType<MaybeHTMLElementOrSelector>, default: undefined },
    /** Not reactive */
    keyboardNavigation: { type: Boolean, default: false },
    ariaLabel: { type: String, default: '$t:toggleDropdown' },
    role: { type: String as PropType<StringWithAutocomplete<'button' | 'none'>>, default: 'button' },
    contentClass: { type: String, default: '' },
  },

  emits: [...useStatefulEmits, 'anchor-click', 'anchor-right-click', 'content-click', 'click-outside', 'focus-outside', 'close', 'open', 'anchor-dblclick'],

  setup (props, { emit }) {
    const { valueComputed: statefulVal } = useStateful(props, emit, 'modelValue')
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

    const { anchorRef } = useAnchorSelector(props)
    const cursorAnchor = useCursorAnchor(anchorRef, valueComputed)
    const floating = useHTMLElement('floating')
    const body = useHTMLElementSelector(ref('body'))
    const target = useHTMLElementSelector(computed(() => props.target))
    const teleport = useHTMLElementSelector(computed(() => props.teleport))

    const anchorClass = useBem('va-dropdown', () => pick(props, ['disabled']))
    const teleportTarget = computed<HTMLElement | undefined>(() => {
      if (teleport.value) {
        return teleport.value
      }

      if (target.value) {
        return target.value
      }

      if (anchorRef.value) {
        const root = anchorRef.value.getRootNode()
        if (root instanceof ShadowRoot) {
          const el = [...root.children].find((c) => c.tagName !== 'STYLE')

          if (el) {
            return el as HTMLElement
          }
        }
      }

      return body.value
    })

    const teleportDisabled = computed(() => {
      return props.disabled
    })
    const showFloating = computed(() => isMounted.value && valueComputed.value)

    const { debounced: debounceHover, cancel: cancelHoverDebounce } = useDebounceFn(toRef(props, 'hoverOverTimeout'))
    const { debounced: debounceUnHover, cancel: cancelUnHoverDebounce } = useDebounceFn(toRef(props, 'hoverOutTimeout'))

    const onClick = (e: MouseEvent) => {
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
    const onDblclick = (e: MouseEvent) => {
      if (kebabCase(props.trigger) !== 'dblclick' || props.disabled) {
        return
      }
      e.preventDefault()

      if (valueComputed.value) {
        emitAndClose('anchor-dblclick', props.closeOnAnchorClick, e)

        if (props.cursor) {
          nextTick(() => {
            valueComputed.value = true
          })
        }
      } else {
        valueComputed.value = true
        emit('anchor-dblclick', e)
      }
    }
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

    useMouseNavigation(anchorRef, {
      click: onClick,
      contextmenu: onContextmenu,
      dblclick: onDblclick,
      mouseenter: onMouseenter,
      mouseleave: onMouseleave,
    })

    if (props.keyboardNavigation) {
      useKeyboardNavigation(anchorRef, valueComputed)
    }

    const emitAndClose = (eventName: Parameters<typeof emit>[0], close?: boolean, e?: Event) => {
      emit(eventName, e)
      if (close) { valueComputed.value = false }
    }

    const floatingListeners = {
      onMouseover: () => props.isContentHoverable && onMouseenter(),
      onMouseout: () => onMouseleave(),
      onClick: () => emitAndClose('content-click', props.closeOnContentClick),
    }

    useClickOutside([anchorRef, floating], () => {
      if (props.closeOnClickOutside && valueComputed.value) {
        emitAndClose('click-outside', props.closeOnClickOutside)
      }
    })

    useFocusOutside([floating], () => {
      if (props.closeOnFocusOutside && valueComputed.value) {
        emitAndClose('focus-outside', props.closeOnFocusOutside)
      }
    }, { onlyKeyboard: true })

    const anchorComputed = computed(() => {
      if (typeof props.cursor === 'object') {
        return props.cursor
      }

      return props.cursor ? cursorAnchor.value : anchorRef.value
    })

    const { floatingStyles } = useDropdown(
      anchorComputed,
      floating,
      target,
      computed(() => ({
        placement: props.placement,
        offset: props.offset,
        autoPlacement: props.autoPlacement,
        stickToEdges: props.stickToEdges,
        keepAnchorWidth: props.keepAnchorWidth,
        verticalScrollOnOverflow: props.verticalScrollOnOverflow,
      })),
    )

    const hide = () => { valueComputed.value = false }
    const show = () => { valueComputed.value = true }

    const {
      zIndex,
      register: registerZIndex,
      unregister: unregisterZIndex,
    } = useZIndex()

    watchEffect(() => {
      if (valueComputed.value && isMounted.value) {
        registerZIndex()
      } else {
        unregisterZIndex()
      }
    })

    return {
      ...useTranslation(),
      ...useTeleported(),
      anchorRef,
      anchorClass,
      floating,
      floatingStyles,
      teleportDisabled,
      showFloating,
      teleportTarget,
      floatingListeners,
      isMounted,
      valueComputed,
      hide,
      show,
      zIndex,
    }
  },

  render () {
    const slotBind = {
      isOpened: this.valueComputed,
      hide: this.hide,
      show: this.show,
      toggle: () => this.valueComputed ? this.hide() : this.show(),
      getAnchorWidth: () => this.anchorRef?.offsetWidth + 'px',
      getAnchorHeight: () => this.anchorRef?.offsetHeight + 'px',
    }

    const floatingSlotNode = this.showFloating && renderSlotNode(this.$slots.default, slotBind, {
      ref: 'floating',
      class: ['va-dropdown__content-wrapper', this.$props.contentClass],
      style: [this.floatingStyles, { zIndex: this.zIndex }],
      ...this.teleportedAttrs,
      ...this.floatingListeners,
    })

    const anchorSlotVNode = renderSlotNode(this.$slots.anchor, slotBind, {
      ref: 'anchorRef',
      role: this.$props.role,
      class: ['va-dropdown', ...this.anchorClass.asArray.value],
      style: { position: 'relative' },
      'aria-label': this.tp(this.$props.ariaLabel),
      'aria-disabled': this.$props.disabled,
      'aria-expanded': this.$props.role && this.$props.role !== 'none' ? !!this.showFloating : undefined,
      ...this.teleportFromAttrs,
      ...this.$attrs,
    })

    if (typeof this.$props.cursor === 'object' && floatingSlotNode) {
      return h(
        Teleport,
        {
          to: this.teleportTarget,
          disabled: this.teleportDisabled,
        },
        [floatingSlotNode],
      )
    }

    if (!this.$props.anchorSelector && !anchorSlotVNode) {
      warn('VaDropdown: #anchor slot is missing')
      return
    }

    if (this.showFloating && !floatingSlotNode) {
      warn('VaDropdown: default slot is missing')
      return
    }

    return h(Fragment, {}, [
      anchorSlotVNode,
      (floatingSlotNode) && h(
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
