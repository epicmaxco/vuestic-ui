<script lang="ts">
import {
  h,
  defineComponent,
  PropType,
  computed,
  nextTick,
  ref,
  Fragment,
  Teleport,
  watch,
  toRef,
} from 'vue'
import {
  MaybeHTMLElementOrSelector,
  createStatefulProps,
  useBem,
  useClickOutside,
  useIsMounted,
  useStateful,
  useStatefulEmits,
  useTranslation, useTranslationProp,
  usePlacementAliasesProps,
  useTeleported,
  useSelectorTemplateRef,
  useElementTemplateRef,
} from '../../composables'
import { renderSlotNode } from '../../utils/headless'
import { useNavigation, Trigger } from './hooks/useDropdownNavigation'
import { useAnchorSelector } from './hooks/useAnchorSelector'
import { useCursorAnchor } from './hooks/useCursorAnchor'
import { CursorAnchor, DropdownOffsetProp } from './types'
import { useDropdown } from './hooks/useDropdown'
import { warn } from '../../utils/console'
import { useFocusOutside } from '../../composables/std/event/useFocusOutside'
import { StringWithAutocomplete } from '../../utils/types/prop-type'
import { useZIndex } from '../../composables/useZIndex'
import { focusFirstFocusableChild } from '../../utils/focus'
import { unwrapEl } from '../../utils/unwrapEl'
import { pick } from '../../utils/pick'

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
      type: [String, Array] as PropType<Trigger | readonly Trigger[]>,
      default: () => ['click', 'space', 'enter', 'arrow-down', 'arrow-up'],
    },
    disabled: { type: Boolean },
    readonly: { type: Boolean },
    closeOnClickOutside: { type: Boolean, default: true },
    closeOnFocusOutside: { type: Boolean, default: true },
    closeOnAnchorClick: { type: Boolean, default: true },
    closeOnContentClick: { type: Boolean, default: true },
    hoverOverTimeout: { type: [Number, String], default: 30 },
    hoverOutTimeout: { type: [Number, String], default: 200 },
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
    keyboardNavigation: { type: Boolean, default: true },
    ariaLabel: useTranslationProp('$t:toggleDropdown'),
    role: { type: String as PropType<StringWithAutocomplete<'button' | 'none'>>, default: 'button' },
    contentClass: { type: String, default: '' },
  },

  emits: [...useStatefulEmits, 'anchor-click', 'anchor-right-click', 'content-click', 'click-outside', 'focus-outside', 'close', 'open', 'anchor-dblclick'],

  setup (props, { emit }) {
    const valueComputed = useStateful(props, emit, 'modelValue')

    watch(valueComputed, (isOpened) => {
      if (isOpened) {
        emit('open')
      } else {
        emit('close')
      }
    })

    const isMounted = useIsMounted()

    const { anchorRef } = useAnchorSelector(props)
    const cursorAnchor = useCursorAnchor(anchorRef, computed(() => Boolean(props.cursor)))
    const floating = useElementTemplateRef('floating')
    const body = useSelectorTemplateRef(ref('body'))
    const target = useSelectorTemplateRef(toRef(props, 'target'))
    const teleport = useSelectorTemplateRef(toRef(props, 'teleport'))

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

    const showFloating = computed(() => isMounted.value && valueComputed.value)

    useNavigation(
      valueComputed,
      anchorRef,
      floating,
      props,
    )

    const emitAndClose = (eventName: Parameters<typeof emit>[0], close?: boolean, e?: Event) => {
      emit(eventName, e)
      if (close) { valueComputed.value = false }
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
    } = useZIndex(valueComputed)

    watch(valueComputed, (isOpened) => {
      if (!props.keyboardNavigation) { return }

      if (isOpened) {
        nextTick(() => {
          const el = unwrapEl(floating.value)
          if (!el) { return }
          focusFirstFocusableChild(el)
        })
      } else {
        if (!anchorRef.value) { return }
        focusFirstFocusableChild(anchorRef.value)
      }
    })

    return {
      ...useTranslation(),
      ...useTeleported(),
      anchorRef,
      anchorClass,
      floating,
      floatingStyles,
      showFloating,
      teleportTarget,
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
    })

    const anchorSlotVNode = renderSlotNode(this.$slots.anchor, slotBind, {
      ref: 'anchorRef',
      role: this.$props.role,
      class: ['va-dropdown', this.anchorClass],
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
          disabled: this.$props.disabled,
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
          disabled: this.$props.disabled,
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
  &.va-headless-wrapper {
    /* Solved the alignment problem (if we try to align inline and block elements) */
    line-height: var(--va-dropdown-line-height);
    display: var(--va-dropdown-display);
    max-width: 100%;
    vertical-align: middle;
  }

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
