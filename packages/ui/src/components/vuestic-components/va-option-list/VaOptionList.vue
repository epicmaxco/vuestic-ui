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
            :name="c_name"
            :color="c_color"
            :left-label="c_leftLabel"
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
            :left-label="c_leftLabel"
            :array-value="getValue(option)"
            :color="c_color"
            :name="c_name"
          />
          <va-switch
            v-else
            ref="input"
            v-model="selectedValue"
            :label="getText(option)"
            :disabled="isDisabled(option)"
            :left-label="c_leftLabel"
            :array-value="getValue(option)"
            :color="c_color"
            :name="c_name"
          />
        </slot>
      </li>
    </ul>
  </va-input-wrapper>
</template>

<script lang="ts">
import VaRadio from '../va-radio/VaRadio.vue'
import VaCheckbox from '../va-checkbox/VaCheckbox.vue'
import VaSwitch from '../va-switch/VaSwitch.vue'
import VaInputWrapper from '../va-input/VaInputWrapper.vue'
import { SelectableListMixin } from '../../vuestic-mixins/SelectableList/SelectableListMixin'
import { makeContextablePropsMixin } from '../../context-test/context-provide/ContextPlugin'
import { generateUuid } from '../../../services/utils'
import { StatefulMixin } from '../../vuestic-mixins/StatefullMixin/StatefulMixin'
import { Component, Mixins } from 'vue-property-decorator'

const OptionListPropsMixin = makeContextablePropsMixin({
  type: {
    type: String,
    default: 'checkbox',
    validator: (type: any) => ['radio', 'checkbox', 'switch'].includes(type),
  },
  disabled: { type: Boolean, default: false },
  readonly: { type: Boolean, default: false },
  defaultValue: { type: [String, Number, Object, Array] },
  name: { type: String, default: generateUuid },
  color: { type: String, default: 'primary' },
  leftLabel: { type: Boolean, default: false },
  value: { type: [String, Number, Object, Array] },
})

@Component({
  name: 'VaOptionList',
  components: { VaRadio, VaCheckbox, VaSwitch, VaInputWrapper },
})
export default class VaOptionList extends Mixins(
  SelectableListMixin,
  StatefulMixin,
  OptionListPropsMixin,
) {
  get isRadio () {
    return this.type === 'radio'
  }

  get selectedValue () {
    return this.valueComputed || this.c_defaultValue
  }

  set selectedValue (value) {
    if (this.c_readonly) { return }
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
    return this.c_disabled || this.getDisabled(option)
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
    this.isSelectableListComponent = true
    if (!this.valueComputed && this.c_defaultValue) {
      this.selectedValue = this.c_defaultValue
    }
  }
}
</script>

<style>
  .va-option-list__list {
    line-height: 1.5;
  }
</style>
