<template>
  <div
    ref="rootEl"
    role="button"
    class="va-rating-item"
    :tabindex="tabIndexComputed"
    @keydown.enter="onClick"
    @keydown.space.prevent="onClick"
    @mousemove="onMouseMove"
    @mouseleave="onMouseLeave"
    @click="onClick"
  >
    <slot v-bind="{ value: visibleValue, onClick }">
      <va-icon
        class="va-rating-item__wrapper"
        tabindex="-1"
        tag="button"
        :name="computedIconName"
        :size="$props.size"
        :color="computedColor"
      />
    </slot>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, shallowRef, watch } from 'vue'

import { useColors, useVModelStateful } from '../../../../composables'

import { RatingValue } from '../../types'

import { VaIcon } from '../../../va-icon'

defineOptions({
  name: 'VaRatingItem',
})

const props = defineProps({
  modelValue: { type: Number, default: RatingValue.EMPTY },
  icon: { type: String, default: 'star' },
  halfIcon: { type: String, default: 'star_half' },
  emptyIcon: { type: String, default: 'star_outline' },
  halves: { type: Boolean, default: false },
  hover: { type: Boolean, default: false },
  tabindex: { type: [String, Number], default: 0 },
  disabled: { type: Boolean, default: false },
  readonly: { type: Boolean, default: false },
  size: { type: [String, Number], default: 'medium' },
  unselectedColor: { type: String },
  color: { type: String, default: 'primary' },
})

const emit = defineEmits(['update:modelValue', 'click', 'hover'])

const rootEl = shallowRef<HTMLElement>()

const vModel = useVModelStateful(props, 'modelValue', emit)
const hoveredValue = ref<number | null>(null)

const visibleValue = computed(() => {
  if (props.hover && !props.disabled && !props.readonly) {
    return hoveredValue.value || vModel.value
  }
  return vModel.value
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
  vModel.value = 1
}

const onClick = () => {
  vModel.value = hoveredValue.value || RatingValue.FULL
  emit('click', hoveredValue.value || RatingValue.FULL)
}

watch(hoveredValue, () => emit('hover', hoveredValue.value || RatingValue.EMPTY))

const computedIconName = computed(() => {
  if (props.halves && visibleValue.value === RatingValue.HALF) {
    return props.halfIcon
  }
  if (visibleValue.value === RatingValue.EMPTY) {
    return props.emptyIcon
  }

  return props.icon
})

const tabIndexComputed = computed(() => props.disabled ? -1 : props.tabindex)
</script>

<style lang="scss">
@import "../../../../styles/resources";

.va-rating-item {
  display: inline-block;

  @include keyboard-focus-outline($radius: 2px);

  &__wrapper {
    @include normalize-button();
  }
}
</style>
