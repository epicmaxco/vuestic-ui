<template>
  <va-input-wrapper
    :error="computedError"
    :error-messages="computedErrorMessages"
    :error-count="errorCount"
  >
    <ul
      class="va-option-list__list"
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
            :option="option"
            :disabled="isDisabled(option)"
            :name="c_name"
            :color="c_color"
            :left-label="c_leftLabel"
            :label="getText(option)"
            v-model="selectedValue"
            :tabindex="index"
          />
          <va-checkbox
            v-else
            v-model="selectedValue"
            :label="getText(option)"
            :disabled="isDisabled(option)"
            :left-label="c_leftLabel"
            :array-value="outputObject ? option : getValue(option)"
            :color="c_color"
          />
        </slot>
      </li>
    </ul>
  </va-input-wrapper>
</template>

<script>
import VaRadio from '../va-radio/VaRadio'
import VaCheckbox from '../va-checkbox/VaCheckbox'
import VaInputWrapper from '../va-input/VaInputWrapper'
import { SelectableListMixin } from '../../vuestic-mixins/SelectableList/SelectableListMixin'
import { makeContextablePropsMixin } from '../../context-test/context-provide/ContextPlugin'
import { generateUuid } from '../../../services/utils'

export default {
  name: 'VaOptionList',
  components: { VaRadio, VaCheckbox, VaInputWrapper },
  mixins: [
    SelectableListMixin,
    makeContextablePropsMixin({
      type: {
        type: String,
        default: 'checkbox',
        validator: type => type === 'radio' || type === 'checkbox',
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
  },
  mounted () {
    this.isSelectableListComponent = true
    const initialValue = this.c_defaultValue || this.c_value
    initialValue && (this.selectedValue = initialValue)
  },
  computed: {
    isRadio () {
      return this.type === 'radio'
    },
    selectedValue: {
      get () {
        return this.c_value
      },
      set (value) {
        if (this.c_readonly) return
        if (this.isRadio) {
          this.$emit('input', this.outputObject ? value : this.getValue(value))
        } else {
          const emittedValue = this.outputObject
            ? value
            : Array.isArray(value) ? value.map(el => this.getValue(el)) : [value]
          this.$emit('input', emittedValue)
        }
      },
    },
  },
}
</script>
