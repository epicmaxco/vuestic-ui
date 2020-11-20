<template>
  <va-input-wrapper
    :error="computedError"
    :error-messages="computedErrorMessages"
    :error-count="errorCount"
  >
    <ul
      class="va-option-list__list"
      :id="id"
    >
      <li
        v-for="(option, index) in options"
        :key="getKey(option)"
      >
        <slot
          :props="{
            option, isDisabled, name,
            color, leftLabel, getText,
            selectedValue, index
          }"
        >
          <va-radio
            v-if="type === 'radio'"
            ref="input"
            :option="getValue(option)"
            :disabled="isDisabled(option)"
            :name="name"
            :color="color"
            :left-label="leftLabel"
            :label="getText(option)"
            v-model="selectedValue"
            :tabindex="index"
          />
          <va-checkbox
            v-else-if="type === 'checkbox'"
            ref="input"
            v-model="selectedValue"
            :label="getText(option)"
            :disabled="isDisabled(option)"
            :left-label="leftLabel"
            :array-value="getValue(option)"
            :color="color"
            :name="name"
          />
          <va-switch
            v-else
            ref="input"
            v-model="selectedValue"
            :label="getText(option)"
            :disabled="isDisabled(option)"
            :left-label="leftLabel"
            :array-value="getValue(option)"
            :color="color"
            :name="name"
          />
        </slot>
      </li>
    </ul>
  </va-input-wrapper>
</template>

<script lang="ts">
import { Component, Mixins, Prop } from 'vue-property-decorator'

import VaRadio from '../va-radio'
import VaCheckbox from '../va-checkbox'
import VaSwitch from '../va-switch'
import { VaInputWrapper } from '../va-input'

import { generateUuid } from '../../../services/utils'
import { SelectableListMixin } from '../../vuestic-mixins/SelectableList/SelectableListMixin'
import { StatefulMixin } from '../../vuestic-mixins/StatefulMixin/StatefulMixin'

@Component({
  name: 'VaOptionList',
  components: { VaRadio, VaCheckbox, VaSwitch, VaInputWrapper },
})
export default class VaOptionList extends Mixins(
  SelectableListMixin,
  StatefulMixin,
) {
  @Prop({
    type: String,
    default: 'checkbox',
    validator: (type: any) => ['radio', 'checkbox', 'switch'].includes(type),
  }) type!: string

  @Prop({ type: Boolean, default: false }) disabled!: boolean
  @Prop({ type: Boolean, default: false }) readonly!: boolean
  @Prop({ type: [String, Number, Object, Array] }) defaultValue!: string | number | object | any[]
  @Prop({ type: String, default: generateUuid }) name!: string
  @Prop({ type: String, default: 'primary' }) color!: string
  @Prop({ type: Boolean, default: false }) leftLabel!: boolean
  @Prop({ type: [String, Number, Object, Array] }) value!: string | number | object | any[]

  get isRadio () {
    return this.type === 'radio'
  }

  get selectedValue () {
    const value = this.isRadio ? null : []
    return this.valueComputed || this.defaultValue || value
  }

  set selectedValue (value) {
    if (this.readonly) { return }
    if (this.isRadio) {
      this.valueComputed = this.getValue(value)
    } else {
      this.valueComputed = Array.isArray(value)
        ? value.map(el => this.getValue(el))
        : [this.getValue(value)]
    }
  }

  getKey (option: any) {
    return this.getTrackBy(option)
  }

  isDisabled (option: any) {
    return this.disabled || this.getDisabled(option)
  }

  reset () {
    this.valueComputed = undefined
  }

  focus () {
    const elements = (this as any).$refs.input
    const firstActiveEl = Array.isArray(elements) && elements.find(el => !el.disabled)
    if (firstActiveEl && typeof firstActiveEl.focus === 'function') {
      firstActiveEl.focus()
    }
  }

  mounted () {
    if (!this.valueComputed && this.defaultValue) {
      this.selectedValue = this.defaultValue
    }
  }
}
</script>

<style>
  .va-option-list__list {
    line-height: 1.5;
  }
</style>
