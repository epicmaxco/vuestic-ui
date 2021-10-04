<template>
  <div class="va-button-group" :style="computedStyle" :class="computedClass">
    <va-config :components="context.buttonConfig">
      <slot />
    </va-config>
  </div>
</template>

<script lang="ts">
import { Vue, Options, prop, setup } from 'vue-class-component'
import VaConfig from '../va-config'
import { reactive } from 'vue'
import { getGradientBackground } from '../../services/color-config/color-functions'
import { getColor } from '../../services/color-config/color-config'

class Props {
  color = prop<string>({ type: String, default: 'primary' })
  gradient = prop<boolean>({ type: Boolean, default: undefined })
  textColor = prop<string>({ type: String, default: undefined })
  rounded = prop<boolean>({ type: Boolean, default: true })
  outline = prop<boolean>({ type: Boolean, default: false })
  flat = prop<boolean>({ type: Boolean, default: false })
  size = prop<string>({
    type: String,
    default: 'medium',
    validator: (v: string) => ['medium', 'small', 'large'].includes(v),
  })
}

@Options({
  name: 'VaButtonGroup',
  components: { VaConfig },
})
export default class VaButtonGroup extends Vue.with(Props) {
  context = setup(() => {
    const buttonConfig = reactive({
      VaButton: {
        ...this.$props,
        color: this.gradient ? '#00000000' : this.color,
      },
    })
    return { getColor, buttonConfig }
  })

  get computedBackground () {
    if (this.outline || this.flat) {
      return ''
    }

    const color = this.context.getColor(this.color)
    if (this.gradient) {
      return getGradientBackground(color)
    }
    return color
  }

  get computedStyle () {
    const backgroundProperty = this.gradient ? 'background-image' : 'background'
    return {
      [backgroundProperty]: this.computedBackground,
    }
  }

  get computedClass () {
    return {
      'va-button-group_square': !this.rounded,
    }
  }
}
</script>

<style lang="scss">
@import "../../styles/resources/resources";
@import "variables";

.va-button-group {
  display: flex;
  justify-content: stretch;
  width: max-content;
  overflow: hidden;
  border-radius: 9999999px;

  &_square {
    border-radius: var(--va-button-square-border-radius);
  }

  .va-button {
    margin: var(--va-button-group-button-margin);
    box-shadow: none !important;
  }

  & > .va-button:last-child {
    width: auto;
    padding-right: 1rem !important;

    &.va-button--small {
      padding-right: 0.75rem !important;
    }

    &.va-button--large {
      padding-right: 1.5rem !important;
    }
  }

  & > .va-button:first-child {
    width: auto;
    padding-left: 1rem;

    &.va-button--small {
      padding-left: 0.75rem;
    }

    &.va-button--large {
      padding-left: 1.5rem;
    }
  }

  & > .va-button:not(:last-child) {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    padding-right: 0.5rem;
    border-right: 0;

    .va-button__content {
      /**
        We need to prevent minus margin because we had:
          border-right: 2px;
          maring-right: -2px;
      */
      margin-right: 0;
    }
  }

  & > .va-button + .va-button {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    padding-left: 0.5rem;
    border-left: 0;

    .va-button__content {
      /**
        We need to prevent minus margin because we had:
          border-left: 2px;
          maring-left: -2px;
      */
      margin-left: 0;
    }
  }
}
</style>
