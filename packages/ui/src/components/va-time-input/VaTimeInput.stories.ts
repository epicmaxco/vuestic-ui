import { defineStory } from './../../../.storybook/types'
import VaTimeInputDemo from './VaTimeInput.demo.vue'
import VaTimeInput from './VaTimeInput.vue'

export default {
  title: 'VaTimeInput',
  component: VaTimeInput,
}

export const OldDemos = () => ({
  components: { VaTimeInputDemo },
  template: '<VaTimeInputDemo />',
})

export const Default = () => ({
  components: { VaTimeInput },
  template: '<VaTimeInput/>',
})

export const Loading = () => ({
  components: { VaTimeInput },
  template: '<VaTimeInput loading />',
})

export const Placeholder = () => ({
  components: { VaTimeInput },
  data () {
    return { value: null }
  },
  template: '<VaTimeInput v-model="value" placeholder="Please, select a time" />',
})

export const Clearable = defineStory({
  story: () => ({
    components: { VaTimeInput },
    data () {
      return {
        value: new Date('2020-01-01T00:00:00.000Z'),
      }
    },
    template: '<VaTimeInput clearable v-model="value" />',
  }),

  async tests ({ canvasElement, expect, event }) {
    const leftIcon = canvasElement.querySelector('.va-input-wrapper__field')!
    const clearButton = canvasElement.querySelector('.va-time-input__clear-button')!
    const input = canvasElement.querySelector('input')!

    await event.click(leftIcon)

    // Dropdown should be visible
    expect(canvasElement.parentElement!.querySelector('.va-time-picker')).not.toBe(null)

    await event.click(clearButton)

    expect(input).toHaveValue('')
    // Dropdown should be hidden
    expect(canvasElement.querySelector('.va-dropdown__content')).toBe(null)
  },
})

export const Validation = defineStory({
  story: () => ({
    components: { VaTimeInput },
    data () {
      return {
        value: new Date('2020-01-01T00:00:00.000Z'),
      }
    },
    template: `
      <VaTimeInput v-model="value" :rules="[(v) => v.getHours() === 4 || 'Must be 4 AM']" ref="component" />
    `,
  }),

  async tests ({ canvasElement, step, expect }) {
    step('Expect error when mounted even if value is incorrect', () => {
      const error = canvasElement.querySelector('.va-input-wrapper.va-input-wrapper--error') as HTMLElement
      expect(error).toBeNull()
    })
  },
})

export const ValidationImmediate = defineStory({
  story: () => ({
    components: { VaTimeInput },
    data () {
      return {
        value: new Date('2020-01-01T00:00:00.000Z'),
      }
    },
    template: `
      <VaTimeInput v-model="value" :rules="[(v) => v.getHours() === 4 || 'Must be 4 AM']" ref="component" />
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
    components: { VaTimeInput },
    data () {
      return {
        value: new Date('2020-01-01T00:00:00.000Z'),
      }
    },
    template: `
      [isDirty]: {{ $refs.component?.isDirty }}
      <VaTimeInput v-model="value" :rules="[(v) => v.getHours() === 4 || 'Must be 4 AM']" ref="component" />
    `,
  }),

  async tests ({ canvasElement, step, expect, event, sleep }) {
    step('Expect no error when mounted even if value is incorrect', () => {
      const error = canvasElement.querySelector('.va-input-wrapper.va-input-wrapper--error') as HTMLElement
      expect(error).toBeNull()
    })

    step('Expect error when value changed', async () => {
      await event.click(canvasElement.querySelector('.va-input-wrapper__field')!)

      await sleep(100)
      const twoAm = document.body.querySelectorAll('.va-time-picker-cell')[2] as HTMLElement

      await event.hover(twoAm)
      await event.click(twoAm)

      await sleep(300)

      const error = canvasElement.querySelector('.va-input-wrapper.va-input-wrapper--error') as HTMLElement
      expect(error).not.toBeNull()
    })
  },
})

export const ValidationTouchedState = defineStory({
  story: () => ({
    components: { VaTimeInput },
    data () {
      return {
        value: new Date('2020-01-01T00:00:00.000Z'),
      }
    },
    methods: {
      reset () {
        this.$refs.component?.reset()
      },
    },
    template: `
      [isTouched]: {{ $refs.component?.isTouched }}
      <VaTimeInput v-model="value" :rules="[(v) => v && v.getHours() === 4 || 'Must be 4 AM']" ref="component" />
    `,
  }),

  async tests ({ canvasElement, step, expect, event, sleep, methods }) {
    step('Expect no error when mounted even if value is incorrect', () => {
      const error = canvasElement.querySelector('.va-input-wrapper.va-input-wrapper--error') as HTMLElement
      expect(error).toBeNull()
    })

    step('Expect error when open/closed', async () => {
      await event.hover(canvasElement.querySelector('.va-input-wrapper__field')!)
      await event.click(canvasElement.querySelector('.va-input-wrapper__field')!)

      await event.hover(canvasElement.querySelector('.va-input-wrapper__field')!)
      await event.click(canvasElement.querySelector('.va-input-wrapper__field')!)

      const error = canvasElement.querySelector('.va-input-wrapper.va-input-wrapper--error') as HTMLElement
      expect(error).not.toBeNull()
    })

    step('Expect error input touched', async () => {
      methods.reset()

      await event.focus(canvasElement.querySelector('.va-input-wrapper__field')!)
      await event.blur(canvasElement.querySelector('.va-input-wrapper__field')!)

      await sleep(100)

      const error = canvasElement.querySelector('.va-input-wrapper.va-input-wrapper--error') as HTMLElement
      expect(error).not.toBeNull()
    })
  },
})
