<template>
  <div
    ref="rootEl"
    role="button"
    class="va-rating-item"
    :class="keyboardFocusClass"
    :tabindex="tabIndexComputed"
    @keyup.enter="onClick"
    @keyup.space="onClick"
    @mousemove="onMouseMove"
    @mouseleave="onMouseLeave"
    @click="onClick"
    v-on="keyboardFocusListeners"
  >
    <slot v-bind="{ value: visibleValue, onClick }">
      <va-icon
        class="va-rating-item__wrapper"
        tabindex="-1"
        tag="button"
        :name="computedIconName"
        :size="$props.size"
        :color="computedColor"
        @click="onClick"
      />
    </slot>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, shallowRef, watch } from 'vue'

import { useColors, useSyncProp, useKeyboardFocusClass, useKeyboardFocusClassProps } from '../../../../composables'

import { RatingValue } from '../../types'

import { VaIcon } from '../../../va-icon'

export default defineComponent({
  name: 'VaRatingItem',

  components: { VaIcon },

  props: {
    ...useKeyboardFocusClassProps,
    modelValue: { type: Number, default: 0 },
    icon: { type: String, default: 'star' },
    halfIcon: { type: String, default: 'star_half' },
    emptyIcon: { type: String, default: 'star_outline' },
    halves: { type: Boolean, default: false },
    hover: { type: Boolean, default: false },
    tabindex: { type: Number, default: 0 },
    disabled: { type: Boolean, default: false },
    readonly: { type: Boolean, default: false },
    size: { type: [String, Number], default: 'medium' },
    unselectedColor: { type: String },
    color: { type: String, default: 'primary' },
  },

  emits: ['update:modelValue', 'click', 'hover'],

  setup (props, { emit }) {
    const rootEl = shallowRef<HTMLElement>()

    const [modelValue] = useSyncProp('modelValue', props, emit, RatingValue.EMPTY)
    const hoveredValue = ref<number | null>(null)

    const visibleValue = computed(() => {
      if (props.hover && !props.disabled && !props.readonly) {
        return hoveredValue.value || modelValue.value
      }
      return modelValue.value
    })

    const { getColor } = useColors()
    const computedColor = computed(() => getColor(
      props.unselectedColor && visibleValue.value === RatingValue.EMPTY
        ? props.unselectedColor
        : props.color,
    ))

    const onMouseMove = (ev: MouseEvent) => {
      if (!rootEl.value) { return }
      const { offsetX } = ev
      const iconWidth = rootEl.value.clientWidth

      if (props.halves) {
        hoveredValue.value = offsetX / iconWidth <= RatingValue.HALF ? RatingValue.HALF : RatingValue.FULL
      } else {
        hoveredValue.value = RatingValue.FULL
      }
    }

    const onMouseLeave = () => {
      hoveredValue.value = null
    }

    const onEnter = () => {
      modelValue.value = 1
    }

    const onClick = () => {
      modelValue.value = hoveredValue.value || RatingValue.FULL
      emit('click', hoveredValue.value || RatingValue.FULL)
    }

    watch(hoveredValue, () => emit('hover', hoveredValue.value || RatingValue.EMPTY))

    const { keyboardFocusClass, keyboardFocusListeners } = useKeyboardFocusClass(props)

    return {
      keyboardFocusClass,
      computedColor,
      rootEl,
      onEnter,
      onClick,
      onMouseMove,
      onMouseLeave,
      visibleValue,
      keyboardFocusListeners,

      computedIconName: computed(() => {
        if (props.halves && visibleValue.value === RatingValue.HALF) {
          return props.halfIcon
        }
        if (visibleValue.value === RatingValue.EMPTY) {
          return props.emptyIcon
        }

        return props.icon
      }),
      tabIndexComputed: computed(() => props.disabled ? -1 : props.tabindex),
    }
  },
})
</script>

<style lang="scss">
  @import "../../../../styles/resources";

  .va-rating-item {
    display: inline-block;

    @include keyboard-focus;

    &__wrapper {
      @include normalize-button();
    }
  }
</style>
