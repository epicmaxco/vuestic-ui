<template>
  <div
    class="va-dropdown"
    :class="computedClass"
  >
    <div
      class="va-dropdown__anchor"
      @click="onAnchorClick()"
      @mouseenter="onMouseEnter()"
      @mouseleave="onMouseLeave()"
      @keyup.enter.stop.prevent="onAnchorClick()"
      ref="anchorRef"
    >
      <slot name="anchor" />
    </div>
    <template v-if="valueComputed">
      <teleport :to="attachElement" :disabled="disableAttachment">
        <div
          class="va-dropdown__content-wrapper"
          @mouseover="$props.isContentHoverable && onMouseEnter()"
          @mouseout="onMouseLeave()"
          @click.stop="emitAndClose('dropdown-content-click', closeOnContentClick)"
          ref="contentRef"
        >
          <slot />
        </div>
      </teleport>
    </template>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, ref, toRef } from 'vue'
import { useStateful, useStatefulEmits, useStatefulProps } from '../../composables/useStateful'
import { useDebounceFn } from '../../composables/useDebounce'
import { usePopover, placementsPositions, Placement } from '../../composables/usePopover'
import { useClickOutside } from '../../composables/useClickOutside'

export default defineComponent({
  name: 'VaDropdown',

  props: {
    ...useStatefulProps,
    stateful: { default: true },
    modelValue: { type: Boolean, default: false },
    disabled: { type: Boolean },
    anchorSelector: { type: String, default: '' },
    attachElement: { type: String, default: 'body' },
    disableAttachment: { type: Boolean, default: false },
    keepAnchorWidth: { type: Boolean, default: false },
    isContentHoverable: { type: Boolean, default: true },
    closeOnContentClick: { type: Boolean, default: true },
    closeOnClickOutside: { type: Boolean, default: true },
    closeOnAnchorClick: { type: Boolean, default: true },
    hoverOverTimeout: { type: Number, default: 30 },
    hoverOutTimeout: { type: Number, default: 200 },
    offset: { type: [Array, Number] as PropType<number | [number, number]>, default: () => 0 },
    trigger: {
      type: String as PropType<'click' | 'hover' | 'none'>,
      default: 'click',
      validator: (trigger: string) => ['click', 'hover', 'none'].includes(trigger),
    },
    placement: {
      type: String as PropType<Placement>,
      default: 'bottom',
      validator: (placement: string) => placementsPositions.includes(placement),
    },
  },

  emits: [...useStatefulEmits, 'anchor-click', 'dropdown-content-click', 'click-outside'],

  setup (props, { emit }) {
    const anchorRef = ref()
    const contentRef = ref()
    const { valueComputed } = useStateful(props, emit)

    const computedClass = computed(() => ({
      'va-dropdown': true,
      'va-dropdown--disabled': props.disabled,
    }))

    // to be able to select specific anchor element inside anchorRef
    const anchorElement = computed(() => {
      return (anchorRef.value && props.anchorSelector)
        ? anchorRef.value.querySelector(props.anchorSelector) || anchorRef.value
        : anchorRef.value
    })

    usePopover(anchorElement, contentRef, computed(() => ({
      placement: props.placement,
      keepAnchorWidth: props.keepAnchorWidth,
      offset: props.offset,
      stickToEdges: true,
      autoPlacement: true,
      root: props.attachElement,
    })))

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

    useClickOutside([anchorRef, contentRef], () => {
      if (props.closeOnClickOutside && valueComputed.value) {
        emitAndClose('click-outside', props.closeOnClickOutside)
      }
    })

    return {
      valueComputed,
      anchorRef,
      contentRef,
      computedClass,
      emitAndClose,
      onAnchorClick,
      onMouseEnter,
      onMouseLeave,
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

  &--disabled {
    @include va-disabled;
  }

  &__content-wrapper {
    /* overflow: hidden; */
    z-index: var(--va-dropdown-content-wrapper-z-index);
  }
}
</style>
