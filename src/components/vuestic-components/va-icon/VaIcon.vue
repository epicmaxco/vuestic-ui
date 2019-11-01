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
import { ContextPluginMixin, getContextPropValue } from './../../context-test/context-provide/ContextPlugin'

export default {
  name: 'VaIcon',
  mixins: [ColorThemeMixin, SizeMixin, ContextPluginMixin],
  props: {
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
      default () {
        return getContextPropValue(this, 'size', 'medium')
      },
    },
    fixedWidth: {
      type: Boolean,
      default () {
        return getContextPropValue(this, 'fixedWidth', false)
      },
    },
    rotation: {
      type: [String, Number],
      default () {
        return getContextPropValue(this, 'rotation', '')
      },
    },
    color: {
      type: String,
      default () {
        return getContextPropValue(this, 'color', '')
      },
    },
    tag: {
      type: String,
      default () {
        return getContextPropValue(this, 'tag', 'i')
      },
    },
  },
  computed: {
    iconClass () {
      return {
        'va-icon--large': this.size === 'large',
        'va-icon--small': this.size === 'small',
        'va-icon--fixed': this.fixedWidth,
      }
    },
    iconStyle () {
      let computedStyles = {
        transform: 'rotate(' + this.rotation + 'deg)',
        fontSize: typeof this.size === 'number' ? this.size + 'px' : this.size,
      }

      if (this.color && this._isEnableColorTheme) {
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
