<template>
  <div class="va-button-toggle">
    <va-button-group>
      <va-button
        v-for="option in options"
        :key="option.value"
        :style="buttonStyle(option.value)"
        :outline="c_outline"
        :flat="c_flat"
        :round="c_round"
        :disabled="c_disabled"
        :size="c_size"
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

const PropsMixin = makeContextablePropsMixin({
  options: { type: Array, default: () => [] },
  modelValue: { type: [String, Number], default: '' },
  outline: { type: Boolean, default: false },
  flat: { type: Boolean, default: false },
  round: { type: Boolean, default: true },
  disabled: { type: Boolean, default: false },
  size: {
    type: String,
    default: 'medium',
    validator: (modelValue: string) => {
      return ['medium', 'small', 'large'].includes(modelValue)
    },
  },
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
  ColorThemeMixin,
  PropsMixin,
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
        backgroundColor: this.c_toggleColor ? getColor(this, this.c_toggleColor) : this.colorComputed,
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
      'va-button--active': buttonValue === this.c_modelValue,
    }
  }

  changeValue (value: any) {
    this.$emit('update:modelValue', value)
  }
}
</script>
