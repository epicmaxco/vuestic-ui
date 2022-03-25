<template>
  <div
    class="va-rating"
    :class="classList"
  >
    <div
      @keyup.left="onArrow(-1)"
      @keyup.right="onArrow(1)"
      @mouseenter="isHovered = hoverEnabled"
      @mouseleave="isHovered = false"
      class="va-rating__item-wrapper"
    >
      <template v-if="$props.numbers">
        <va-rating-item
          v-for="number in $props.max"
          :key="number"
          class="va-rating__number-item"
          :halves="$props.halves"
          :hover="hoverEnabled"
          :size="$props.size"
          :color="$props.color"
          :empty-icon-color="$props.unselectedColor"
          :tabindex="tabIndex"
          :modelValue="getItemValue(number)"
          @hover="onHover(number, $event)"
          @click="onItemSelected(number, $event)"
        >
          <template v-slot="{ props }">
            <button
              @click="props.onClick"
              class="va-rating__number-item"
              tabindex="-1"
              :style=" {
                background: props.value === 0.5
                  ? `linear-gradient(90deg, ${getColor($props.color)} 50%, ${focusColor} 50%`
                  : !props.value ? focusColor : getColor($props.color),
                color: props.value ? '#fff' : getColor($props.color),
                width: sizeComputed,
                height: sizeComputed,
                fontSize: fontSizeComputed,
                borderRadius: `${fontSizeInRem * 0.125}rem`,
              }"
            > {{ number }} </button>
          </template>
        </va-rating-item>
      </template>
      <template v-else>
        <va-rating-item
          v-for="itemNumber in $props.max"
          :key="itemNumber"
          :halves="$props.halves"
          :hover="hoverEnabled"
          :filled-icon-name="$props.icon"
          :half-icon-name="$props.halfIcon"
          :empty-icon-name="$props.emptyIcon"
          :size="$props.size"
          :color="$props.color"
          :empty-icon-color="$props.unselectedColor"
          :tabindex="tabIndex"
          :modelValue="getItemValue(itemNumber)"
          @hover="onHover(itemNumber, $event)"
          @click="onItemSelected(itemNumber, $event)"
        />
      </template>
    </div>
    <span
      class="va-rating__text-wrapper"
      v-if="texts.length === $props.max"
      :style="{ color: getColor($props.textColor) }"
    >
      {{ texts[Math.round(valueProxy) - 1] }}
    </span>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, computed, onMounted } from 'vue'

import { useStateful, useStatefulEmits, useStatefulProps } from '../../composables/useStateful'
import { useColors } from '../../composables/useColor'
import { useSize, useSizeProps } from '../../composables/useSize'

import VaRatingItem from './VaRatingItem'
import { RatingValue } from './VaRating.types'

