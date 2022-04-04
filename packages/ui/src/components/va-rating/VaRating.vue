<template>
  <div class="va-rating" :class="rootClass">
    <div
      @keyup.left="onArrowKeyPress(-1)"
      @keyup.right="onArrowKeyPress(1)"
      @mouseenter="onMouseEnter()"
      @mouseleave="onMouseLeave"
      class="va-rating__item-wrapper"
    >
      <va-rating-item
        v-for="itemNumber in $props.max"
        v-bind="VaRatingItemProps"
        :model-value="getItemValue(itemNumber - 1)"
        :key="itemNumber"
        :empty-icon-color="$props.unselectedColor"
        :tabindex="tabindex"
        @hover="isInteractionsEnabled && onItemHoveredValueUpdate(itemNumber - 1, $event)"
        @update:model-value="isInteractionsEnabled && onItemValueUpdate(itemNumber - 1, $event)"
      >
        <template v-if="$props.numbers" v-slot="{ props }">
          <VaRatingItemNumberButton
            v-bind="VaRatingItemNumberButtonProps"
            :model-value="props.value"
            :item-number="itemNumber"
            @click="props.onClick"
          />
        </template>
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
import { defineComponent, computed, PropType } from 'vue'

import { useRating, useRatingProps } from './hooks/useRating'
import { useVaRatingColors, useVaRatingColorsProps } from './hooks/useVaRatingColors'
import { useForm, useFormProps } from '../../composables/useForm'
import { extractComponentProps, filterComponentProps } from '../../utils/child-props'
import { RatingValue } from './types'

import VaRatingItem from './components/VaRatingItem/VaRatingItem.vue'
import VaRatingItemNumberButton from './components/VaRatingItemNumberButton.vue'

const VaRatingItemProps = extractComponentProps(VaRatingItem, ['unselectedColor'])
const VaRatingItemNumberButtonProps = extractComponentProps(VaRatingItemNumberButton, ['modelValue', 'itemNumber'])

export default defineComponent({
  name: 'VaRating',
  props: {
    ...useRatingProps,
    ...useVaRatingColorsProps,
    ...useFormProps,
    ...VaRatingItemProps,
    ...VaRatingItemNumberButtonProps,
    numbers: { type: Boolean, default: false },
    halves: { type: Boolean, default: false },
    max: { type: Number, default: 5 },
    texts: { type: Array as PropType<string[]>, default: () => [] },
  },
  emits: ['update:modelValue'],
  components: { VaRatingItem, VaRatingItemNumberButton },
  setup (props) {
    const { createComputedClass } = useForm(props)
    const rating = useRating(props)
    const isInteractionsEnabled = computed(() => !props.disabled && !props.readonly)

    return {
      ...useVaRatingColors(props),
      ...rating,
      rootClass: createComputedClass('va-rating'),
      VaRatingItemProps: filterComponentProps(props, VaRatingItemProps),
      VaRatingItemNumberButtonProps: filterComponentProps(props, VaRatingItemNumberButtonProps),
      isInteractionsEnabled,
      tabindex: computed(() => isInteractionsEnabled.value ? 0 : undefined),
      onArrowKeyPress: (direction: 1 | -1) => {
        const step = props.halves ? RatingValue.HALF : RatingValue.FULL
        rating.onItemValueUpdate(rating.visibleValue.value, step * direction)
      },
    }
  },
})
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
