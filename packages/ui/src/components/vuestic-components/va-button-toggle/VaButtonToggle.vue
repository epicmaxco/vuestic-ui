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
import { Component, Mixins, Prop } from 'vue-property-decorator'

import VaButton from '../va-button/VaButton.vue'
import VaButtonGroup from '../va-button-group/VaButtonGroup.vue'

import { getGradientBackground } from '../../../services/color-functions'
import { ColorThemeMixin } from '../../vuestic-mixins/ColorMixin'

@Component({
  name: 'VaButtonToggle',
  components: {
    VaButtonGroup,
    VaButton,
  },
})
export default class VaButtonToggle extends Mixins(
  ColorThemeMixin,
) {
  @Prop({ type: Array, default: () => [] }) readonly options!: string
  @Prop({ type: [String, Number], default: '' }) readonly value!: string
  @Prop({ type: Boolean, default: false }) readonly outline!: string
  @Prop({ type: Boolean, default: false }) readonly flat!: string
  @Prop({ type: Boolean, default: true }) readonly round!: string
  @Prop({ type: Boolean, default: false }) readonly disabled!: string
  @Prop({
    type: String,
    default: 'medium',
    validator: (value: string) => {
      return ['medium', 'small', 'large'].includes(value)
    },
  }) readonly size!: string

 @Prop({ type: String, default: '' }) readonly toggleColor!: string

 buttonColor (buttonValue: any) {
   return buttonValue === this.value && this.toggleColor ? (this as any).getColor(this.toggleColor) : this.colorComputed
 }

 buttonStyle (buttonValue: any) {
   if (buttonValue !== this.value) {
     return {}
   }

   if (this.outline || this.flat) {
     return {
       backgroundColor: this.toggleColor ? (this as any).getColor(this.toggleColor) : this.colorComputed,
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
     'va-button--active': buttonValue === this.value,
   }
 }

 changeValue (value: any) {
   this.$emit('input', value)
 }
}
</script>
