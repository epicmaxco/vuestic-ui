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
import { Options, mixins, prop, Vue, setup } from 'vue-class-component'
import ColorMixin from '../../../services/color-config/ColorMixin'
import { SizeMixin } from '../../../mixins/SizeMixin'
import { setupIcons } from '../../../services/icon-config/setup'

class Props {
  name = prop<string>({ type: String, default: '' })
  tag = prop<string>({ type: String, default: 'i' })
  component = prop<Record<string, any>>({ type: Object })
  color = prop<string>({ type: String, default: undefined })
  rotation = prop<number | string>({ type: [String, Number], default: undefined })
  spin = prop<string>({ type: String, default: undefined })
}

const PropsMixin = Vue.with(Props)

@Options({
  name: 'VaIcon',
})
export default class VaIcon extends mixins(
  ColorMixin,
  SizeMixin,
  PropsMixin,
) {
  iconContext = setup(() => setupIcons(this.$props))

  get icon () {
    return this.iconContext.getIcon(this.name)
  }

  get computedTag () {
    return (this.icon && this.icon.component) || this.component || this.tag
  }

  get spinClass () {
    if (this.spin === undefined) { return }
    return this.spin === 'counter-clockwise' ? 'va-icon--spin-reverse' : 'va-icon--spin'
  }

  get computedClass () {
    return [
      this.icon ? this.icon.iconClass : '',
      this.spinClass,
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
    return { color: this.color !== undefined ? this.colorComputed : this.icon.color }
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
