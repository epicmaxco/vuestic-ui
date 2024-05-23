import { userEvent } from '@storybook/testing-library'
import { defineComponent } from 'vue'
import VaSwitchDemo from './VaSwitch.demo.vue'
import VaSwitch from './VaSwitch.vue'
import { defineStory } from '../../../.storybook/types'

export default {
  title: 'VaSwitch',
  component: VaSwitch,
}

export const Default = () => defineComponent({
  components: { VaSwitch: VaSwitchDemo },
  template: '<VaSwitch/>',
})

export const ChangeEvent = defineStory({
  story: () => ({
    components: { VaSwitch },

    data: () => ({ value: false, changeCount: 0, lastEventValue: null }),

    methods: {
      onChange (e: InputEvent) {
        this.changeCount++
        this.lastEventValue = (e.target as HTMLInputElement).checked
      },
    },

    template: `
      <p>change count: <span data-testid="count">{{ changeCount }}</span></p>
      <p>last event value: <span data-testid="value">{{ lastEventValue }}</span></p>
      <VaSwitch v-model="value" @change="onChange" />
    `,
  }),

  async tests ({ canvasElement, step, expect, event }) {
    const input = canvasElement.querySelector('input')!
    const changesCounter = canvasElement.querySelector('[data-testid="count"]')!
    const changesValue = canvasElement.querySelector('[data-testid="value"]')!

    await userEvent.click(input)

    expect(changesCounter.textContent).toContain('1')
    expect(changesValue.textContent).toContain('true')

    await userEvent.keyboard(' ')

    expect(changesCounter.textContent).toContain('2')
    expect(changesValue.textContent).toContain('false')

    await userEvent.keyboard('{enter}')

    expect(changesCounter.textContent).toContain('3')
    expect(changesValue.textContent).toContain('true')
  },
})

export const Validation = defineStory({
  story: () => ({
    components: { VaSwitch },
    data () {
      return {
        value: 0,
      }
    },
    template: `
      <VaSwitch v-model="value" :rules="[(v) => v == true || 'Required']" ref="component" />
    `,
  }),

  async tests ({ canvasElement, step, expect, event, sleep }) {
    step('Expect error when mounted even if value is incorrect', () => {
      // No error until value is entered
      const error = canvasElement.querySelector('.va-switch--error') as HTMLElement
      expect(error).toBeNull()
    })
  },
})

export const ValidationImmediate = defineStory({
  story: () => ({
    components: { VaSwitch },
    data () {
      return {
        value: 0,
      }
    },
    template: `
      <VaSwitch v-model="value" :rules="[(v) => v == true || 'Required']" ref="component" immediate-validation />
    `,
  }),

  async tests ({ canvasElement, step, expect }) {
    step('Expect error when mounted even if value is incorrect', () => {
      const error = canvasElement.querySelector('.va-switch--error') as HTMLElement
      expect(error).not.toBeNull()
    })
  },
})

export const ValidationDirtyState = defineStory({
  story: () => ({
    components: { VaSwitch },
    data () {
      return {
        value: 0,
      }
    },
    template: `
      [isDirty]: {{ $refs.component?.isDirty }}
      <VaSwitch v-model="value" :rules="[(v) => v == true || 'Required']" ref="component" />
    `,
  }),

  async tests ({ canvasElement, step, expect, event, sleep }) {
    const hasErrorClass = () => canvasElement.querySelector('.va-switch--error') !== null

    step('Expect no error when mounted even if value is incorrect', () => {
      const error = canvasElement.querySelector('.va-switch--error') as HTMLElement
      expect(error).toBeNull()
    })

    step('Expect error when value entered', async (context) => {
      await event.click(canvasElement.querySelector('input')!)

      expect(hasErrorClass()).toBe(false)

      await event.click(canvasElement.querySelector('input')!)

      expect(hasErrorClass()).toBe(true)

      expect(canvasElement.textContent).toContain('[isDirty]: true')
    })
  },
})

export const ValidationTouchedState = defineStory({
  story: () => ({
    components: { VaSwitch },
    data () {
      return {
        value: 0,
      }
    },
    template: `
      [isTouched]: {{ $refs.component?.isTouched }}
      <VaSwitch v-model="value" :rules="[(v) => v == true || 'Required']" ref="component" />
    `,
  }),

  async tests ({ canvasElement, step, expect, event, sleep, methods }) {
    step('Expect error when input blur', async () => {
      await sleep(100)

      await event.focus(canvasElement.querySelector('input')!)
      await event.blur(canvasElement.querySelector('input')!)

      const error = canvasElement.querySelector('.va-switch--error') as HTMLElement
      expect(error).not.toBeNull()
    })
  },
})
