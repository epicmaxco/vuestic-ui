import { userEvent } from '../../../.storybook/interaction-utils/userEvent'
import { addText } from '../../../.storybook/interaction-utils/addText'
import { expect } from '@storybook/jest'
import { VaForm } from './'
import { VaCheckbox } from '../va-checkbox'
import { VaButton } from '../va-button'
import { VaInput } from '../va-input'
import { within } from '@storybook/testing-library'

export default {
  title: 'VaForm',
  component: VaForm,
  tags: ['autodocs'],
}

export const Default = () => ({
  components: { VaForm, VaInput, VaButton },
  template: `
    <va-form ref="form">
      <va-input :rules="[value => !!value || 'input is required']"/>
      <va-button @click.prevent="$refs.form.validate()">Submit</va-button>
    </va-form>
  `,
})

export const Autofocus = () => ({
  components: { VaForm, VaInput },
  template: `
    <va-form autofocus>
      <va-input />
    </va-form>
  `,
})

addText(
  Autofocus,
  'Autofocus is broken',
  'stale',
)

Autofocus.play = async ({ canvasElement, step }) => {
  const canvas = within(canvasElement)
  const input = canvas.getByRole('textbox', { name: '' }) as HTMLElement

  await step('Focus first input', async () => {
    expect(input).toHaveFocus()
  })
}

export const Stateful = () => ({
  components: { VaForm, VaCheckbox },
  template: `
    [true]
    <va-form stateful>
      <va-checkbox role/>
    </va-form>
    [false]
    <va-form :stateful="false">
      <va-checkbox role/>
    </va-form>
  `,
})

Stateful.play = async ({ canvasElement, step }) => {
  const canvas = within(canvasElement)
  const [firstCheckboxInput, secondCheckboxInput] = canvas.getAllByRole('checkbox', { name: '' }) as HTMLElement[]
  const [firstCheckbox, secondCheckbox] = document.querySelectorAll('[role] > div')

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
      <va-input :rules="[value => !!value || 'input is required']"/>
    </va-form>
    [false]
    <va-form>
      <va-input :rules="[value => !!value || 'input is required']"/>
    </va-form>
  `,
})

Immediate.play = async ({ canvasElement, step }) => {
  const canvas = within(canvasElement)
  const [firstInput, secondInput] = canvas.getAllByRole('textbox', { name: '' }) as HTMLElement[]

  await step('Displays error message', async () => {
    expect(firstInput.getAttribute('aria-invalid')).toEqual('true')
  })

  await step('Does not display error message', async () => {
    expect(secondInput.getAttribute('aria-invalid')).toEqual('false')
  })
}

export const HideErrorMessages = () => ({
  components: { VaForm, VaInput },
  template: `
    [true]
    <va-form
      role
      immediate
      hideErrorMessages
    >
      <va-input :rules="[value => !!value || 'input is required']"/>
    </va-form>
    [false]
    <va-form
      role
      immediate
      :hideErrorMessages="false"
    >
      <va-input :rules="[value => !!value || 'input is required']"/>
    </va-form>
  `,
})

HideErrorMessages.play = async ({ step }) => {
  const [firstDefinedInput, secondDefineInput] = document.querySelectorAll('[role] > div > div:nth-child(2)')

  await step('Does not display validation error', async () => {
    expect(firstDefinedInput).toBeDefined()
  })

  await step('Displays validation error', async () => {
    expect(secondDefineInput).toBeUndefined()
  })
}

export const HideErrors = () => ({
  components: { VaForm, VaInput },
  template: `
    [true]
    <va-form
      role
      immediate
      hideErrors
    >
      <va-input :rules="[value => !!value || 'input is required']"/>
    </va-form>
    [false]
    <va-form
      role
      immediate
      :hideErrors="false"
    >
      <va-input :rules="[value => !!value || 'input is required']"/>
    </va-form>
  `,
})

HideErrors.play = async ({ step }) => {
  const [firstInput, secondInput] = document.querySelectorAll('[role] > div')

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
      <va-input />
    </va-form>
    <va-button @click="$refs.form.focus()">
      Focus first input
    </va-button>
  `,
})

Focus.play = async ({ canvasElement, step }) => {
  const canvas = within(canvasElement)
  const firstInput = canvas.getByRole('textbox', { name: '' }) as HTMLElement
  const button = canvas.getByRole('button', { name: 'Focus first input' }) as HTMLElement

  await step('Focusses first input', async () => {
    await userEvent.click(button)
    expect(firstInput).toHaveFocus()
  })
}

export const FocusInvalid = () => ({
  components: { VaForm, VaInput, VaButton },
  template: `
    <va-form ref="form">
      <va-input error />
    </va-form>
    <va-button @click="$refs.form.focusInvalidField()">
      Focus invalid
    </va-button>
  `,
})

FocusInvalid.play = async ({ canvasElement, step }) => {
  const canvas = within(canvasElement)
  const input = canvas.getByRole('textbox', { name: '' }) as HTMLElement
  const button = canvas.getByRole('button', { name: 'Focus invalid' }) as HTMLElement

  await step('Focusses invalid input', async () => {
    await userEvent.click(button)
    expect(input).toHaveFocus()
  })
}

export const ValidateAndResetValidation = () => ({
  components: { VaForm, VaInput, VaButton },
  data: () => ({ input: 'do not reset' }),
  template: `
    <va-form ref="form">
      <va-input v-model="input"/>
      <va-input :rules="[() => 'error']"/>
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
  const [firstInput, secondInput] = canvas.getAllByRole('textbox', { name: '' }) as HTMLElement[]
  const validateButton = canvas.getByRole('button', { name: 'Validate' }) as HTMLElement
  const resetButton = canvas.getByRole('button', { name: 'Reset validation' }) as HTMLElement

  await step('Validates input vith error', async () => {
    await userEvent.click(validateButton)
    expect(secondInput.getAttribute('aria-invalid')).toEqual('true')
    expect(firstInput.getAttribute('aria-invalid')).toEqual('false')
  })

  await step('Reset inputs validation', async () => {
    await userEvent.click(resetButton)
    expect(secondInput.getAttribute('aria-invalid')).toEqual('false')
    expect(firstInput.getAttribute('aria-invalid')).toEqual('false')
  })
}

export const Reset = () => ({
  components: { VaForm, VaInput, VaButton },
  data: () => ({ username: 'reset' }),
  template: `
    <va-form
      ref="form"
      immediate
    >
      <va-input v-model="username"/>
      <va-input :rules="[() => 'error']"/>
    </va-form>
    <va-button @click.prevent="$refs.form.reset()">
      Reset inputs and validation
    </va-button>
  `,
})

Reset.play = async ({ canvasElement, step }) => {
  const canvas = within(canvasElement)
  const [firstInput, secondInput] = canvas.getAllByRole('textbox', { name: '' }) as HTMLElement[]
  const button = canvas.getByRole('button', { name: 'Reset inputs and validation' }) as HTMLElement

  await step('Resets form', async () => {
    await userEvent.click(button)
    expect(firstInput).toHaveValue('')
    expect(secondInput.getAttribute('aria-invalid')).toEqual('false')
  })
}
