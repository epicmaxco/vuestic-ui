<template>
  <div class="va-button-toggle">
    <va-button-group
      :color="color"
      :textColor="textColor"
      :rounded="rounded"
      :outline="outline"
      :flat="flat"
      :gradient="gradient"
    >
      <va-button
        v-for="option in options"
        v-bind="buttonProps(option.value)"
        :key="option.value"
        :disabled="disabled"
        :size="size"
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

import {
  getFocusColor, getTextColor,
  shiftHSLAColor,
} from '../../services/color-config/color-functions'
import ColorMixin from '../../services/color-config/ColorMixin'
import VaButton from '../va-button'
import VaButtonGroup from '../va-button-group'

class ButtonToggleProps {
  options = prop<any[]>({ type: Array, default: () => [] })
  color = prop<string>({ type: String, default: 'primary' })
  textColor = prop<string>({ type: String, default: undefined })
  activeButtonTextColor = prop<string>({ type: String, default: '#fff' })
  modelValue = prop<string | number>({ type: [String, Number], default: '' })
  outline = prop<boolean>({ type: Boolean, default: false })
  flat = prop<boolean>({ type: Boolean, default: false })
  rounded = prop<boolean>({ type: Boolean, default: true })
  disabled = prop<boolean>({ type: Boolean, default: false })
  size = prop<string>({
    type: String,
    default: 'medium',
    validator: (modelValue: string) => {
      return ['medium', 'small', 'large'].includes(modelValue)
    },
  })

  toggleColor = prop<string>({ type: String, default: '' })
  gradient = prop<boolean>({ type: Boolean, default: false })
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

  buttonProps (buttonValue: any) {
    if (buttonValue !== this.modelValue) { return }

    if (this.outline || this.flat) {
      return {
        textColor: this.activeButtonTextColor,
        color: this.toggleColor ? this.theme.getColor(this.toggleColor) : this.colorComputed,
        outline: false,
        flat: false,
      }
    }

    return {
      textColor: this.activeButtonTextColor ? this.activeButtonTextColor : getTextColor(this.colorComputed),
      color: this.toggleColor ? this.theme.getColor(this.toggleColor) : shiftHSLAColor(this.colorComputed, { l: -6 }),
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

<style lang="scss">
.va-button-toggle {
  .va-button {
    &:focus,
    &:hover {
      box-shadow: none !important;
    }
  }
}
</style>
