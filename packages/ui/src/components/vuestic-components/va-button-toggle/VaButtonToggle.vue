<template>
  <div class="va-button-toggle">
    <va-button-group>
      <va-button
        v-for="option in options"
        :key="option.value"
        :style="buttonStyle(option.value)"
        :outline="outline"
        :flat="flat"
        :round="round"
        :disabled="disabled"
        :size="size"
        :color="buttonColor(option.value)"
        :class="buttonClass(option.value)"
        @click="changeValue(option.value)"
      >
        {{ option.label }}
      </va-button>
    </va-button-group>
  </div>
</template>

<script lang="ts">
import { Options, prop, mixins, Vue } from 'vue-class-component'

import { getGradientBackground } from '../../../services/color-config/color-functions'
import ColorMixin from '../../../services/color-config/ColorMixin'
import VaButton from '../va-button'
import VaButtonGroup from '../va-button-group'

class ButtonToggleProps {
  options = prop<any[]>({ type: Array, default: () => [] })
  modelValue = prop<string | number>({ type: [String, Number], default: '' })
  outline = prop<boolean>({ type: Boolean, default: false })
  flat = prop<boolean>({ type: Boolean, default: false })
  round = prop<boolean>({ type: Boolean, default: true })
  disabled = prop<boolean>({ type: Boolean, default: false })
  size = prop<string>({
    type: String,
    default: 'medium',
    validator: (modelValue: string) => {
      return ['medium', 'small', 'large'].includes(modelValue)
    },
  })

  toggleColor = prop<string>({ type: String, default: '' })
}

const ButtonTogglePropsMixin = Vue.with(ButtonToggleProps)

@Options({
  name: 'VaButtonToggle',
  components: {
    VaButtonGroup,
    VaButton,
  },
  emits: ['update:modelValue'],
})
export default class VaButtonToggle extends mixins(
  ColorMixin,
  ButtonTogglePropsMixin,
) {
  buttonColor (buttonValue: any) {
    return buttonValue === this.modelValue && this.toggleColor ? this.toggleColor : this.color
  }

  buttonStyle (buttonValue: any) {
    if (buttonValue !== this.modelValue) {
      return {}
    }

    if (this.outline || this.flat) {
      return {
        backgroundColor: this.toggleColor ? this.theme.getColor(this.toggleColor) : this.colorComputed,
        color: '#ffffff',
      }
    } else {
      return {
        backgroundColor: getGradientBackground(this.colorComputed),
        filter: 'brightness(85%)',
        boxShadow: 'none',
      }
    }
  }

  buttonClass (buttonValue: any) {
    return {
      'va-button--active': buttonValue === this.modelValue,
    }
  }

  changeValue (value: any) {
    this.$emit('update:modelValue', value)
  }
}
</script>
