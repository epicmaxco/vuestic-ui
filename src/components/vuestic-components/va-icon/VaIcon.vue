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

<script>
import { ColorThemeMixin } from '../../../services/ColorThemePlugin'
import { SizeMixin } from '../../../mixins/SizeMixin'
import { makeContextablePropsMixin } from '../../context-test/context-provide/ContextPlugin'
import vaIconMixin from './vaIconMixin'
import { warn } from '../../../services/utils'

const IconContextMixin = makeContextablePropsMixin({
  name: {
    type: [String, Array],
    validator: name => {
      if (name.match(/ion-|iconicstroke-|glyphicon-|maki-|entypo-|fa-|brandico-/)) {
        // eslint-disable-next-line  no-console
        return warn(`${name} icon is not available.`)
      }
      return true
    },
    default: '',
  },
  tag: {
    type: String,
    default: 'i',
  },
  component: {
    type: Object,
  },
  color: {
    type: String,
    default: '',
  },
  rotation: {
    type: [String, Number],
    default: '',
  },
  spin: {
    type: Boolean,
    default: false,
  },
})

export default {
  name: 'VaIcon',
  mixins: [ColorThemeMixin, SizeMixin, IconContextMixin, vaIconMixin],
  computed: {
    icon () {
      return this.getIcon()
    },
    computedTag () {
      return (this.icon && this.icon.component) || this.c_component || this.c_tag
    },
    computedClass () {
      return `${this.icon && this.icon.iconClass} ${this.spin && 'va-icon--spin'}`
    },
    hasClickListener () {
      return this.$listeners && this.$listeners.click
    },
    cursorStyle () {
      return { cursor: this.hasClickListener ? 'pointer' : null }
    },
    rotateStyle () {
      return { transform: 'rotate(' + this.c_rotation + 'deg)' }
    },
    fontSizeStyle () {
      return { fontSize: this.sizeComputed }
    },
    colorStyle () {
      return { color: this.c_color ? this.colorComputed : null }
    },
    computedStyle () {
      return {
        ...this.cursorStyle,
        ...this.rotateStyle,
        ...this.fontSizeStyle,
        ...this.colorStyle,
      }
    },
    computedContent () {
      return this.icon && this.icon.content
    },
  },
}
</script>

<style lang="scss">
.va-icon {
  vertical-align: middle;
  user-select: none;

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
