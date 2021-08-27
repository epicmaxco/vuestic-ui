<template>
  <component
    v-bind="computedAttrs"
    aria-hidden="true"
    notranslate
    class="va-icon"
    :is="computedTag"
    :class="computedClass"
    :style="computedStyle"
  >
    <slot>{{ computedContent }}</slot>
  </component>
</template>

<script lang="ts">
import { Options, mixins, prop, Vue, setup } from 'vue-class-component'
import ColorMixin from '../../services/color-config/ColorMixin'
import { SizeMixin } from '../../mixins/SizeMixin'
import { useIcons } from '../../services/icon-config/icon-config'

class IconProps {
  name = prop<string>({ type: String, default: '' })
  tag = prop<string>({ type: String })
  component = prop<Record<string, any>>({ type: Object })
  color = prop<string>({ type: String, default: undefined })
  rotation = prop<number | string>({ type: [String, Number], default: undefined })
  spin = prop<string | boolean>({ type: [String, Boolean], default: undefined })
}

const IconPropsMixin = Vue.with(IconProps)

@Options({
  name: 'VaIcon',
})
export default class VaIcon extends mixins(
  ColorMixin,
  SizeMixin,
  IconPropsMixin,
) {
  iconContext = setup(() => useIcons(this.$props))

  get iconConfig () {
    return this.iconContext.getIcon(this.name)
  }

  get computedTag () {
    return this.$props.component || this.$props.tag || this.iconConfig.component || this.iconConfig.tag || 'i'
  }

  get computedAttrs () {
    return { ...this.iconConfig.attrs, ...this.$attrs }
  }

  get computedClass () {
    const spin = this.$props.spin === undefined ? this.iconConfig.spin : this.$props.spin

    return [
      this.iconConfig.class,
      this.getSpinClass(spin),
    ]
  }

  getSpinClass (spin?: string | boolean) {
    if (spin === undefined) { return }
    return spin === 'counter-clockwise' ? 'va-icon--spin-reverse' : 'va-icon--spin'
  }

  get computedStyle () {
    return {
      transform: this.rotation && 'rotate(' + this.rotation + 'deg)',
      cursor: this.$attrs.onClick ? 'pointer' : null,
      color: this.$props.color !== undefined ? this.colorComputed : this.iconConfig.color,
      // TODO: change this to 'fontSize: this.sizeComputed' when global config issue #1054 will be resolved
      fontSize: this.$props.size === '' ? '24px' : this.sizeComputed,
    }
  }

  get computedContent () {
    return this.iconConfig.content
  }
}
</script>

<style lang="scss">
@import 'variables';

.va-icon {
  vertical-align: var(--va-icon-vertical-align);
  user-select: var(--va-icon-user-select);

  &#{&} {
    // need 2 classes to make it work
    font-style: normal;
  }

  &--spin {
    animation: va-icon--spin-animation 1500ms linear infinite;

    &-reverse {
      animation: va-icon--spin-animation 1500ms linear infinite;
      animation-direction: reverse;
    }
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
