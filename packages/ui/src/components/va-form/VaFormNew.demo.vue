<template>
  <VbDemo>
    <VbCard title="all form items">
      <va-form autofocus class="flex flex-col gap-4" ref="formEl">
        <va-input v-model="form.input" :rules="[(v) => !!v || 'Required']" />
        <va-select v-model="form.select" :rules="[(v) => !!v || 'Required']" />
        <va-checkbox
          v-model="form.checkbox"
          :rules="[(v) => !!v || 'Required']"
        />
        <va-date-input
          v-model="form.date"
          :rules="[(v) => !!v || 'Required']"
        />
        <va-date-picker
          v-model="form.date"
          :rules="[(v: any) => !!v || 'Required']"
        />
        <va-time-input
          v-model="form.time"
          :rules="[(v) => !!v || 'Required']"
        />
        <va-time-picker
          v-model="form.time"
          :rules="[(v: any) => !!v || 'Required']"
        />
        <va-switch v-model="form.switch" :rules="[(v) => !!v || 'Required']" />
        <va-option-list
          v-model="form.optionsList"
          :rules="[(v) => !!v || 'Required']"
          :options="['1', '2']"
        />
        <va-counter
          v-model="form.counter"
          :rules="[(v: any) => !!v || 'Required']"
        />
        <va-rating v-model="form.rating" :rules="[(v: any) => !!v || 'Required']" />
        <va-slider v-model="form.slider" :rules="[(v: any) => !!v || 'Required']" />
        <va-file-upload />
      </va-form>

      <span>Is Valid: {{ isValid }}</span>

      <div class="flex gap-2">
        <va-button @click="validate"> Validate </va-button>
        <va-button @click="resetValidation"> Reset validation </va-button>
        <va-button @click="reset"> Reset </va-button>
      </div>

      <pre>{{ errorMessages }}</pre>
    </VbCard>
  </VbDemo>
</template>

<script setup lang="ts">
import { useForm } from '../../composables/useForm'

import {
  VaForm,
  VaFileUpload,
  VaInput,
  VaSelect,
  VaButton,
  VaCheckbox,
  VaDateInput,
  VaTimeInput,
  VaSwitch,
  VaOptionList,
  VaCounter,
  VaRating,
  VaSlider,
  VaDatePicker,
  VaTimePicker,
} from '../'
import { reactive } from 'vue'

const form = reactive({
  input: '',
  select: '',
  checkbox: false,
  date: undefined,
  time: undefined,
  switch: false,
  optionsList: '',
  counter: 0,
  rating: 0,
  slider: 0,
})

const { validate, isValid, reset, resetValidation, errorMessages } =
  useForm('formEl')
</script>
