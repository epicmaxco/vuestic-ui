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
import { Component, Mixins } from 'vue-property-decorator'

import { warn } from '../../../services/utils'
import { ColorThemeMixin } from '../../../services/ColorThemePlugin'
import { SizeMixin } from '../../../mixins/SizeMixin'
import { makeContextablePropsMixin } from '../../context-test/context-provide/ContextPlugin'
import { IconMixin } from './IconMixin'

const IconPropsMixin = makeContextablePropsMixin({
  name: {
    type: [String, Array],
    default: '',
    validator: (name: string) => {
      if (name.match(/ion-|iconicstroke-|glyphicon-|maki-|entypo-|fa-|brandico-/)) {
        return warn(`${name} icon is not available.`)
      }
      return true
    },
  },
  tag: { type: String, default: 'i' },
  component: { type: Object },
  color: { type: String, default: '' },
  rotation: { type: [String, Number], default: '' },
  spin: { type: Boolean, default: false },
})

@Component({
  name: 'VaIcon',
})
export default class VaIcon extends Mixins(
  ColorThemeMixin,
  SizeMixin,
  IconMixin,
  IconPropsMixin,
) {
  get computedTag () {
    return (this.icon && this.icon.component) || this.c_component || this.c_tag
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
    return { transform: 'rotate(' + this.c_rotation + 'deg)' }
  }

  get fontSizeStyle () {
    return { fontSize: this.sizeComputed }
  }

  get colorStyle () {
    return { color: this.c_color ? this.colorComputed : null }
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
