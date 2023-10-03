import { addText } from '../../../.storybook/interaction-utils/addText'
import { userEvent } from '../../../.storybook/interaction-utils/userEvent'
import { expect } from '@storybook/jest'
import { VaCounter } from './'

export default {
  title: 'VaCounter',
  component: VaCounter,
  tags: ['autodocs'],
}

export const Default = () => ({
  components: { VaCounter },
  data: () => ({ value: 0 }),
  template: `
    <VaCounter v-model="value" />
  `,
})

Default.play = async ({ step }) => {
  const increaseButton = document.querySelector('[aria-label="increase counter"]') as HTMLElement
  const decreaseButton = document.querySelector('[aria-label="decrease counter"]') as HTMLElement
  const input = document.querySelector('[aria-label="counter value"]') as HTMLInputElement

  await step('Increase on click', async () => {
    await userEvent.click(increaseButton)
    expect(input.value).toEqual('1')
  })

  await step('Decrease on click', async () => {
    await userEvent.click(decreaseButton)
    expect(input.value).toEqual('0')
  })
}

export const LongPressDelay = () => ({
  components: { VaCounter },
  template: `
    <p>[500]</p>
    <VaCounter stateful/>

    <p>[1500]</p>
    <VaCounter
      stateful
      :longPressDelay="1500"
    />
  `,
})

export const Stateful = () => ({
  components: { VaCounter },
  template: `
    <p>[true]</p>
    <VaCounter stateful />
    <p>[false]</p>
    <VaCounter :stateful="false" />
  `,
})

Stateful.play = async ({ step }) => {
  const increaseButtons = document.querySelectorAll('[aria-label="increase counter"]')
  const inputs = document.querySelectorAll('[aria-label="counter value"]')

  await step('Increase on click', async () => {
    await userEvent.click(increaseButtons[0])
    expect((inputs[0] as HTMLInputElement).value).toEqual('1')
  })

  await step('No effect on click', async () => {
    await userEvent.click(increaseButtons[1])
    expect((inputs[1] as HTMLInputElement).value).toEqual('0')
  })
}

export const Min = () => ({
  components: { VaCounter },
  template: `
    <VaCounter
      stateful
      :min="0"
    />
  `,
})

Min.play = async ({ step }) => {
  const decreaseButton = document.querySelector('[aria-label="decrease counter"]') as HTMLButtonElement

  await step('Decrease button must be disabled', async () => {
    expect(decreaseButton.getAttribute('aria-disabled')).toEqual('true')
  })
}

export const Max = () => ({
  components: { VaCounter },
  template: `
    <VaCounter
      stateful
      :max="0"
    />
  `,
})

Max.play = async ({ step }) => {
  const increaseButton = document.querySelector('[aria-label="increase counter"]') as HTMLElement

  await step('Increase button must be disabled', async () => {
    expect(increaseButton.getAttribute('aria-disabled')).toEqual('true')
  })
}

export const Step = () => ({
  components: { VaCounter },
  template: `
    <VaCounter
      stateful
      :step="2"
    />
  `,
})

Step.play = async ({ step }) => {
  const increaseButton = document.querySelector('[aria-label="increase counter"]') as HTMLElement
  const decreaseButton = document.querySelector('[aria-label="decrease counter"]') as HTMLElement
  const input = document.querySelector('[aria-label="counter value"]') as HTMLInputElement

  await step('Increase with step on click', async () => {
    await userEvent.click(increaseButton)
    expect(input.value).toEqual('2')
  })

  await step('Decrease with step on click', async () => {
    await userEvent.click(decreaseButton)
    expect(input.value).toEqual('0')
  })
}

export const ManualInput = () => ({
  components: { VaCounter },
  template: `
    <p>[true]</p>
    <VaCounter manualInput />
    <p>[false]</p>
    <VaCounter />
  `,
})

export const Color = () => ({
  components: { VaCounter },
  template: `
    <VaCounter color="warning" />
  `,
})

export const Background = () => ({
  components: { VaCounter },
  template: `
    <VaCounter background="warning" />
  `,
})

