import { StoryFn } from '@storybook/vue3'
import { userEvent } from '../../../.storybook/interaction-utils/userEvent'
import { addText } from '../../../.storybook/interaction-utils/addText'
import { expect } from '@storybook/jest'
import { within } from '@storybook/testing-library'

import {
  VaForm,
  VaCheckbox,
  VaButton,
  VaInput,
  VaSelect,
  VaDateInput,
  VaOptionList,
  VaTimeInput,
  VaFileUpload,
  VaSwitch,
  VaCounter,
  VaRating,
  VaSlider,
  VaDatePicker,
  VaTimePicker,
  VaRadio,
} from '../'
import { sleep } from '../../utils/sleep'

export default {
  title: 'VaForm',
  component: VaForm,
  tags: ['autodocs'],
}

export const Default = () => ({
  components: { VaForm, VaInput, VaButton },
  data: () => ({ input: '' }),
  template: `
    <va-form ref="form">
      <va-input

        v-model="input"
        :rules="[value => !!value || 'required']"
      />
    </va-form>
    <va-button @click.prevent="$refs.form.validate()">
      Submit
    </va-button>
  `,
})

export const Autofocus = () => ({
  components: { VaForm, VaInput },
  template: `
    <va-form autofocus>
      <va-input data-testid="input" />
    </va-form>
  `,
})

addText(
  Autofocus,
  'Autofocus is broken',
  'stale',
)
Autofocus.play = async ({ canvasElement, step }) => {
  return // disabled for now (see )
  const canvas = within(canvasElement)
  const input = canvas.getByTestId('input') as HTMLElement

  await step('Focus first input', async () => {
    expect(input).toHaveFocus()
  })
}

export const Stateful = () => ({
  components: { VaForm, VaCheckbox },
  template: `
    [true]
    <va-form stateful>
      <va-checkbox />
    </va-form>
    [false]
    <va-form>
      <va-checkbox />
    </va-form>
  `,
})

Stateful.play = async ({ canvasElement, step }) => {
  const canvas = within(canvasElement)
  const [firstCheckboxInput, secondCheckboxInput] = canvas.getAllByRole('checkbox', { name: '' }) as HTMLElement[]
  const [firstCheckbox, secondCheckbox] = document.querySelectorAll('.va-checkbox__input-container')

  await step('Should be checked', async () => {
    await userEvent.click(firstCheckbox)
    expect(firstCheckboxInput).toBeChecked()
  })

  await step('Should not be checked', async () => {
    await userEvent.click(secondCheckbox)
    expect(secondCheckboxInput).not.toBeChecked()
  })
}

export const Immediate = () => ({
  components: { VaForm, VaInput },

  template: `
    [true]
    <va-form immediate>
      <va-input data-testid="immediate" :rules="[false]"/>
    </va-form>
    [false]
    <va-form>
      <va-input data-testid="not-immediate" :rules="[false]"/>
    </va-form>
  `,
})

Immediate.play = async ({ canvasElement, step }) => {
  const canvas = within(canvasElement)
  const immediate = canvas.getByTestId('immediate')
  const notImmediate = canvas.getByTestId('not-immediate')

  const [firstDefinedInput, secondDefineInput] = canvasElement.querySelectorAll('.va-input-wrapper--error')

  await step('First input displays error message', async () => {
    expect(immediate.getAttribute('aria-invalid')).toEqual('true')
    expect(firstDefinedInput).toBeDefined()
  })

  await step('Second input does not display error message', async () => {
    expect(notImmediate.getAttribute('aria-invalid')).toEqual('true')
    expect(secondDefineInput).toBeUndefined()
  })
}

export const HideErrorMessages: StoryFn = () => ({
  components: { VaForm, VaInput },
  template: `
    [true]
    <va-form hideErrorMessages immediate>
      <va-input error error-messages="message" />
    </va-form>
    [false]
    <va-form immediate>
      <va-input error error-messages="message" />
    </va-form>
  `,
})

