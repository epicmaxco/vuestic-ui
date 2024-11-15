import { defineComponent, computed, ref, watch } from 'vue'
import { useElementBackground } from './useElementBackground'
import { useCurrentElement } from '../internal/useCurrentElement'
import { VaButton } from '../../../components/va-button'
import { within } from '@storybook/testing-library'
import { sleep } from '../../../utils/sleep'
import { expect } from '@storybook/jest'
import { StoryFn } from '@storybook/vue3'

const UseElementBackgroundDummy = defineComponent({
  setup (props, { emit }) {
    const color = computed(() => useElementBackground(useCurrentElement()))

    watch(color, (value) => emit('update:color', value), { immediate: true })

    return { color }
  },
  template: '<div style="width: 2rem; height: 2rem;" />',
})

export default {
  title: 'composables/useElementBackground',
}

export const Default: StoryFn = () => ({
  components: { VaButton, UseElementBackgroundDummy },
  data () {
    return {
      background: '#000',
      color: null,
    }
  },
  template: `
  <UseElementBackgroundDummy
    :style="{ background }"
    @update:color="color = $event"
  />
  <p>Color detected: <span data-testid="color">{{color}}</span></p>
  <va-button @click="background = '#000'">black</va-button>
  <va-button @click="background = '#fff'">white</va-button>
`,
})

Default.play = async ({ canvasElement, step }) => {
  const canvas = within(canvasElement)
  const color = canvas.getByTestId('color') as HTMLElement
  const black = canvas.getByText('black') as HTMLElement
  const white = canvas.getByText('white') as HTMLElement

  await sleep()

  await step('should match white', async () => {
    white.click()
    // Timing before update seems pretty random.
    // That might be something we want to account for on usage.
    // 20 ms was a sweet spot for me, 10 was too low.
    await sleep(1000)
    expect(color.innerText).toBe('#ffffffff')
  })
  await step('should match black', async () => {
    black.click()
    await sleep(1000)
    expect(color.innerText).toBe('#000000ff')
  })
}

export const WithTransition = () => ({
  data () {
    return {
      styles: {
        background: '#000',
        color: '#fff',
      },
    }
  },

  setup () {
    return {
      color: useElementBackground(useCurrentElement()),
    }
  },

  template: `
<div :style="{ ...styles, transition: 'all 0.5s ease-in-out' }">
  <button @click="styles = { background: '#000', color: '#fff' }">Black</button>
  <button @click="styles = { background: '#fff', color: '#000' }">White</button>

  <div>Current color: {{ color }}</div>
</div>
`,
})

export const WithOpacity = () => ({
  data () {
    return {
      styles: {
        background: 'rgba(0, 0, 0, 0.5)',
        color: '#fff',
      },
    }
  },

  setup () {
    return {
      color: useElementBackground(useCurrentElement()),
    }
  },

  template: `
<div :style="{ ...styles }">
  <button @click="styles = { background: 'rgba(0, 0, 0, 0.5)', color: '#fff' }">Black</button>
  <button @click="styles = { background: 'rgba(255, 255, 255, 0.5)', color: '#000' }">White</button>

  <div>Current color: {{ color }}</div>
</div>
`,
})

export const WithOpacityAndParentWithDynamicBg = () => ({
  data () {
    return {
      styles: {
        background: 'red',
        color: '#fff',
      },
    }
  },

  components: {
    Child: defineComponent({
      setup () {
        return {
          color: useElementBackground(useCurrentElement()),
        }
      },
      template: '<div style="background: rgba(0, 0, 0, 0.5)" >Current color: {{ color }}</div>',
    }),
  },

  template: `
<div :style="{ ...styles, color: '#fff' }">
  <button @click="styles = { background: 'red', color: '#fff' }">Red</button>
  <button @click="styles = { background: 'blue', color: '#000' }">Blue</button>

  <Child />
</div>
`,
})

export const MultipleParentWithDynamicBg = () => ({
  data () {
    return {
      styles: {
        background: 'red',
        color: '#fff',
      },
    }
  },

  components: {
    Child: defineComponent({
      setup () {
        return {
          color: useElementBackground(useCurrentElement()),
        }
      },
      template: '<div style="background: rgba(0, 0, 0, 0.5)" >Current color: {{ color }}</div>',
    }),
  },

  template: `
  <div style="background: rgba(255, 255, 255, 0.5)">
    <div :style="{ ...styles, color: '#fff' }">
      <button @click="styles = { background: 'rgba(255, 0, 0, 0.3)' }">Red</button>
      <button @click="styles = { background: 'rgba(0, 0, 255, 0.3)' }">Blue</button>

      <Child />
      <div style="background: rgba(255, 255, 0, 0.5)">
        <Child />
      </div>
    </div>
  </div>
`,
})

export const WithOpacityAndWillChange = () => ({
  data () {
    return {
      styles: {
        background: 'red',
        color: '#fff',
      },
    }
  },

  components: {
    Child: defineComponent({
      setup () {
        return {
          color: useElementBackground(useCurrentElement()),
        }
      },
      template: '<div style="background: rgba(0, 0, 0, 0.5)">Current color: {{ color }}</div>',
    }),
  },

  template: `
<div :style="{ ...styles, willChange: 'background' }">
  <button @click="styles = { background: 'red', color: '#fff' }">Red</button>
  <button @click="styles = { background: 'rgba(0, 0, 255, 0.5)', color: '#fff' }">Transparent Blue</button>

  <Child />
</div>
`,
})
