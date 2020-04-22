<template>
  <div
    class="va-rating"
    :class="classList"
  >
    <div
      @keyup.left="onArrow($event, -1)"
      @keyup.right="onArrow($event, 1)"
      @mouseenter="onMouseEnter"
      @mouseleave="onMouseLeave"
      class="va-rating__item-wrapper"
    >
      <template
        v-if="numbers"
      >
        <va-rating-item
          v-for="number in max"
          :key="number"
          class="va-rating__number-item"
          :halves="halves"
          :hover="hoverEnabled"
          :size="size"
          :color="c_color"
          :tabindex="tabIndex"
          :value="getItemValue(number)"
          @hover="onHover(number, $event)"
          @click="onItemSelected(number, $event)"
        >
          <template v-slot="{ props }">
            <span
              @click="props.onClick"
              class="va-rating__number-item"
              :style=" {
                background: props.value === 0.5
                  ? `linear-gradient(90deg, ${colorComputed} 50%, ${focusColor} 50%`
                  : !props.value ? focusColor : colorComputed,
                color: props.value ? '#fff' : colorComputed,
                width: sizeComputed,
                height: sizeComputed,
                fontSize: fontSizeComputed,
              }"
            > {{ number }} </span>
          </template>
        </va-rating-item>
      </template>
      <template v-else>
        <va-rating-item
          v-for="itemNumber in max"
          :key="itemNumber"
          :halves="halves"
          :hover="hoverEnabled"
          :filled-icon-name="icon"
          :half-icon-name="halfIcon"
          :empty-icon-name="emptyIcon"
          :size="size"
          :color="c_color"
          :tabindex="tabIndex"
          :value="getItemValue(itemNumber)"
          @hover="onHover(itemNumber, $event)"
          @click="onItemSelected(itemNumber, $event)"
        />
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import VaRatingItem, { RatingItemValue } from './VaRatingItem.vue'
import { getFocusColor } from '../../../services/color-functions'
import { ColorThemeMixin } from '../../../services/ColorThemePlugin'
import { ContextPluginMixin, makeContextablePropsMixin } from '../../context-test/context-provide/ContextPlugin'
import Component, { mixins } from 'vue-class-component'
import { Watch } from 'vue-property-decorator'
import { ColorInput } from 'colortranslator/dist/@types'
import { SizeMixin } from '../../../mixins/SizeMixin'

const RatingPropsMixin = makeContextablePropsMixin({
  value: { type: Number, default: 0 },
  icon: { type: String, default: 'star' },
  halfIcon: { type: String, default: 'star_half' },
  emptyIcon: { type: String, default: 'star_empty' },
  readonly: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  numbers: { type: Boolean, default: false },
  halves: { type: Boolean, default: false },
  max: { type: Number, default: 5 },
  size: { type: [String, Number], default: 'medium' },
  clearable: { type: Boolean, default: false },
  hover: { type: Boolean, default: false },
})

@Component({
  name: 'VaRating',
  components: { VaRatingItem },
})
export default class VaRating extends mixins(
  RatingPropsMixin,
  ColorThemeMixin,
  ContextPluginMixin,
  SizeMixin,
) {
  private readonly HALF_VALUE = 0.5
  private readonly FULL_VALUE = 1
  private readonly EMPTY_VALUE = 0

  private isHovered = false
  private forceEmit = false
  private hoveredValue: number = this.value

  private get valueProxy (): number {
    return this.isHovered ? this.hoveredValue : this.value
  }

  private set valueProxy (value: number) {
    this.hoveredValue = value
    if (this.forceEmit) {
      this.$emit('input', value)
      this.forceEmit = false
    }
  }

  private get focusColor () {
    return getFocusColor(this.colorComputed as ColorInput)
  }

  private get classList () {
    return {
      'va-rating--disabled': this.disabled,
      'va-rating--readonly': this.readonly,
    }
  }

  private get interactionsEnabled () {
    return !(this.disabled || this.readonly)
  }

  private get hoverEnabled () {
    return this.hover && this.interactionsEnabled
  }

  private get tabIndex () {
    return this.interactionsEnabled ? 0 : undefined
  }

  @Watch('value')
  private onValueChange (newValue: number) {
    this.hoveredValue = newValue
  }

  private getItemValue (itemNumber: number): RatingItemValue {
    const diff = itemNumber - this.valueProxy
    switch (true) {
      case diff <= 0: return this.FULL_VALUE
      case diff === this.HALF_VALUE && this.halves: return this.HALF_VALUE
      default: return this.EMPTY_VALUE
    }
  }

  private onHover (itemNumber: number, value: RatingItemValue): void {
    this.valueProxy = value === this.FULL_VALUE
      ? itemNumber
      : itemNumber - this.HALF_VALUE
  }

  private onMouseEnter () {
    this.isHovered = this.hoverEnabled && true
  }

  private onMouseLeave () {
    this.isHovered = false
  }

  private onArrow (event: KeyboardEvent, directon: 1 | -1) {
    const step = this.halves ? this.HALF_VALUE : this.FULL_VALUE
    const nextValue = this.valueProxy + (step * directon)
    if (nextValue < 0 || nextValue > this.max) return

    this.forceEmit = true
    this.valueProxy = nextValue
  }

  private onItemSelected (itemNumber: number, value: RatingItemValue) {
    if (this.readonly || this.disabled) return
    const currentClickedValue = this.halves
      ? value === this.HALF_VALUE ? itemNumber - this.HALF_VALUE : itemNumber
      : itemNumber
    const valueToEmit = this.clearable && this.value === currentClickedValue
      ? 0
      : currentClickedValue

    this.forceEmit = true
    this.valueProxy = valueToEmit
  }
}
</script>

<style lang="scss">
@import "../../vuestic-sass/resources/resources";

.va-rating {
  display: flex;

  &__number-item {
    font-size: inherit;
    margin: 0.1em;
    border-radius: 0.125rem;
    font-weight: $font-weight-bold;

    @include flex-center();

    cursor: pointer;

    @at-root {
      .va-rating--disabled & {
        @include va-disabled();
      }

      .va-rating--readonly & {
        cursor: initial;
      }
    }
  }

  &__item-wrapper {
    display: flex;
    cursor: pointer;
  }

  &-item {
    display: flex;

    @include flex-center();

    .va-rating--disabled & {
      @include va-disabled();

      * {
        cursor: initial !important;
      }
    }

    .va-rating--readonly & * {
      cursor: initial !important;
    }
  }
}
</style>
