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
        <va-time-input
          v-model="form.time"
          :rules="[(v) => !!v || 'Required']"
        />
        <va-switch v-model="form.switch" :rules="[(v) => !!v || 'Required']" />
        <va-option-list
          v-model="form.optionsList"
          :rules="[(v) => !!v || 'Required']"
          :options="['1', '2']"
        />
      </va-form>

      <span>{{ isValid }}</span>

      <div class="flex gap-2">
        <va-button @click="validate">
          Validate
        </va-button>
        <va-button @click="resetValidation">
          Reset validation
        </va-button>
        <va-button @click="reset">
          Reset
        </va-button>
      </div>
    </VbCard>
  </VbDemo>
</template>

<script setup lang="ts">
import { VaForm, useForm } from './index'
import { VaInput } from '../va-input'
import { VaSelect } from '../va-select'
import { VaButton } from '../va-button'
import { VaCheckbox } from '../va-checkbox'
import { VaDateInput } from '../va-date-input'
import { VaTimeInput } from '../va-time-input'
import { VaSwitch } from '../va-switch'
import { VaOptionList } from '../va-option-list'
import { reactive } from 'vue'

const form = reactive({
  input: '',
  select: '',
  checkbox: false,
  date: undefined,
  time: undefined,
  switch: false,
  optionsList: '',
})

const { validate, isValid, reset, resetValidation, fields } = useForm('formEl')
</script>
