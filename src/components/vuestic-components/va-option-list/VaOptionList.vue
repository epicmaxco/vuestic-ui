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
            :value="getValue(option)"
          />
          <va-checkbox
            v-else
            v-model="selectedValue"
            :label="getText(option)"
            :disabled="isDisabled(option)"
            :left-label="c_leftLabel"
            :value="selectedValue"
            :array-value="getValue(option)"
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

export default {
  name: 'VaOptionList',
  components: { VaRadio, VaCheckbox, VaInputWrapper },
  data () {
    return {
      selectedOptions: [],
      selectedButton: '',
    }
  },
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
      name: { type: String, default: 'name' },
      color: { type: String, default: 'primary' },
      leftLabel: { type: Boolean, default: false },
      value: { type: [String, Number, Object, Array], default: '' },
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
  created () {
    this.isSelectableListComponent = true
  },
  mounted () {
    this.initialValue && this.$emit('input', this.getValue(this.initialValue))
  },
  computed: {
    isRadio () {
      return this.type === 'radio'
    },
    initialValue () {
      return this.c_value || this.c_defaultValue
    },
    selectedValue: {
      get () {
        const value = this.isRadio
          ? this.selectedButton
          : this.selectedOptions

        return value.length
          ? value
          : this.initialValue || value
      },
      set (value) {
        if (this.c_readonly) return
        this.isRadio
          ? this.selectedButton = value
          : this.selectedOptions = value
        this.$emit('input', this.getValue(value))
      },
    },
  },
}
</script>
