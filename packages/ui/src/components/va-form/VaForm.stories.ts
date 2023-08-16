import { userEvent } from '../../../.storybook/interaction-utils/userEvent'
import { addText } from '../../../.storybook/interaction-utils/addText'
import { expect } from '@storybook/jest'
import { VaForm } from './'
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
    <va-form class="flex flex-col max-w-sm">
      <va-input 
        label="input"
      />
      <va-input 
        class="mt-2"
        label="input"
      />
      <va-button class="mt-2" >
        Submit
      </va-button>
    </va-form>
  `,
})

export const Autofocus = () => ({
  components: { VaForm, VaInput, VaButton },
  template: `
    <va-form 
      class="flex flex-col max-w-sm"
      :autofocus="true"
    >
      <va-input 
        label="should have focus"
      />
      <va-input 
        class="mt-2"
        label="should not have focus"
      />
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
  const input = canvas.getByRole('textbox', { name: 'should have focus' }) as HTMLElement

  await step('Focus first input', async () => {
    expect(input).toHaveFocus()
  })
}

export const Stateful = () => ({
  components: { VaForm, VaInput, VaButton },
  template: `
    [stateful]
    <va-form class="flex flex-col max-w-sm">
      <va-input 
        :stateful="true"
        label="save value"
      />
    </va-form>
    [default]
    <va-form class="flex flex-col max-w-sm">
      <va-input 
        :stateful="false"
        label="does not save value"
      />
    </va-form>
  `,
})

Stateful.play = async ({ canvasElement, step }) => {
  const canvas = within(canvasElement)
  const firstInput = canvas.getByRole('textbox', { name: 'save value' }) as HTMLElement
  const secondInput = canvas.getByRole('textbox', { name: 'does not save value' }) as HTMLElement

  await step('Should save input data', async () => {
    await userEvent.type(firstInput, 'data')
    expect(firstInput).toHaveValue('data')
  })

  await step('Should not save input data', async () => {
    await userEvent.type(secondInput, 'data')
    expect(secondInput).toHaveValue('')
    secondInput.blur()
  })
}

export const ValidationRules = () => ({
  components: { VaForm, VaInput, VaButton },
  data: () => ({ input: 'hell' }),
  template: `
    [immediate]
    <va-form
      class="flex max-w-sm"
      immediate
    >
      <va-input
        v-model="input"
        label="immediate validation"
        :rules="[value => value === 'hello' || 'should be hello']"
      />
    </va-form>
    [deffault]
    <va-form
      class="flex max-w-sm"
    >
      <va-input
        v-model="input"
        label="validation on change"
        :rules="[value => value === 'hello' || 'should be hello']"
      />
    </va-form>
  `,
})

ValidationRules.play = async ({ canvasElement, step }) => {
  const canvas = within(canvasElement)
  const firstInput = canvas.getByRole('textbox', { name: 'immediate validation' }) as HTMLElement
  const secondInput = canvas.getByRole('textbox', { name: 'validation on change' }) as HTMLElement

  await step('Displays error message', async () => {
    expect(firstInput.getAttribute('aria-invalid')).toEqual('true')
  })

  await step('Does not display error message', async () => {
    expect(secondInput.getAttribute('aria-invalid')).toEqual('false')
  })
}

export const HideErrorMessages = () => ({
  components: { VaForm, VaInput, VaButton },
  data: () => ({ input: 'error' }),
  template: `
    [hidden]
    <va-form
      class="flex max-w-sm"
      ref="rulesFormRef"
      immediate
      :hideErrorMessages="true"
    >
      <va-input
        v-model="input"
        label="with no error message"
        :rules="[value => 'error']"
      />
    </va-form>
    [default]
    <va-form
      class="flex max-w-sm"
      ref="rulesFormRef"
      immediate
      :hideErrorMessages="false"
    >
      <va-input
        v-model="input"
        label="with error message"
        :rules="[value => 'error']"
      />
    </va-form>
  `,
})

HideErrorMessages.play = async ({ step }) => {
  const [firstDefinedInput, secondDefineInput] = document.querySelectorAll('div.va-input-wrapper > div.va-message-list')

  await step('Does not display validation error', async () => {
    expect(firstDefinedInput).toBeDefined()
  })

  await step('Displays validation error', async () => {
    expect(secondDefineInput).toBeUndefined()
  })
}

export const HideErrors = () => ({
  components: { VaForm, VaInput, VaButton },
  data: () => ({ input: 'error' }),
  template: `
    [hidden]
    <va-form
      class="flex max-w-sm"
      immediate
      :hideErrors="true"
    >
      <va-input
        v-model="input"
        label="with no error highlight"
        :rules="[value => 'error']"
      />
    </va-form>
    [default]
    <va-form
      class="flex max-w-sm"
      immediate
      :hideErrors="false"
    >
      <va-input
        v-model="input"
        label="with error highlight"
        :rules="[value => 'error']"
      />
    </va-form>
  `,
})

