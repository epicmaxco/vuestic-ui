<template>
  <div
    class="va-rating"
    :class="rootClass"
    :aria-label="tp($props.ariaLabel, { max: $props.max, value: $props.modelValue })"
  >
    <div
      class="va-rating__item-wrapper"
      @keyup.left="onArrowKeyPress(-1)"
      @keyup.right="onArrowKeyPress(1)"
    >
      <va-rating-item
        v-for="itemNumber in Number($props.max)"
        :key="itemNumber"
        class="va-rating__item"
        v-bind="VaRatingItemProps"
        :aria-label="tp($props.ariaItemLabel, { max: $props.max, value: itemNumber })"
        :model-value="getItemValue(itemNumber - 1)"
        :tabindex="tabIndexComputed"
        :disabled="$props.disabled"
        :readonly="$props.readonly"
        @hover="isInteractionsEnabled && onItemHoveredValueUpdate(itemNumber - 1, $event)"
        @update:model-value="isInteractionsEnabled && onItemValueUpdate(itemNumber - 1, $event)"
        v-slot="{ value, onClick }"
      >
        <slot name="item" v-bind="{ value: value, onClick: onClick, index: itemNumber }">
          <template v-if="$props.numbers">
            <VaRatingItemNumberButton
              v-bind="VaRatingItemNumberButtonProps"
              :model-value="value"
              :item-number="itemNumber"
            />
          </template>
        </slot>
      </va-rating-item>
    </div>
    <span
      v-if="$props.texts && $props.texts.length === $props.max"
      class="va-rating__text-wrapper"
      :style="{ color: computedColor }"
    >
      {{ $props.texts[Math.round(visibleValue) - 1] }}
    </span>
  </div>
</template>

<script lang="ts">
import { computed, PropType } from 'vue'

import { extractComponentProps, filterComponentProps } from '../../utils/component-options'
import { useFormField, useFormFieldProps, useTranslation, useTranslationProp, useComponentPresetProp, useCurrentElement } from '../../composables'
import { useRating, useRatingProps } from './hooks/useRating'
import { useVaRatingColors, useVaRatingColorsProps } from './hooks/useVaRatingColors'

import { RatingValue } from './types'
import VaRatingItem from './components/VaRatingItem/VaRatingItem.vue'
import VaRatingItemNumberButton from './components/VaRatingItemNumberButton.vue'

const VaRatingItemPropsDeclarations = extractComponentProps(VaRatingItem, ['modelValue', 'itemNumber'])
const VaRatingItemNumberButtonPropsDeclarations = extractComponentProps(VaRatingItemNumberButton, ['modelValue', 'itemNumber'])
</script>

<script lang="ts" setup>
defineOptions({
  name: 'VaRating',
})

const props = defineProps({
  ...VaRatingItemNumberButtonPropsDeclarations,
  ...useRatingProps,
  ...useVaRatingColorsProps,
  ...useFormFieldProps,
  ...VaRatingItemPropsDeclarations,
  ...useComponentPresetProp,
  modelValue: { type: Number, default: 0 },
  numbers: { type: Boolean, default: false },
  halves: { type: Boolean, default: false },
  max: { type: [Number, String], default: 5 },
  texts: { type: Array as PropType<string[]>, default: () => [] },

  ariaLabel: useTranslationProp('$t:currentRating'),
  ariaItemLabel: useTranslationProp('$t:voteRating'),
})

const emit = defineEmits(['update:modelValue'])

const { computedClasses: rootClass } = useFormField('va-rating', props)
const {
  visibleValue,
  modelValue: vModel,
  onItemValueUpdate,
  onItemHoveredValueUpdate,
  getItemValue,
} = useRating(props, useCurrentElement())
const isInteractionsEnabled = computed(() => !props.disabled && !props.readonly)

const onArrowKeyPress = (direction: 1 | -1) => {
  const max = Number(props.max)
  const step = props.halves ? RatingValue.HALF : RatingValue.FULL
  const nextStep = visibleValue.value + step * direction
  const min = props.clearable ? 0 : step
  if (nextStep >= min && nextStep <= max) {
    onItemValueUpdate(visibleValue.value, step * direction)
  } else if (nextStep < min) {
    onItemValueUpdate(min, 0)
  } else {
    onItemValueUpdate(max, direction === -1 ? step * direction : 0)
  }
}

const { tp, t } = useTranslation()

const {
  computedColor,
  backgroundComputed,
  textColorComputed,
} = useVaRatingColors(props)

const tabIndexComputed = computed(() => isInteractionsEnabled.value ? 0 : undefined)

const VaRatingItemProps = filterComponentProps(VaRatingItemPropsDeclarations)
const VaRatingItemNumberButtonProps = filterComponentProps(VaRatingItemNumberButtonPropsDeclarations)
</script>

<style lang="scss">
@import "../../styles/resources";
@import 'variables';

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
    display: flex;
    cursor: var(--va-rating-item-wrapper-cursor);

    @at-root {
      .va-rating--readonly &,
      .va-rating--disabled & {
        cursor: default;
      }
    }
  }

  &-item {
    display: flex;

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
