<template>
  <div>
    <va-icon
      :name="computedIconName"
      :size="c_size"
      :class="{
        'va-icon__isKeyboardFocused': isFocused
      }"
      @click="onClick"
      @mousemove="onHover"
      @mouseleave="removeHover"
      @focus="onFocus"
      @blur="onBlur"
      @keyup.enter="onEnter"
      :tabindex="tabindex"
    />
  </div>
</template>

<script lang='ts'>
import { makeContextablePropsMixin } from '../../context-test/context-provide/ContextPlugin'
import Component, { mixins } from 'vue-class-component'
import VaIcon from '../va-icon/VaIcon.vue'
import { Watch } from 'vue-property-decorator'

const RatingItemPropsMixin = makeContextablePropsMixin({
  value: { type: Number, default: 0 },
  filledIconName: { type: String, default: 'star' },
  halfIconName: { type: String, default: 'star_half' },
  emptyIconName: { type: String, default: 'star_empty' },
  halves: { type: Boolean, default: false },
  hover: { type: Boolean, default: false },
  tabindex: { type: Number, default: 0 },
  size: {
    type: String,
    default: 'medium',
    validator: (v: string) => ['medium', 'small', 'large'].includes(v),
  },
})

type IconValue = 0 | 0.5 | 1

@Component({
  name: 'VaRatingItem',
  components: { VaIcon },
})
export default class VaRatingItem extends mixins(RatingItemPropsMixin) {
  private isHovered = false
  private isFocused = false
  private shouldEmitClick = false
  private hoveredValue: IconValue = this.value

  private get computedIconName (): string {
    if (this.halves && this.valueProxy === 0.5) {
      return this.halfIconName
    }
    return this.valueProxy === 0 ? this.emptyIconName : this.filledIconName
  }

  @Watch('value')
  private onValueChange (newVal: IconValue) {
    this.hoveredValue = newVal
  }

  private set valueProxy (value: IconValue) {
    this.hoveredValue = value
    if (this.shouldEmitClick) {
      this.shouldEmitClick = false
      this.$emit('click', value)
    } else if (this.isHovered) {
      this.$emit('hover', value)
    }
  }

  private get valueProxy (): IconValue {
    return this.isHovered ? this.hoveredValue : this.value
  }

  private onClick (cursorPosition: MouseEvent) {
    this.shouldEmitClick = true
    this.proccessCursorInput(this.$el.clientHeight, cursorPosition.offsetX)
  }

  private proccessCursorInput (iconSize: number, offsetX: number) {
    this.valueProxy = this.halves && (iconSize / offsetX >= 2) ? 0.5 : 1
  }

  private processKeyboardInput () {
    // const currentValue = this.valueProxy
    // if (onEnter) {
    //   this.shouldEmitClick = true
    //   // setting the same value to trigger $emit
    //   this.valueProxy = currentValue
    //   return
    // }

    // this.valueProxy = this.halves
    //   ? this.valueProxy === 0 ? 0.5 : 1
    //   : 1
  }

  private onEnter () {
    this.shouldEmitClick = true
    this.valueProxy = 1
  }

  private calcIconValue (iconSize: number, offsetX: number): IconValue {
    return this.halves && (iconSize / offsetX >= 2) ? 0.5 : 1
  }

  private onHover (cursorPosition: MouseEvent) {
    if (!this.hover) return
    this.isHovered = true
    this.proccessCursorInput(this.$el.clientHeight, cursorPosition.offsetX)
  }

  private onFocus () {
    this.isFocused = true
  }

  private onBlur () {
    this.isFocused = false
  }

  private removeHover () {
    this.hoveredValue = this.value
    this.isHovered = false
  }
}
</script>

<style lang="scss">
  .va-icon__isKeyboardFocused {
    transform: scale(1.1);
  }
</style>