export const IncreaseIcon = () => ({
  components: { VaCounter },
  template: `
    <VaCounter increase-icon="arrow_upward" />
  `,
})

export const DecreaseIcon = () => ({
  components: { VaCounter },
  template: `
    <VaCounter decrease-icon="arrow_downward" />
  `,
})

export const Disabled = () => ({
  components: { VaCounter },
  template: `
    <VaCounter disabled />
  `,
})

export const Readonly = () => ({
  components: { VaCounter },
  template: `
    <VaCounter readonly />
  `,
})

export const Loading = () => ({
  components: { VaCounter },
  template: `
    <VaCounter loading />
  `,
})

export const Preset = () => ({
  components: { VaCounter },
  template: `
    <p>['']</p>
    <VaCounter />
    <p>[solid]</p>
    <VaCounter preset="solid" />
    <p>[bordered]</p>
    <VaCounter preset="bordered" />
  `,
})

export const Buttons = () => ({
  components: { VaCounter },
  template: `
    <p>[true]</p>
    <VaCounter buttons />
    <p>[false]</p>
    <VaCounter />
  `,
})

export const Rounded = () => ({
  components: { VaCounter },
  template: `
    <VaCounter buttons rounded />
  `,
})

export const Margins = () => ({
  components: { VaCounter },
  template: `
    <p>[4px]</p>
    <VaCounter buttons />
    <p>[8px]</p>
    <VaCounter buttons margins="8px"/>
    <p>[12x]</p>
    <VaCounter buttons margins="20px"/>
  `,
})

export const Flat = () => ({
  components: { VaCounter },
  template: `
    <p>[true]</p>
    <VaCounter
      buttons
    />
    <p>[false]</p>
    <VaCounter
      :flat="false"
      buttons
    />
  `,
})

export const Error = () => ({
  components: { VaCounter },
  data: () => ({ value: -1 }),
  template: `
    <VaCounter
      v-model="value"
      error
    />
  `,
})

addText(Error, "There's a problem with gap while an icon is rendered", 'stale')

export const ErrorMessages = () => ({
  components: { VaCounter },
  template: `
    <VaCounter
      error
      errorMessages="error"
    />
  `,
})
addText(
  ErrorMessages,
  "Icon doesn't belong here",
  'broken',
)

export const ErrorCount = () => ({
  components: { VaCounter },
  template: `
    <VaCounter
      error
      :errorMessages="['error1', 'error2', 'error3']"
      errorCount="2"
    />
  `,
})

export const Rules = () => ({
  components: { VaCounter },
  data: () => ({ value: 0 }),
  template: `
    <VaCounter
      v-model="value"
      :rules="[value => value > 0 || 'must be > 0']"
    />
  `,
})

export const ImmediateValidation = () => ({
  components: { VaCounter },
  data: () => ({ value: 0 }),
  template: `
    <VaCounter
      v-model="value"
      immediateValidation
      :rules="[value => value > 0 || 'must be > 0']"
    />
  `,
})
addText(
  ImmediateValidation,
  "Icon doesn't belong here",
  'broken',
)

export const Success = () => ({
  components: { VaCounter },
  template: `
    <VaCounter
      success
      messages="success"
    />
  `,
})
addText(
  Success,
  "Icon doesn't belong here",
  'broken',
)

export const ContentSlot = () => ({
  components: { VaCounter },
  template: `
    <VaCounter stateful>
      <template #content="v">
        [{{v.value}}]
      </template>
    </VaCounter>
  `,
})

export const DecreaseActionSlot = () => ({
  components: { VaCounter },
  template: `
    <VaCounter stateful>
      <template #decreaseAction="{increaseCount}">
        [dA]
      </template>
    </VaCounter>
  `,
})
addText(
  DecreaseActionSlot,
  "Click doesn't affect value",
  'broken',
)

export const IncreaseActionSlot = () => ({
  components: { VaCounter },
  template: `
    <VaCounter stateful>
      <template #increaseAction>
        [iA]
      </template>
    </VaCounter>
  `,
})
addText(
  IncreaseActionSlot,
  "Click doesn't affect value",
  'broken',
)
