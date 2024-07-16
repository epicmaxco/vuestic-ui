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
import { useEvent, useForm } from '../../composables'
import { ref } from 'vue'

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

export const Autofocus: StoryFn = () => ({
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

export const Stateful: StoryFn = () => ({
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

export const Immediate: StoryFn = () => ({
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
  const immediateInput = canvas.getByTestId('immediate').querySelector('input')!
  const notImmediateInput = canvas.getByTestId('not-immediate')
  const [immediateVaInput, noImmediateVaInput] = canvasElement.querySelectorAll('.va-input')

  await step('First input displays error message', async () => {
    expect(immediateInput.getAttribute('aria-invalid')).toEqual('true')
    expect(immediateVaInput.classList.contains('va-input-wrapper--error')).toBeTruthy()
  })

  await step('Second input does not display error message', async () => {
    expect(immediateInput.getAttribute('aria-invalid')).toEqual('true')
    expect(noImmediateVaInput.classList.contains('va-input-wrapper--error')).toBeFalsy()
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

export const HideErrors: StoryFn = () => ({
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

export const Focus: StoryFn = () => ({
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
  const first = canvas.getByTestId('first').querySelector('input')!
  const button = canvas.getByRole('button', { name: 'Focus first input' }) as HTMLElement

  await step('Focusses first input', async () => {
    await userEvent.click(button)
    expect(first).toHaveFocus()
  })
}

export const FocusInvalid: StoryFn = () => ({
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
  const firstInvalid = canvas.getByTestId('first-invalid').querySelector('input')!
  const button = canvas.getByRole('button', { name: 'Focus invalid' }) as HTMLElement

  await step('Focuses first invalid input', async () => {
    await userEvent.click(button)
    expect(firstInvalid).toHaveFocus()
  })
}

export const ValidateAndResetValidation: StoryFn = () => ({
  components: { VaForm, VaInput, VaButton },
  template: `
    <va-form ref="form">
      <va-input data-testid="input" :rules="[false]" stateful />
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
  const inputWrapper = canvasElement.querySelector('.va-input') as HTMLElement
  const input = inputWrapper.querySelector('input')!
  const validateButton = canvas.getByRole('button', { name: 'Validate' }) as HTMLElement
  const resetButton = canvas.getByRole('button', { name: 'Reset validation' }) as HTMLElement

  await step('Validates input with error', async () => {
    await userEvent.click(validateButton)
    expect(input.getAttribute('aria-invalid')).toEqual('true')
    expect(inputWrapper.classList.contains('va-input-wrapper--error')).toBeTruthy()
  })

  await step('Reset inputs validation', async () => {
    await userEvent.click(resetButton)
    expect(input.getAttribute('aria-invalid')).toEqual('false')
    expect(inputWrapper.classList.contains('va-input-wrapper--error')).toBeFalsy()
  })
}

export const Reset: StoryFn = () => ({
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
  const inputWrapper = canvasElement.querySelector('.va-input') as HTMLElement
  const input = inputWrapper.querySelector('input')!

  const setButton = canvas.getByRole('button', { name: 'Set inputs and validation' }) as HTMLElement
  const resetButton = canvas.getByRole('button', { name: 'Reset inputs and validation' }) as HTMLElement

  await step('Resets form', async () => {
    await userEvent.click(setButton)
    await userEvent.click(resetButton)
    expect(input).toHaveValue('')
    expect(input.getAttribute('aria-invalid')).toEqual('true')
    expect(inputWrapper.classList.contains('va-input-wrapper--error')).toBeFalsy()
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

export const FormDataInitialValue = () => ({
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
    validationRules: [false],
  }),
  setup () {
    const form = useForm('formEl')

    return {
      form,
    }
  },
  template: `
    [form data]: <pre>{{ form.formData }}</pre>

    <va-form ref="formEl" stateful>
      <va-checkbox
        v-model="checkbox"
        :rules="validationRules"
        name="checkbox"
      />
      <va-date-input
        v-model="date"
        :rules="validationRules"
        name="date"
      />
      <va-input
        v-model="input"
        :rules="validationRules"
        name="text"
      />
      <va-select
        v-model="select"
        :options="options"
        :rules="validationRules"
        name="select"
      />
      <va-time-input
        v-model="time"
        :rules="validationRules"
        name="time"
      />
    </va-form>
    <va-button @click="$refs.form.reset()">
      Reset form
    </va-button>
  `,
})

export const DirtyForm: StoryFn = () => ({
  components: { VaForm, VaInput, VaButton },

  setup () {
    const { isDirty, isValid } = useForm('form')

    return {
      isDirty,
      isValid,
    }
  },

  template: `
    <p id="form-dirty">[form-dirty]: {{ isDirty }}</p>
    <p id="form-valid">[form-valid]: {{ isValid }}</p>
    <p id="input-dirty">[input-dirty]: {{ $refs.input?.isDirty }}</p>
    <p id="input-valid">[input-valid]: {{ $refs.input?.isValid }}</p>
    <va-form ref="form">
      <va-input data-testid="input" :rules="[(v) => v.length > 2]" stateful ref="input" />
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

DirtyForm.play = async ({ canvasElement, step }) => {
  const canvas = within(canvasElement)
  const input = canvas.getByTestId('input').querySelector('input')!
  const validateButton = canvas.getByRole('button', { name: 'Validate' }) as HTMLElement
  const resetValidationButton = canvas.getByRole('button', { name: 'Reset validation' }) as HTMLElement
  const resetButton = canvas.getByRole('button', { name: 'Reset' }) as HTMLElement

  const resetValidation = async () => await userEvent.click(resetValidationButton)
  const reset = async () => await userEvent.click(resetButton)
  const validate = async () => await userEvent.click(validateButton)

  const isFormValid = () => canvasElement.querySelector('#form-valid')?.innerHTML.includes('true')
  const isFormDirty = () => canvasElement.querySelector('#form-dirty')?.innerHTML.includes('true')
  const isInputValid = () => canvasElement.querySelector('#input-valid')?.innerHTML.includes('true')
  const isInputVisuallyValid = () => !input.classList.contains('va-input-wrapper--error')
  const isInputDirty = () => canvasElement.querySelector('#input-dirty')?.innerHTML.includes('true')

  await step('Form is not dirty and invalid input', async () => {
    expect(isFormValid()).toBeFalsy()
    expect(isFormDirty()).toBeFalsy()
    expect(isInputValid()).toBeFalsy()
    expect(isInputDirty()).toBeFalsy()

    // Looks like VALID if NOT DIRTY
    expect(isInputVisuallyValid()).toBeTruthy()
  })

  await step('Form is dirty and invalid input', async () => {
    await userEvent.type(input, '1')

    expect(isFormValid()).toBeFalsy()
    expect(isFormDirty()).toBeTruthy()
    expect(isInputValid()).toBeFalsy()
    expect(isInputDirty()).toBeTruthy()

    // Looks like INVALID if DIRTY
    expect(isInputVisuallyValid()).toBeTruthy()
  })

  await step('Form is dirty and valid input', async () => {
    await userEvent.type(input, '23')

    expect(isFormValid()).toBeTruthy()
    expect(isFormDirty()).toBeTruthy()
    expect(isInputValid()).toBeTruthy()
    expect(isInputDirty()).toBeTruthy()

    // Looks like VALID if VALID and DIRTY
    expect(isInputVisuallyValid()).toBeTruthy()
  })

  await step('Form is not dirty and valid input after validation reset', async () => {
    await resetValidation()

    expect(isFormValid()).toBeTruthy()
    expect(isFormDirty()).toBeFalsy()
    expect(isInputValid()).toBeTruthy()
    expect(isInputDirty()).toBeFalsy()

    // VALID because it's not DIRTY
    expect(isInputVisuallyValid()).toBeTruthy()
  })

  await step('Form is dirty after valid input interaction', async () => {
    await userEvent.type(input, '4')

    expect(isFormValid()).toBeTruthy()
    expect(isFormDirty()).toBeTruthy()
    expect(isInputValid()).toBeTruthy()
    expect(isInputDirty()).toBeTruthy()
    expect(isInputVisuallyValid()).toBeTruthy()
  })

  await step('Form and input are invalid after reset is called on form', async () => {
    await reset()

    expect(input.innerText).toBe('')

    expect(isFormValid()).toBeFalsy()
    expect(isFormDirty()).toBeFalsy()
    expect(isInputValid()).toBeFalsy()
    expect(isInputDirty()).toBeFalsy()

    // VALID because it's not DIRTY
    expect(isInputVisuallyValid()).toBeTruthy()
  })
}

export const TouchedForm: StoryFn = () => ({
  components: { VaForm, VaInput, VaButton },

  setup () {
    const { isValid, isTouched } = useForm('form')

    return {
      isTouched,
      isValid,
    }
  },

  template: `
    <p id="form-touched">[form-touched]: {{ isTouched }}</p>
    <p id="form-valid">[form-valid]: {{ isValid }}</p>
    <p id="input-touched">[input-touched]: {{ $refs.input?.isTouched }}</p>
    <p id="input-valid">[input-valid]: {{ $refs.input?.isValid }}</p>
    <va-form ref="form">
      <va-input data-testid="input" :rules="[(v) => v.length > 2]" stateful ref="input" />
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

TouchedForm.play = async ({ canvasElement, step }) => {
  const canvas = within(canvasElement)
  const input = canvas.getByTestId('input').querySelector('input')!
  const validateButton = canvas.getByRole('button', { name: 'Validate' }) as HTMLElement
  const resetValidationButton = canvas.getByRole('button', { name: 'Reset validation' }) as HTMLElement
  const resetButton = canvas.getByRole('button', { name: 'Reset' }) as HTMLElement

  const resetValidation = async () => await userEvent.click(resetValidationButton)
  const reset = async () => await userEvent.click(resetButton)
  const validate = async () => await userEvent.click(validateButton)

  const isFormValid = () => canvasElement.querySelector('#form-valid')?.innerHTML.includes('true')
  const isFormTouched = () => canvasElement.querySelector('#form-touched')?.innerHTML.includes('true')
  const isInputValid = () => canvasElement.querySelector('#input-valid')?.innerHTML.includes('true')
  const isInputVisuallyValid = () => !input.classList.contains('va-input-wrapper--error')
  const isInputTouched = () => canvasElement.querySelector('#input-touched')?.innerHTML.includes('true')

  await step('Form is not touched and invalid input', async () => {
    expect(isFormValid()).toBeFalsy()
    expect(isFormTouched()).toBeFalsy()
    expect(isInputValid()).toBeFalsy()
    expect(isInputTouched()).toBeFalsy()

    // Looks like VALID if NOT DIRTY
    expect(isInputVisuallyValid()).toBeTruthy()
  })

  await step('Form is touched and invalid input', async () => {
    await userEvent.blur(input)

    expect(isFormValid()).toBeFalsy()
    expect(isFormTouched()).toBeTruthy()
    expect(isInputValid()).toBeFalsy()
    expect(isInputTouched()).toBeTruthy()

    sleep(100)

    // Looks like INVALID if DIRTY
    expect(isInputVisuallyValid()).toBeTruthy()
  })

  await step('Form is touched and valid input', async () => {
    await userEvent.type(input, '123')

    expect(isFormValid()).toBeTruthy()
    expect(isFormTouched()).toBeTruthy()
    expect(isInputValid()).toBeTruthy()
    expect(isInputTouched()).toBeTruthy()

    // Looks like VALID if VALID and DIRTY
    expect(isInputVisuallyValid()).toBeTruthy()
  })

  await step('Form is not touched and valid input after validation reset', async () => {
    await resetValidation()

    expect(isFormValid()).toBeTruthy()
    expect(isFormTouched()).toBeFalsy()
    expect(isInputValid()).toBeTruthy()
    expect(isInputTouched()).toBeFalsy()

    // VALID because it's not DIRTY
    expect(isInputVisuallyValid()).toBeTruthy()
  })

  await step('Form and input are invalid after reset is called on form', async () => {
    await userEvent.blur(input)
    await reset()

    expect(input.innerText).toBe('')

    expect(isFormValid()).toBeFalsy()
    expect(isFormTouched()).toBeFalsy()
    expect(isInputValid()).toBeFalsy()
    expect(isInputTouched()).toBeFalsy()

    // VALID because it's not DIRTY
    expect(isInputVisuallyValid()).toBeTruthy()
  })
}

export const ValidateAsync: StoryFn = () => ({
  components: { VaForm, VaInput, VaButton },

  setup () {
    const asyncResult = ref(false)
    const { isValid, isLoading, validateAsync } = useForm('form')

    const asyncRule = async () => {
      return new Promise((resolve) => {
        setTimeout(() => resolve('Error!'), 1000)
      })
    }

    return {
      isLoading,
      isValid,
      asyncResult,
      validateAsync,
      asyncRule,
    }
  },

  template: `
    [isValid]: {{ isValid }}
    [isLoading]: {{ isLoading }}
    <va-form ref="form">
      <va-input data-testid="input" :rules="[asyncRule]" stateful />
    </va-form>
    <va-button @click="validateAsync">
      Validate async
    </va-button>
  `,
})

export const ImmediateValidateAsync: StoryFn = () => ({
  components: { VaForm, VaInput, VaButton },

  setup () {
    const asyncResult = ref(false)
    const { isValid, isLoading, validateAsync } = useForm('form')

    const asyncRule = async () => {
      return new Promise((resolve) => {
        setTimeout(() => resolve('Error!'), 1000)
      })
    }

    return {
      isLoading,
      isValid,
      asyncResult,
      validateAsync,
      asyncRule,
    }
  },

  template: `
    [isValid]: {{ isValid }}
    [isLoading]: {{ isLoading }}
    <va-form ref="form" immediate>
      <va-input data-testid="input" :rules="[asyncRule]" stateful />
    </va-form>
    <va-button @click="validateAsync">
      Validate async
    </va-button>
  `,
})

export const RulesWithReactiveState: StoryFn = () => ({
  components: { VaForm, VaInput, VaButton },

  setup () {
    const { isValid } = useForm('form')

    const firstInput = ref('1')
    const secondInput = ref('2')

    const firstInputRules = [() => Number(firstInput.value) > Number(secondInput.value) || 'First input value must be bigger than Second']
    const secondInputRules = [() => Number(firstInput.value) < Number(secondInput.value) || 'Second input value must be bigger than First']

    return {
      firstInput,
      secondInput,
      firstInputRules,
      secondInputRules,
      isValid,
    }
  },

  template: `
    <p id="form-valid">[form-valid]: {{ isValid }}</p>
    <va-form ref="form" immediate>
      <va-input v-model="firstInput" data-testid="input1" :rules="firstInputRules" />
      <va-input v-model="secondInput" data-testid="input2" :rules="secondInputRules" />
    </va-form>
  `,
})

RulesWithReactiveState.play = async ({ canvasElement, step }) => {
  const inputs = canvasElement.querySelectorAll('.va-input-wrapper')
  const [input1, input2] = inputs

  const isFormValid = () => canvasElement.querySelector('#form-valid')?.innerHTML.includes('true')
  const isFirstInputValid = () => !input1.classList.contains('va-input-wrapper--error')
  const isSecondInputValid = () => !input2.classList.contains('va-input-wrapper--error')

  await step('Valid status changes if reactive dependency is updated', async () => {
    expect(isFormValid()).toBeFalsy()
    expect(isFirstInputValid()).toBeFalsy()
    expect(isSecondInputValid()).toBeTruthy()

    await userEvent.type(input1, '2')

    expect(isFormValid()).toBeFalsy()
    expect(isFirstInputValid()).toBeTruthy()
    expect(isSecondInputValid()).toBeFalsy()
  })
}
