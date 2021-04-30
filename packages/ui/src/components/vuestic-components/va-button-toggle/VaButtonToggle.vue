<template>
  <div class="va-button-toggle">
    <va-button-group
      :color="buttonGroupColor"
      :textColor="textColor"
      :rounded="rounded"
      :outline="outline"
      :flat="flat"
    >
      <va-button
        v-for="option in options"
        :key="option.value"
        :style="buttonStyle(option.value)"
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
  getFocusColor,
  shiftHSLAColor,
} from '../../../services/color-config/color-functions'
import ColorMixin from '../../../services/color-config/ColorMixin'
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
  get buttonGroupColor () {
    return this.color
  }

  buttonColor (buttonValue: any) {
    return buttonValue === this.modelValue && this.toggleColor ? this.toggleColor : this.color
  }

  buttonStyle (buttonValue: any) {
    if (buttonValue !== this.modelValue) {
      return { backgroundColor: 'transparent' }
    }

    if (this.outline || this.flat) {
      return {
        backgroundColor: this.toggleColor ? this.theme.getColor(this.toggleColor) : this.colorComputed,
        color: this.$props.activeButtonTextColor,
      }
    } else {
      return {
        backgroundColor: shiftHSLAColor(this.colorComputed, { l: -6 }),
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
