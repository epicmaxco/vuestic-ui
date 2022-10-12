<template>
  <VbCard
    title="Reset form"
    color="#cccccc"
  >
    <va-form ref="resetFormRef">
      <va-input v-model="form.input" />
      <va-checkbox v-model="form.checkbox" />
    </va-form>

    <pre>{{ form }}</pre>

    <button @click="$refs.resetFormRef.reset()">
      Reset
    </button>
  </VbCard>

  <VbCard title="reset form">
    <va-button @click="$refs.resetForm.reset()">Reset form</va-button>
    <va-form ref="resetForm">
      <va-checkbox
        v-model="resetForm.checkbox"
        :rules="[(v) => !v || 'should be true']"
      />
      <va-date-input
        v-model="resetForm.date"
        :rules="resetForm.validationRules"
      />
      <va-input
        v-model="resetForm.input"
        :rules="resetForm.validationRules"
      />
      <va-option-list
        type="radio"
        v-model="resetForm.optionsListValue"
        :options="resetForm.options"
        :rules="resetForm.validationRules"
      />
      <va-select
        v-model="resetForm.select"
        :options="resetForm.options"
        :rules="resetForm.validationRules"
      />
      <va-time-input
        v-model="resetForm.time"
        :rules="resetForm.validationRules"
      />
    </va-form>
  </VbCard>
</template>

<script lang="ts">
import { VaInput } from '../va-input'
import { VaCheckbox } from '../va-checkbox'
import { VaForm } from './index'
import { VaSelect } from '../va-select'
import { VaButton } from '../va-button'
import { VaDateInput } from '../va-date-input'
import { VaTimeInput } from '../va-time-input'
import { VaOptionList } from '../va-option-list'

const OPTIONS = ['One', 'Two', 'Three']

export default {
  name: 'VaFormReset',
  components: {
    VaForm,
    VaCheckbox,
    VaInput,
    VaSelect,
    VaButton,
    VaDateInput,
    VaTimeInput,
    VaOptionList,
  },
  data () {
    return {
      form: {
        input: 'some text',
        checkbox: true,
      },

      resetForm: {
        input: 'value',
        checkbox: true,
        date: new Date(),
        time: new Date(),
        options: OPTIONS,
        select: OPTIONS[0],
        optionsListValue: OPTIONS[0],
        validationRules: [(value: any) => !!value || 'Field is required'],
      },
    }
  },
}
</script>
