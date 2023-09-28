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
  data: () => ({ value: 0 }),
  template: `
    [default: 500]
    <VaCounter 
      v-model="value" 
    />
    [1500]
    <VaCounter 
      v-model="value" 
      :longPressDelay="1500"
    />
  `,
})

export const Stateful = () => ({
  components: { VaCounter },
  template: `
    [true]
    <VaCounter stateful />
    [false]
    <VaCounter :stateful="false" />
  `,
})

export const Min = () => ({
  components: { VaCounter },
  data: () => ({ value: 0 }),
  template: `
    <VaCounter 
      v-model="value" 
      :min="0"
    />
  `,
})

export const Max = () => ({
  components: { VaCounter },
  data: () => ({ value: 0 }),
  template: `
    <VaCounter 
      v-model="value" 
      :max="0"
    />
  `,
})

export const Step = () => ({
  components: { VaCounter },
  data: () => ({ value: 0 }),
  template: `
    [2]
    <VaCounter 
      v-model="value" 
      :step="2" 
    />
  `,
})

export const ManualInput = () => ({
  components: { VaCounter },
  template: `
    [true]
    <VaCounter manualInput />
    [false]
    <VaCounter :manualInput="false" />
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
    [default]
    <VaCounter />
    [solid]
    <VaCounter preset="solid" />
    [bordered]
    <VaCounter preset="bordered" />
  `,
})

export const Buttons = () => ({
  components: { VaCounter },
  template: `
    [true]
    <VaCounter buttons />
    [false]
    <VaCounter :buttons="false" />
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
    [default: 4px]
    <VaCounter buttons />
    [8px]
    <VaCounter buttons margins="8px"/>
    [12x]
    <VaCounter buttons margins="12px"/>
  `,
})

export const Flat = () => ({
  components: { VaCounter },
  template: `
    [true]
    <VaCounter 
      flat 
      buttons 
    />
    [false]
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

addText(Error, "There's a problem with negative numbers while an icon is rendered", 'stale')

export const ErrorMessages = () => ({
  components: { VaCounter },
  template: `
    <VaCounter 
      error
      errorMessages="error"
    />
  `,
})

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

addText(Rules, "Validation doesn't work!", 'broken')

export const Success = () => ({
  components: { VaCounter },
  template: `
    <VaCounter 
      success 
      messages="success"
    />
  `,
})

export const ContentSlot = () => ({
  components: { VaCounter },
  template: `
    <VaCounter>
      <template #content>
        [c]
      </template>
    </VaCounter>
  `,
})

export const DecreaseActionSlot = () => ({
  components: { VaCounter },
  template: `
    <VaCounter>
      <template #decreaseAction>
        [dA]
      </template>
    </VaCounter>
  `,
})

export const IncreaseActionSlot = () => ({
  components: { VaCounter },
  template: `
    <VaCounter>
      <template #increaseAction>
        [iA]
      </template>
    </VaCounter>
  `,
})