HideErrorMessages.play = async ({ step, canvasElement }) => {
  const [firstDefinedInput, secondDefineInput] = canvasElement.querySelectorAll('.va-message-list__message')

  await step('Does not display error message', async () => {
    expect(firstDefinedInput).toBeDefined()
  })

  await step('Displays error message', async () => {
    expect(secondDefineInput).toBeUndefined()
  })
}

export const HideErrors = () => ({
  components: { VaForm, VaInput },
  template: `
    [true]
    <va-form hideErrors immediate>
      <va-input error/>
    </va-form>
    [false]
    <va-form immediate>
      <va-input error/>
    </va-form>
  `,
})

HideErrors.play = async ({ step }) => {
  const [firstInput, secondInput] = document.querySelectorAll('.va-input-wrapper')

  await step('Does not highlight invalid input', async () => {
    expect(firstInput).not.toHaveClass('va-input-wrapper--error')
  })

  await step('Highlights invalid input', async () => {
    expect(secondInput).toHaveClass('va-input-wrapper--error')
  })
}

export const Focus = () => ({
  components: { VaForm, VaInput, VaButton },
  template: `
    <va-form ref="form">
      <va-input data-testid="first"/>
      <va-input />
    </va-form>
    <va-button @click="$refs.form.focus()">
      Focus first input
    </va-button>
  `,
})

Focus.play = async ({ canvasElement, step }) => {
  const canvas = within(canvasElement)
  const first = canvas.getByTestId('first')
  const button = canvas.getByRole('button', { name: 'Focus first input' }) as HTMLElement

  await step('Focusses first input', async () => {
    await userEvent.click(button)
    expect(first).toHaveFocus()
  })
}

export const FocusInvalid = () => ({
  components: { VaForm, VaInput, VaButton },
  template: `
    <va-form ref="form">
      <va-input />
      <va-input data-testid="first-invalid" error/>
      <va-input error/>
    </va-form>
    <va-button @click="$refs.form.focusInvalidField()">
      Focus invalid
    </va-button>
  `,
})

FocusInvalid.play = async ({ canvasElement, step }) => {
  const canvas = within(canvasElement)
  const firstInvalid = canvas.getByTestId('first-invalid')
  const button = canvas.getByRole('button', { name: 'Focus invalid' }) as HTMLElement

  await step('Focuses first invalid input', async () => {
    await userEvent.click(button)
    expect(firstInvalid).toHaveFocus()
  })
}

export const ValidateAndResetValidation = () => ({
  components: { VaForm, VaInput, VaButton },
  template: `
    <va-form ref="form">
      <va-input data-testid="input" :rules="[false]"/>
    </va-form>
    <va-button @click="$refs.form.validate()">
      Validate
    </va-button>
    <va-button @click="$refs.form.resetValidation()">
      Reset validation
    </va-button>
  `,
})

ValidateAndResetValidation.play = async ({ canvasElement, step }) => {
  const canvas = within(canvasElement)
  const input = canvas.getByTestId('input')
  const validateButton = canvas.getByRole('button', { name: 'Validate' }) as HTMLElement
  const resetButton = canvas.getByRole('button', { name: 'Reset validation' }) as HTMLElement

  await step('Validates input with error', async () => {
    await userEvent.click(validateButton)
    expect(input.getAttribute('aria-invalid')).toEqual('true')
  })

  await step('Reset inputs validation', async () => {
    await userEvent.click(resetButton)
    expect(input.getAttribute('aria-invalid')).toEqual('false')
  })
}

export const Reset = () => ({
  components: { VaForm, VaInput, VaButton },
  data: () => ({ data: '' }),
  methods: {
    fillForm () {
      this.value = 'data'
      this.$refs.form.validate()
    },
  },
  template: `
    <va-form ref="form" stateful>
      <va-input data-testid="input" v-model="value" :rules="[false]"/>
    </va-form>
    <va-button @click="fillForm">
      Set inputs and validation
    </va-button>
    <va-button @click="$refs.form.reset()">
      Reset inputs and validation
    </va-button>
  `,
})

