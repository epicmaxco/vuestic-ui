<template>
  <div
    @mousemove="onHover"
    @mouseleave="removeHover()"
    @focus="onFocus()"
    @blur="onBlur()"
    :tabindex="tabindex"
    class="va-rating-item"
    :class="{
      'va-rating-item__isFocused': isFocused
    }"
    @keyup.enter="onEnter"
  >
    <slot :props="{
      value: valueProxy, onClick
    }">
      <button class="va-rating-item__wrapper" tabindex="-1">
        <va-icon
          :name="computedIconName"
          :size="size"
          :color="computedColor"
          @click="onClick"
        />
      </button>
    </slot>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { ColorThemeMixin } from '../../../services/ColorThemePlugin'
import Component, { mixins } from 'vue-class-component'
import VaIcon from '../va-icon/VaIcon.vue'
import { Watch } from 'vue-property-decorator'
import { RatingItemValue } from './VaRating.types'

const RatingItemProps = Vue.extend({
  props: {
    value: { type: Number, default: 0 },
    filledIconName: { type: String, default: 'star' },
    halfIconName: { type: String, default: 'star_half' },
    emptyIconName: { type: String, default: 'star_empty' },
    halves: { type: Boolean, default: false },
    hover: { type: Boolean, default: false },
    tabindex: { type: Number },
    size: { type: [String, Number], default: 'medium' },
    emptyIconColor: { type: String },
  },
})

@Component({
  name: 'VaRatingItem',
  components: { VaIcon },
})
export default class VaRatingItem extends mixins(RatingItemProps, ColorThemeMixin) {
  private isHovered = false
  private isFocused = false
  private shouldEmitClick = false
  private hoveredValue: RatingItemValue = this.value as RatingItemValue

  private get computedIconName (): string {
    if (this.halves && this.valueProxy === 0.5) {
      return this.halfIconName
    }
    return this.valueProxy === 0 ? this.emptyIconName : this.filledIconName
  }

  private get computedColor () {
    return this.valueProxy === 0
      ? this.emptyIconColor || this.colorComputed
      : this.colorComputed
  }

  @Watch('value')
  private onValueChange (newVal: RatingItemValue) {
    this.hoveredValue = newVal
  }

  private set valueProxy (value: RatingItemValue) {
    this.hoveredValue = value
    if (this.shouldEmitClick) {
      this.shouldEmitClick = false
      this.$emit('click', value)
    } else if (this.isHovered) {
      this.$emit('hover', value)
    }
  }

  private get valueProxy (): RatingItemValue {
    return this.isHovered ? this.hoveredValue : this.value as RatingItemValue
  }

  private onClick (cursorPosition: MouseEvent) {
    this.shouldEmitClick = true
    this.proccessCursorInput(this.$el.clientWidth, cursorPosition.offsetX)
  }

  private proccessCursorInput (iconSize: number, offsetX: number) {
    this.valueProxy = this.halves && (offsetX / iconSize <= 0.5) ? 0.5 : 1
  }

  private onEnter () {
    this.shouldEmitClick = true
    this.valueProxy = 1
  }

  private onHover (cursorPosition: MouseEvent) {
    if (!this.hover) return
    this.isHovered = true
    this.proccessCursorInput(this.$el.clientWidth, cursorPosition.offsetX)
  }

  private onFocus () {
    this.isFocused = true
  }

  private onBlur () {
    this.isFocused = false
  }

  private removeHover () {
    this.valueProxy = this.value as RatingItemValue
    this.isHovered = false
  }
}
</script>

<style lang="scss">
  @import "../../vuestic-sass/resources/resources";

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
