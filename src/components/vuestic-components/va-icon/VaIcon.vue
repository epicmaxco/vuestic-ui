<template>
  <!-- HACK Supports only material icons for now! -->
  <component
    :is="tag"
    class="va-icon"
    :class="[name, iconClass, 'material-icons']"
    :style="iconStyle"
  >
    <slot>
      {{ name }}
    </slot>
  </component>
</template>

<script>
import { ColorThemeMixin } from '../../../services/ColorThemePlugin'
import { SizeMixin } from '../../../mixins/SizeMixin'
import { makeContextablePropsMixin } from './../../context-test/context-provide/ContextPlugin'

const IconContextMixin = makeContextablePropsMixin({
  name: {
    type: [String, Array],
    validator: name => {
      if (name.match(/ion-|iconicstroke-|glyphicon-|maki-|entypo-|fa-|brandico-/)) {
        throw new Error(`${name} icon is not available. Please replace to material-icon`)
      }
      return name
    },
    default: '',
  },
  size: {
    type: [String, Number],
    default: 'medium',
  },
  fixedWidth: {
    type: Boolean,
    default: false,
  },
  rotation: {
    type: [String, Number],
    default: '',
  },
  color: {
    type: String,
    default: '',
  },
  tag: {
    type: String,
    default: 'i',
  },
})

export default {
  name: 'VaIcon',
  mixins: [ColorThemeMixin, SizeMixin, IconContextMixin],
  computed: {
    iconClass () {
      return {
        'va-icon--large': this.c_size === 'large',
        'va-icon--small': this.c_size === 'small',
        'va-icon--fixed': this.c_fixedWidth,
      }
    },
    iconStyle () {
      let computedStyles = {
        transform: 'rotate(' + this.c_rotation + 'deg)',
        fontSize: typeof this.c_size === 'number' ? this.c_size + 'px' : this.c_size,
      }

      if (this.c_color && this._isEnableColorTheme) {
        computedStyles.color = this.colorComputed
      }

      return computedStyles
    },
  },
}
</script>

<style lang="scss">
@import "../../vuestic-sass/resources/resources";

.va-icon {
  display: inline-block;
  letter-spacing: normal;
  font-size: initial;

  &--large {
    font-size: $icon-lg-size;
  }

  &--small {
    font-size: $icon-sm-size;
  }

  &--fixed {
    width: $icon-fixed-width;
    text-align: center;
  }
}
</style>