export default defineComponent({
  name: 'VaRating',
  components: { VaRatingItem },
  emits: useStatefulEmits,
  props: {
    ...useStatefulProps,
    ...useSizeProps,
    modelValue: { type: Number as PropType<number>, default: 0 },
    icon: { type: String as PropType<string>, default: 'star' },
    halfIcon: { type: String as PropType<string>, default: 'star_half' },
    emptyIcon: { type: String as PropType<string>, default: 'star_outline' },
    readonly: { type: Boolean as PropType<boolean>, default: false },
    disabled: { type: Boolean as PropType<boolean>, default: false },
    numbers: { type: Boolean as PropType<boolean>, default: false },
    halves: { type: Boolean as PropType<boolean>, default: false },
    max: { type: Number as PropType<number>, default: 5 },
    clearable: { type: Boolean as PropType<boolean>, default: false },
    hover: { type: Boolean as PropType<boolean>, default: false },
    texts: { type: Array as PropType<string[]>, default: () => [] },
    textColor: { type: String as PropType<string> },
    unselectedColor: { type: String as PropType<string> },
    color: { type: String as PropType<string>, default: 'primary' },
  },
  setup (props, { emit }) {
    const { valueComputed } = useStateful(props, emit)
    const { getColor, getFocusColor } = useColors()

    const isHovered = ref(false)
    const forceEmit = ref(false)
    const hoveredValue = ref(RatingValue.EMPTY)

    const valueProxy = computed({
      get: () => isHovered.value ? hoveredValue.value : valueComputed.value,
      set: (value: number) => {
        hoveredValue.value = value

        if (forceEmit.value) {
          valueComputed.value = value
          forceEmit.value = false
        }
      },
    })

    const focusColor = computed(() => {
      return props.unselectedColor
        ? getColor(props.unselectedColor)
        : getFocusColor(getColor(props.color))
    })

    const classList = computed(() => ({
      'va-rating--disabled': props.disabled,
      'va-rating--readonly': props.readonly,
    }))

    const interactionsEnabled = computed(() => !(props.disabled || props.readonly))

    const hoverEnabled = computed(() => props.hover && interactionsEnabled.value)

    const tabIndex = computed(() => interactionsEnabled.value ? 0 : undefined)

    const getItemValue = (itemNumber: number) => {
      const diff = itemNumber - valueProxy.value

      switch (true) {
        case diff <= 0:
          return RatingValue.FULL
        case diff === RatingValue.HALF && props.halves:
          return RatingValue.HALF
        default:
          return RatingValue.EMPTY
      }
    }

    const onHover = (itemNumber: number, value: RatingValue) => {
      valueProxy.value = value === RatingValue.FULL
        ? itemNumber
        : itemNumber - RatingValue.HALF
    }

    const onArrow = (direction: 1 | -1) => {
      const currentValue = valueProxy.value || RatingValue.EMPTY
      const step = props.halves ? RatingValue.HALF : RatingValue.FULL
      const nextValue = currentValue + (step * direction)

      if (nextValue < 0 || nextValue > props.max) { return }

      forceEmit.value = true
      valueProxy.value = nextValue
    }

    const onItemSelected = (itemNumber: number, value: RatingValue) => {
      if (!interactionsEnabled.value) { return }

      const currentClickedValue = props.halves
        ? value === RatingValue.HALF ? itemNumber - RatingValue.HALF : itemNumber
        : itemNumber

      const valueToEmit = props.clearable && valueComputed.value === currentClickedValue
        ? RatingValue.EMPTY
        : currentClickedValue

      forceEmit.value = true
      valueProxy.value = valueToEmit
    }

    onMounted(() => { hoveredValue.value = valueComputed.value })

    return {
      ...useSize(props),
      getColor,
      focusColor,
      classList,
      hoverEnabled,
      isHovered,
      tabIndex,
      getItemValue,
      onHover,
      onArrow,
      onItemSelected,
      valueProxy,
    }
  },
})
</script>

<style lang="scss">
@import "../../styles/resources";
@import "variables";

.va-rating {
  display: var(--va-rating-display);
  font-family: var(--va-font-family);

  &__number-item {
    @include normalize-button();

    font-size: var(--va-rating-number-item-font-size);
    margin: var(--va-rating-number-item-margin);
    font-weight: var(--va-rating-number-item-font-weight);

    @include flex-center();

    cursor: pointer;

    @at-root {
      .va-rating--disabled & {
        @include va-disabled();
      }

      .va-rating--readonly & {
        cursor: default;
      }
    }
  }

  &__item-wrapper {
    display: var(--va-rating-item-wrapper-display);
    cursor: var(--va-rating-item-wrapper-cursor);

    @at-root {
      .va-rating--readonly &,
      .va-rating--disabled & {
        cursor: default;
      }
    }
  }

  &-item {
    display: var(--va-rating-item-display);

    @include flex-center();

    .va-rating--disabled & {
      @include va-disabled();

      &__wrapper {
        cursor: initial !important;
      }
    }

    .va-rating--readonly & &__wrapper {
      cursor: initial !important;
    }
  }

  &__text-wrapper {
    padding-left: 10px;
  }
}
</style>
