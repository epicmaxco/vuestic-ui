import { addText } from '../../../.storybook/interaction-utils/addText'
import { userEvent } from '../../../.storybook/interaction-utils/userEvent'
import { expect } from '@storybook/jest'
import VaCounter from './VaCounter.vue'
import { StoryFn } from '@storybook/vue3'
import { defineStory } from '../../../.storybook/types'

export default {
  title: 'VaCounter',
  component: VaCounter,
  tags: ['autodocs'],
}

export const Default: StoryFn = () => ({
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

export const Stateful: StoryFn = () => ({
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

export const Min: StoryFn = () => ({
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

export const Max: StoryFn = () => ({
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

export const Step: StoryFn = () => ({
  components: { VaCounter },
  template: `
    <VaCounter
      stateful
      :step="2"
    />

    <VaCounter
      stateful
      :step="0.1"
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
  data () { return { value: 0 } },
  template: `
    <VaCounter v-model="value" disabled />
  `,
})

export const Readonly = () => ({
  components: { VaCounter },
  data () { return { value: 0 } },
  template: `
    <VaCounter v-model="value" readonly />
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

export const Validation = defineStory({
  story: () => ({
    components: { VaCounter },
    data () {
      return {
        value: 0,
      }
    },
    template: `
      <VaCounter v-model="value" :rules="[(v) => v > 1 || 'Min length is 2']" ref="component" />
    `,
  }),

  async tests ({ canvasElement, step, expect, event, sleep }) {
    step('Expect error when mounted even if value is incorrect', () => {
      // No error until value is entered
      const error = canvasElement.querySelector('.va-input-wrapper.va-input-wrapper--error') as HTMLElement
      expect(error).toBeNull()
    })
  },
})

export const ValidationImmediate = defineStory({
  story: () => ({
    components: { VaCounter },
    data () {
      return {
        value: 0,
      }
    },
    template: `
      <VaCounter v-model="value" :rules="[(v) => v > 1 || 'Min length is 2']" ref="component" immediate-validation />
    `,
  }),

  async tests ({ canvasElement, step, expect }) {
    step('Expect error when mounted even if value is incorrect', () => {
      const error = canvasElement.querySelector('.va-input-wrapper.va-input-wrapper--error') as HTMLElement
      expect(error).not.toBeNull()
    })
  },
})

export const ValidationDirtyState = defineStory({
  story: () => ({
    components: { VaCounter },
    data () {
      return {
        value: 0,
      }
    },
    template: `
      [isDirty]: {{ $refs.component?.isDirty }}
      <VaCounter v-model="value" :rules="[(v) => v > 1 || 'Min length is 2']" ref="component" />
    `,
  }),

  async tests ({ canvasElement, step, expect, event, sleep }) {
    const hasErrorClass = () => canvasElement.querySelector('.va-input-wrapper.va-input-wrapper--error') !== null

    step('Expect no error when mounted even if value is incorrect', () => {
      const error = canvasElement.querySelector('.va-input-wrapper.va-input-wrapper--error') as HTMLElement
      expect(error).toBeNull()
    })

    step('Expect error when value entered', async (context) => {
      await event.click(canvasElement.querySelectorAll('.va-button')![1])

      expect(hasErrorClass()).toBe(true)

      expect(canvasElement.textContent).toContain('[isDirty]: true')

      await event.click(canvasElement.querySelectorAll('.va-button')![1])
      // Value satisfies the rule
      expect(hasErrorClass()).toBe(false)
    })
  },
})

export const ValidationTouchedState = defineStory({
  story: () => ({
    components: { VaCounter },
    data () {
      return {
        value: 0,
      }
    },
    template: `
      [isTouched]: {{ $refs.component?.isTouched }}
      <VaCounter v-model="value" :rules="[(v) => v > 1 || 'Min length is 2']" ref="component" />
    `,
  }),

  async tests ({ canvasElement, step, expect, event, sleep, methods }) {
    step('Expect error when input blur', async () => {
      await event.focus(canvasElement.querySelector('.va-input-wrapper')!)
      await event.blur(canvasElement.querySelector('.va-input-wrapper')!)

      const error = canvasElement.querySelector('.va-input-wrapper.va-input-wrapper--error') as HTMLElement
      expect(error).not.toBeNull()
    })
  },
})