Reset.play = async ({ canvasElement, step }) => {
  const canvas = within(canvasElement)
  const input = canvas.getByTestId('input')

  const setButton = canvas.getByRole('button', { name: 'Set inputs and validation' }) as HTMLElement
  const resetButton = canvas.getByRole('button', { name: 'Reset inputs and validation' }) as HTMLElement

  await step('Resets form', async () => {
    await userEvent.click(setButton)
    await userEvent.click(resetButton)
    expect(input).toHaveValue('')
    expect(input.getAttribute('aria-invalid')).toEqual('false')
  })
}

const OPTIONS = ['One', 'Two', 'Three']

export const ToDoFormReset = () => ({
  components: {
    VaForm,
    VaInput,
    VaSelect,
    VaDateInput,
    VaTimeInput,
    VaOptionList,
    VaButton,
  },
  data: () => ({
    input: 'value',
    checkbox: true,
    date: new Date(0),
    time: new Date(0),
    options: OPTIONS,
    select: OPTIONS[0],
    optionsListValue: OPTIONS[0],
    validationRules: [false],
  }),
  template: `
    <va-form ref="form">
      <va-checkbox
        v-model="checkbox"
        :rules="validationRules"
      />
      <va-date-input
        v-model="date"
        :rules="validationRules"
      />
      <va-input
        v-model="input"
        :rules="validationRules"
      />
      <va-option-list
        type="radio"
        v-model="optionsListValue"
        :options="options"
        :rules="validationRules"
      />
      <va-select
        v-model="select"
        :options="options"
        :rules="validationRules"
      />
      <va-time-input
        v-model="time"
        :rules="validationRules"
      />
    </va-form>
    <va-button @click="$refs.form.reset()">
      Reset form
    </va-button>
  `,
})

addText(
  ToDoFormReset,
  'This is old demo resqued to have visual tests, but we want to rewrite it eventually.',
  'stale',
)

export const ToDoFormInteractions = () => ({
  components: {
    VaForm,
    VaInput,
    VaSelect,
    VaDateInput,
    VaTimeInput,
    VaOptionList,
    VaFileUpload,
    VaSwitch,
    VaCounter,
    VaRating,
    VaSlider,
    VaDatePicker,
    VaTimePicker,
    VaRadio,
    VaButton,
  },
  data: () => ({
    input: 'input',
    select: OPTIONS[0],
    checkbox: false,
    date: new Date(0),
    time: new Date(0),
    switch1: false,
    options: OPTIONS,
    optionsList: '',
    counter: 13,
    rating: 4,
    slider: 29,
    radio: OPTIONS[1],
    validationRules: [false],
  }),
  template: `
    <va-form ref="form">
      <va-input
        v-model="input"
        :rules="validationRules"
      />
      <va-select
        v-model="select"
        :options="options"
        :rules="validationRules"
      />
      <va-checkbox
        v-model="checkbox"
        :rules="validationRules"
      />
      <va-date-input
        v-model="date"
        :rules="validationRules"
      />
      <va-date-picker
        v-model="date"
        :rules="validationRules"
      />
      <va-time-input
        v-model="time"
        :rules="validationRules"
      />
      <va-time-picker
        v-model="time"
        :rules="validationRules"
      />
      <va-switch
        v-model="switch1"
        :rules="validationRules"
      />
      <va-option-list
        v-model="optionsList"
        :rules="validationRules"
        :options="options"
      />
      <va-radio
        v-model="radio"
        :options="options"
        :rules="validationRules"
      />
      <va-counter
        v-model="counter"
        :rules="validationRules"
      />
      <va-rating v-model="rating"
        :rules="validationRules"
      />
      <va-slider v-model="slider"
        :rules="validationRules"
      />
      <va-file-upload />
    </va-form>
    <va-button @click="$refs.form.validate()">
      Validate
    </va-button>
    <va-button @click="$refs.form.resetValidation()">
      Reset validation
    </va-button>
    <va-button @click="$refs.form.reset()">
      Reset
    </va-button>
  `,
})

addText(
  ToDoFormInteractions,
  'This is old demo resqued to have visual tests, but we want to rewrite it eventually.',
  'stale',
)
