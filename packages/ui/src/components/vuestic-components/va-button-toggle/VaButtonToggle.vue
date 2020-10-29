<template>
  <div class="va-button-toggle">
    <va-button-group>
      <va-button
        v-for="option in options"
        :key="option.value"
        :style="buttonStyle(option.value)"
        :outline="outline"
        :flat="flat"
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
import { Mixins } from 'vue-property-decorator'

import VaButton from '../va-button/VaButton.vue'
import VaButtonGroup from '../va-button-group/VaButtonGroup.vue'

import { getGradientBackground } from '../../../services/color-functions'
import { makeContextablePropsMixin } from '../../context-test/context-provide/ContextPlugin'
import { Options } from 'vue-class-component'

const ButtonTogglePropsMixin = makeContextablePropsMixin({
  options: { type: Array, default: () => [] },
  modelValue: { type: [String, Number], default: '' },
  outline: { type: Boolean, default: false },
  flat: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  size: {
    type: String,
    default: 'medium',
    validator: (modelValue: string) => {
      return ['medium', 'small', 'large'].includes(modelValue)
    },
  },
  color: { type: String, default: 'success' },
  toggleColor: { type: String, default: '' },
})

@Options({
  name: 'VaButtonToggle',
  components: {
    VaButtonGroup,
    VaButton,
  },
  emits: ['update:modelValue'],
})
export default class VaButtonToggle extends Mixins(
  ButtonTogglePropsMixin,
) {
  buttonColor (buttonValue: any) {
    return buttonValue === this.c_modelValue && this.c_toggleColor ? this.c_toggleColor : this.c_color
  }

  buttonStyle (buttonValue: any) {
    if (buttonValue !== this.c_modelValue) {
      return {}
    }

    if (this.c_outline || this.c_flat) {
      return {
        backgroundColor: (this as any).$themes[this.c_toggleColor ? this.c_toggleColor : this.c_color],
        color: '#ffffff',
      }
    } else {
      return {
        backgroundColor: getGradientBackground((this as any).$themes[this.c_color]),
        filter: 'brightness(85%)',
      }
    }
  }

  buttonClass (buttonValue: any) {
    return {
      'va-button--active': buttonValue === this.c_modelValue,
    }
  }

  changeValue (value: any) {
    this.$emit('update:modelValue', value)
  }
}
</script>
