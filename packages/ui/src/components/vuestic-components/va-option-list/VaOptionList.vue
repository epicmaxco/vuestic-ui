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

<script>
import VaRadio from '../va-radio/VaRadio'
import VaCheckbox from '../va-checkbox/VaCheckbox'
import VaSwitch from '../va-switch/VaSwitch'
import VaInputWrapper from '../va-input/VaInputWrapper'
import { SelectableListMixin } from '../../vuestic-mixins/SelectableList/SelectableListMixin'
import { makeContextablePropsMixin } from '../../context-test/context-provide/ContextPlugin'
import { generateUuid } from '../../../services/utils'

export default {
  name: 'VaOptionList',
  components: { VaRadio, VaCheckbox, VaSwitch, VaInputWrapper },
  mixins: [
    SelectableListMixin,
    makeContextablePropsMixin({
      type: {
        type: String,
        default: 'checkbox',
        validator: type => ['radio', 'checkbox', 'switch'].includes(type),
      },
      disabled: { type: Boolean, default: false },
      readonly: { type: Boolean, default: false },
      defaultValue: { type: [String, Number, Object, Array] },
      name: { type: String, default: generateUuid },
      color: { type: String, default: 'primary' },
      leftLabel: { type: Boolean, default: false },
      value: { type: [String, Number, Object, Array] },
    }),
  ],
  methods: {
    getKey (option) {
      return this.getTrackBy(option)
    },
    isDisabled (option) {
      return this.c_disabled || this.getDisabled(option)
    },
    reset () {
      this.$emit('input', undefined)
    },
    focus () {
      const elements = this.$refs.input
      const firstActiveEl = Array.isArray(elements) && elements.find(el => !el.disabled)
      if (firstActiveEl && typeof firstActiveEl.focus === 'function') {
        firstActiveEl.focus()
      }
    },
  },
  mounted () {
    this.isSelectableListComponent = true
    if (!this.value && this.c_defaultValue) {
      this.selectedValue = this.c_defaultValue
    }
  },
  computed: {
    isRadio () {
      return this.type === 'radio'
    },
    selectedValue: {
      get () {
        return this.value || this.c_defaultValue
      },
      set (value) {
        if (this.c_readonly) { return }
        if (this.isRadio) {
          this.$emit('input', this.getValue(value))
        } else {
          const emittedValue = Array.isArray(value)
            ? value.map(el => this.getValue(el))
            : [this.getValue(value)]
          this.$emit('input', emittedValue)
        }
      },
    },
  },
}
</script>
