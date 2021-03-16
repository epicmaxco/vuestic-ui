<template>
  <div
    @mousemove="onHover"
    @mouseleave="removeHover()"
    @focus="onFocus()"
    @blur="onBlur()"
    :tabindex="$props.tabindex"
    class="va-rating-item"
    :class="{
      'va-rating-item__isFocused': isFocused
    }"
    @keyup.enter="onEnter"
  >
    <slot :props="{
      value: valueProxy, onClick
    }">
      <va-icon
        class="va-rating-item__wrapper"
        tabindex="-1"
        :name="computedIconName"
        :size="$props.size"
        tag="button"
        :color="computedColor"
        @click="onClick"
      />
    </slot>
  </div>
</template>

<script lang="ts">
import { watch } from 'vue'
import { Options, prop, Vue, mixins } from 'vue-class-component'

import ColorMixin from '../../../../services/color-config/ColorMixin'
import { RatingValue } from '../VaRating.types'
import VaIcon from '../../va-icon'

class RatingItemProps {
  modelValue = prop<number>({ type: Number, default: 0 })
  filledIconName = prop<string>({ type: String, default: 'star' })
  halfIconName = prop<string>({ type: String, default: 'star_half' })
  emptyIconName = prop<string>({ type: String, default: 'star_empty' })
  halves = prop<boolean>({ type: Boolean, default: false })
  hover = prop<boolean>({ type: Boolean, default: false })
  tabindex = prop<number>({ type: Number })
  size = prop<string | number>({ type: [String, Number], default: 'medium' })
  emptyIconColor = prop<string>({ type: String })
}

const RatingItemPropsMixin = Vue.with(RatingItemProps)

@Options({
  name: 'VaRatingItem',
  components: { VaIcon },
  emits: ['click', 'hover'],
})
export default class VaRatingItem extends mixins(
  ColorMixin,
  RatingItemPropsMixin,
) {
  private isHovered = false
  private isFocused = false
  private shouldEmitClick = false
  private hoveredValue: RatingValue = this.modelValue

  created () {
    watch(() => this.$props.modelValue, (newVal) => {
      this.hoveredValue = newVal as RatingValue
    })
  }

  private get computedIconName (): string {
    if (this.halves && this.valueProxy === RatingValue.HALF) {
      return this.halfIconName
    }
    return this.valueProxy === RatingValue.EMPTY
      ? this.emptyIconName
      : this.filledIconName
  }

  private get computedColor () {
    return this.valueProxy === RatingValue.EMPTY
      ? this.emptyIconColor || this.colorComputed
      : this.colorComputed
  }

  private set valueProxy (value: RatingValue) {
    this.hoveredValue = value
    if (this.shouldEmitClick) {
      this.shouldEmitClick = false
      this.$emit('click', value)
    } else if (this.isHovered) {
      this.$emit('hover', value)
    }
  }

  private get valueProxy (): RatingValue {
    return this.isHovered ? this.hoveredValue : this.modelValue
  }

  private onClick (cursorPosition: MouseEvent) {
    this.shouldEmitClick = true
    this.processCursorInput(this.$el.clientWidth, cursorPosition.offsetX)
  }

  private processCursorInput (iconSize: number, offsetX: number) {
    this.valueProxy = this.halves && (offsetX / iconSize <= RatingValue.HALF)
      ? RatingValue.HALF
      : RatingValue.FULL
  }

  private onEnter () {
    this.shouldEmitClick = true
    this.valueProxy = RatingValue.FULL
  }

  private onHover (cursorPosition: MouseEvent) {
    if (!this.hover) { return }
    this.isHovered = true
    this.processCursorInput(this.$el.clientWidth, cursorPosition.offsetX)
  }

  private onFocus () {
    this.isFocused = true
  }

  private onBlur () {
    this.isFocused = false
  }

  private removeHover () {
    this.valueProxy = this.modelValue
    this.isHovered = false
  }
}
</script>

<style lang="scss">
  @import "../../../vuestic-sass/resources/resources";

  .va-rating-item {
    display: inline-block;

    &__isFocused {
      transform: scale(1.1);
    }

    &__wrapper {
      @include normalize-button();
    }
  }
</style>
