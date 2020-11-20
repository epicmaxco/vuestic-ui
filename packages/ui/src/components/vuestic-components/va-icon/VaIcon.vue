<template>
  <component
    :is="computedTag"
    class="va-icon"
    :class="computedClass"
    :style="computedStyle"
    aria-hidden="true"
    notranslate
    v-on="$listeners"
  >
    <slot>{{ computedContent }}</slot>
  </component>
</template>

<script lang="ts">
import { Component, Mixins, Prop } from 'vue-property-decorator'

import { warn } from '../../../services/utils'
import { ColorThemeMixin } from '../../vuestic-mixins/ColorMixin'
import { SizeMixin } from '../../../mixins/SizeMixin'
import { IconMixin } from './IconMixin'

@Component({
  name: 'VaIcon',
})
export default class VaIcon extends Mixins(
  ColorThemeMixin,
  SizeMixin,
  IconMixin,
) {
  @Prop({
    type: String,
    default: '',
    validator: (name: string) => {
      if (name.match(/ion-|iconicstroke-|glyphicon-|maki-|entypo-|fa-|brandico-/)) {
        return warn(`${name} icon is not available.`)
      }
      return true
    },
  }) readonly name!: string

  @Prop({ type: String, default: 'i' }) tag!: string
  @Prop({ type: Object }) component!: object
  @Prop({ type: String, default: '' }) color!: string
  @Prop({ type: [String, Number], default: '' }) rotation!: string | number
  @Prop({ type: Boolean, default: false }) spin!: boolean

  get computedTag () {
    return (this.icon && this.icon.component) || this.component || this.tag
  }

  get computedClass () {
    return [
      this.icon ? this.icon.iconClass : '',
      this.spin ? 'va-icon--spin' : '',
    ]
  }

  get hasClickListener () {
    return this.$listeners && this.$listeners.click
  }

  get cursorStyle () {
    return { cursor: this.hasClickListener ? 'pointer' : null }
  }

  get rotateStyle () {
    return { transform: 'rotate(' + this.rotation + 'deg)' }
  }

  get fontSizeStyle () {
    return { fontSize: this.sizeComputed }
  }

  get colorStyle () {
    return { color: this.color ? this.colorComputed : null }
  }

  get computedStyle () {
    return {
      ...this.cursorStyle,
      ...this.rotateStyle,
      ...this.fontSizeStyle,
      ...this.colorStyle,
    }
  }

  get computedContent () {
    return this.icon && this.icon.content
  }
}
</script>

<style lang="scss">
.va-icon {
  vertical-align: middle;
  user-select: none;

  &#{&} {
    // need 2 classes to make it work
    font-style: normal;
  }

  &--spin {
    animation: va-icon--spin-animation 1500ms linear infinite;
  }

  @keyframes va-icon--spin-animation {
    from {
      transform: rotate(0deg);
    }

    to {
      transform: rotate(360deg);
    }
  }
}
</style>