HideErrors.play = async ({ step }) => {
  const [firstInput, secondInput] = document.querySelectorAll('div.va-input-wrapper')

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
    <va-form 
      class="flex space-x-2 mb-6 max-w-sm" 
      ref="focusForm"
    >
      <va-input
        label="should be focused"
      />
      <va-input
        label="should not be focused"
      />
    </va-form>
    <va-button @click="$refs.focusForm.focus()">
      Focus first input
    </va-button>
  `,
})

Focus.play = async ({ canvasElement, step }) => {
  const canvas = within(canvasElement)
  const firstInput = canvas.getByRole('textbox', { name: 'should be focused' }) as HTMLElement
  const secondInput = canvas.getByRole('textbox', { name: 'should not be focused' }) as HTMLElement
  const button = canvas.getByRole('button', { name: 'Focus first input' }) as HTMLElement

  await step('Focusses first input', async () => {
    await userEvent.click(button)
    expect(firstInput).toHaveFocus()
  })

  await step('Does not focus first input', async () => {
    await userEvent.click(button)
    expect(secondInput).not.toHaveFocus()
  })
}

export const FocusInvalid = () => ({
  components: { VaForm, VaInput, VaButton },
  template: `
    <va-form 
      class="flex space-x-2 mb-6 max-w-sm" 
      ref="focusInvalidForm"
    >
      <va-input 
        label="valid"
      />
      <va-input 
        label="invalid"
        error 
      />
    </va-form>
    <va-button @click="$refs.focusInvalidForm.focusInvalidField()">
      Focus invalid
    </va-button>
  `,
})

FocusInvalid.play = async ({ canvasElement, step }) => {
  const canvas = within(canvasElement)
  const firstInput = canvas.getByRole('textbox', { name: 'valid' }) as HTMLElement
  const secondInput = canvas.getByRole('textbox', { name: 'invalid' }) as HTMLElement
  const button = canvas.getByRole('button', { name: 'Focus invalid' }) as HTMLElement

  await step('Focusses invalid input', async () => {
    await userEvent.click(button)
    expect(secondInput).toHaveFocus()
  })

  await step('Does not focus invalid input', async () => {
    await userEvent.click(button)
    expect(firstInput).not.toHaveFocus()
  })
}

export const ValidateAndResetValidation = () => ({
  components: { VaForm, VaInput, VaButton },
  data: () => ({ input: 'do not reset' }),
  template: `
    <va-form 
      class="flex space-x-2 mb-6 max-w-sm" 
      ref="validateAndResetValidationForm"
    >
      <va-input
        v-model="input"
        label="prop is not reset"
      />
      <va-input
        label="validated rule is reset"
        :rules="[() => 'error']"
      />
    </va-form>
    <div class="space-x-2">
      <va-button @click="$refs.validateAndResetValidationForm.validate()">
        Validate
      </va-button>
      <va-button @click="$refs.validateAndResetValidationForm.resetValidation()">
        Reset validation
      </va-button>
    </div>
  `,
})

ValidateAndResetValidation.play = async ({ canvasElement, step }) => {
  const canvas = within(canvasElement)
  const firstInput = canvas.getByRole('textbox', { name: 'prop is not reset' }) as HTMLElement
  const secondInput = canvas.getByRole('textbox', { name: 'validated rule is reset' }) as HTMLElement
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
  data: () => ({ username: 'root', password: 'admin' }),
  template: `
    <va-form
      class="flex flex-col max-w-sm"
      tag="form"
      ref="resetForm"
      immediate
    >
      <va-input
        v-model="username"
        label="Username"
      />
      <va-input
        class="mt-2"
        v-model="password"
        label="Password"
      />
      <va-input
        class="mt-2"
        label="Error"
        :rules="[() => 'error']"
      />
      <va-button 
        class="mt-2"
        type="submit" 
        @click.prevent="$refs.resetForm.reset()"
      >
        Reset inputs and validation
      </va-button>
    </va-form>
  `,
})

Reset.play = async ({ canvasElement, step }) => {
  const canvas = within(canvasElement)
  const firstInput = canvas.getByRole('textbox', { name: 'Username' }) as HTMLElement
  const secondInput = canvas.getByRole('textbox', { name: 'Password' }) as HTMLElement
  const thirdInput = canvas.getByRole('textbox', { name: 'Error' }) as HTMLElement
  const button = canvas.getByRole('button', { name: 'Reset inputs and validation' }) as HTMLElement

  await step('Resets form', async () => {
    await userEvent.click(button)
    expect(firstInput).toHaveValue('')
    expect(secondInput).toHaveValue('')
    expect(thirdInput.getAttribute('aria-invalid')).toEqual('false')
  })
}

export const FormSubmit = () => ({
  components: { VaForm, VaInput, VaButton },
  data: () => ({ isSubmit: false }),
  template: `
    <va-form
      class="flex flex-col max-w-sm"
      tag="form"
      ref="formSubmit"
      @submit.prevent="isSubmit = true"
    >
      <va-input
        stateful
        label="Username"
        :rules="[value => value.length >= 5 && value.length <= 16 || 'username must contain 5-16 characters']"
      />
      <va-input
        class="mt-2"
        stateful
        type="password"
        label="Password"
        :rules="[value => value.length >= 8 || 'password must be at least 8 characters']"
      />
      <va-button 
        class="mt-2"
        type="submit" 
        @click="$refs.formSubmit.validate()"
      >
        Login
      </va-button>
    </va-form>
    <div 
      v-if="isSubmit" 
      first-submit
    >
      First submit!
    </div>
  `,
})
