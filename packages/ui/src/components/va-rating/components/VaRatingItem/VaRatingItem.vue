<template>
  <div
    ref="rootEl"
    class="va-rating-item"
    :tabindex="$props.tabindex"
    @keyup.enter="onClick"
    @mousemove="onMouseMove"
    @mouseleave="onMouseLeave"
  >
    <slot :props="{
      value: visibleValue, onClick
    }">
      <va-icon
        class="va-rating-item__wrapper"
        tabindex="-1"
        tag="button"
        :name="computedIconName"
        :size="$props.size"
        :color="getColor($props.color)"
        @click="onClick"
      />
    </slot>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch } from 'vue'
import { useColors } from '../../../../services/color-config/color-config'
import { useSyncProp } from '../../../../composables/useSyncProp'
import VaIcon from '../../../va-icon'
import { RatingValue } from '../../types'

export default defineComponent({
  name: 'VaRatingItem',

  components: { VaIcon },

  props: {
    modelValue: { type: Number, default: 0 },
    icon: { type: String, default: 'star' },
    halfIcon: { type: String, default: 'star_half' },
    emptyIcon: { type: String, default: 'star_outline' },
    halves: { type: Boolean, default: false },
    hover: { type: Boolean, default: false },
    tabindex: { type: Number, default: 1 },
    size: { type: [String, Number], default: 'medium' },
    emptyIconColor: { type: String },
    color: { type: String, default: 'primary' },
  },

  emits: ['update:modelValue', 'click', 'hover'],

  setup (props, { emit }) {
    const rootEl = ref<HTMLElement>()
    const [modelValue] = useSyncProp('modelValue', props, emit, RatingValue.EMPTY)
    const hoveredValue = ref<number | null>(null)

    const visibleValue = computed(() => {
      if (props.hover) {
        return hoveredValue.value || modelValue.value
      }
      return modelValue.value
    })

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

    return {
      ...useColors(),
      rootEl,
      onEnter,
      onClick,
      onMouseMove,
      onMouseLeave,
      visibleValue,
      computedIconName: computed(() => {
        if (props.halves && visibleValue.value === RatingValue.HALF) {
          return props.halfIcon
        }
        if (visibleValue.value === RatingValue.EMPTY) {
          return props.emptyIcon
        }

        return props.icon
      }),
    }
  },
})
</script>

<style lang="scss">
@import "../../../../styles/resources";

.va-rating-item {
  display: inline-block;

  &:focus {
    transform: scale(1.1);
  }

  &__wrapper {
    @include normalize-button();
  }
}
</style>
