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
import { Component, Mixins } from 'vue-property-decorator'

import VaButton from '../va-button/VaButton.vue'
import VaButtonGroup from '../va-button-group/VaButtonGroup.vue'

import { getGradientBackground } from '../../../services/color-functions'
import { makeContextablePropsMixin } from '../../context-test/context-provide/ContextPlugin'
import { ColorThemeMixin, getColor } from '../../../services/ColorThemePlugin'

const PropsMixin = makeContextablePropsMixin({
  options: { type: Array, default: () => [] },
  value: { type: [String, Number], default: '' },
  outline: { type: Boolean, default: false },
  flat: { type: Boolean, default: false },
  round: { type: Boolean, default: true },
  disabled: { type: Boolean, default: false },
  size: {
    type: String,
    default: 'medium',
    validator: (value: string) => {
      return ['medium', 'small', 'large'].includes(value)
    },
  },
  toggleColor: { type: String, default: '' },
})

@Component({
  name: 'VaButtonToggle',
  components: {
    VaButtonGroup,
    VaButton,
  },
})
export default class VaButtonToggle extends Mixins(
  ColorThemeMixin,
  PropsMixin,
) {
  buttonColor (buttonValue: any) {
    return buttonValue === this.c_value && this.c_toggleColor ? getColor(this, this.c_toggleColor) : this.colorComputed
  }

  buttonStyle (buttonValue: any) {
    if (buttonValue !== this.c_value) {
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
      'va-button--active': buttonValue === this.c_value,
    }
  }

  changeValue (value: any) {
    this.$emit('input', value)
  }
}
</script>
