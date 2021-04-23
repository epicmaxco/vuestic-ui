<template>
  <div class="va-button-group" :style="computedStlye" :class="computedClass">
    <va-config :components="context.buttonConfig">
      <slot />
    </va-config>
  </div>
</template>

<script lang="ts">
import { Vue, Options, prop, setup } from 'vue-class-component'
import VaConfig from '../va-config'
import { reactive } from 'vue'
import { getGradientBackground } from '../../../services/color-config/color-functions'
import { getColor } from '../../../services/color-config/color-config'

class Props {
  color = prop<string>({ type: String, default: 'primary' });
  textColor = prop<string>({ type: String, default: undefined });
  round = prop<boolean>({ type: Boolean, default: true });
  outline = prop<boolean>({ type: Boolean, default: false });
  flat = prop<boolean>({ type: Boolean, default: false });
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
    const isTransparentBackground = this.outline || this.flat
    const buttonConfig = reactive({
      VaButton: {
        ...this.$props,
        color: isTransparentBackground ? this.color : '#00000000',
      },
    })

    return { getColor, buttonConfig }
  });

  get computedGradiend () {
    if (this.outline || this.flat) {
      return ''
    }

    const color = this.context.getColor(this.color)

    return getGradientBackground(color)
  }

  get computedStlye () {
    return {
      'background-image': this.computedGradiend,
    }
  }

  get computedClass () {
    return {
      'va-button-group_square': !this.round,
    }
  }
}
</script>

<style lang="scss">
@import "../../vuestic-sass/resources/resources";
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
  }

  & > .va-button + .va-button {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    padding-left: 0.5rem;
    border-left: 0;
  }
}
</style>
