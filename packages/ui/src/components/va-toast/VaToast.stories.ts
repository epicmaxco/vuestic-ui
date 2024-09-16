import { defineComponent } from 'vue'
import VaToastDemo from './VaToast.demo.vue'
import VaToast from './VaToast.vue'
import { StoryFn } from '@storybook/vue3'
import { expect } from '@storybook/jest'
import { useToast } from './index'

export default {
  title: 'VaToast',
  component: VaToast,
}

export const Default = () => defineComponent({
  components: { VaToastDemo },
  template: '<VaToastDemo/>',
})

export const Color: StoryFn = () => ({
  components: { VaToast: VaToast },
  template: `
[primary]
<VaToast inline title="Title" message="Message" :duration="99999999" />

[#111111]
<VaToast inline color="#111111" title="Title" message="Message" :duration="99999999" />

[#eeeeee]
<VaToast inline color="#eeeeee" title="Title" message="Message" :duration="99999999" />

[danger]
<VaToast inline color="danger" title="Title" message="Message" :duration="99999999" />
`,
})

export const PositionBottomLeft: StoryFn = () => ({
  components: { VaToast: VaToast },

  setup () {
    const { notify } = useToast()

    return {
      notify,
    }
  },

  template: '<button @click="notify({ message: \'Test\', position: \'bottom-left\' })">Show</button>',
})

export const PositionTopLeft: StoryFn = () => ({
  components: { VaToast: VaToast },

  setup () {
    const { notify } = useToast()

    return {
      notify,
    }
  },

  template: '<button @click="notify({ message: \'Test\', position: \'top-left\' })">Show</button>',
})

export const PositionTopCenter: StoryFn = () => ({
  components: { VaToast: VaToast },

  setup () {
    const { notify } = useToast()

    return {
      notify,
    }
  },

  template: '<button @click="notify({ message: \'Test\', position: \'top-center\' })">Show</button>',
})

export const PositionBottomCenter: StoryFn = () => ({
  components: { VaToast: VaToast },

  setup () {
    const { notify } = useToast()

    return {
      notify,
    }
  },

  template: '<button @click="notify({ message: \'Test\', position: \'bottom-center\' })">Show</button>',
})
