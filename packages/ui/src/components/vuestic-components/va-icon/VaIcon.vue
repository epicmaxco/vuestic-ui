<template>
  <component
    :is="computedTag"
    class="va-icon"
    :class="computedClass"
    :style="computedStyle"
    aria-hidden="true"
    notranslate
  >
    <slot>{{ computedContent }}</slot>
  </component>
</template>

<script lang="ts">
import { Mixins, Prop } from 'vue-property-decorator'
import { ColorThemeMixin } from '../../../services/ColorThemePlugin'
import { SizeMixin } from '../../../mixins/SizeMixin'
import { IconMixin } from './IconMixin'
import { Options } from 'vue-class-component'

@Options({
  name: 'VaIcon',
})
export default class VaIcon extends Mixins(
  ColorThemeMixin,
  SizeMixin,
  IconMixin,
) {
  @Prop({ type: String, default: '' }) readonly name!: string
  @Prop({ type: String, default: 'i' }) readonly tag?: string
  @Prop({ type: Object }) readonly component?: object
  @Prop({ type: String, default: '' }) readonly color?: string
  @Prop({
    type: [String, Number],
    default: '',
  }) readonly rotation?: string | number

  @Prop({ type: Boolean, default: false }) readonly spin?: boolean

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
    return this.$attrs && this.$attrs.onClick
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
