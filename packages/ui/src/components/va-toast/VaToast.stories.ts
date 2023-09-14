import { defineComponent } from 'vue'
import VaToastDemo from './VaToast.demo.vue'
import VaToast from './VaToast.vue'
import { StoryFn } from '@storybook/vue3'
import { expect } from '@storybook/jest'

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
[Dark color]
<VaToast inline color="#111111" title="Title text" message="Message text" :duration="99999999" />

[Light color]
<VaToast inline color="#eeeeee" title="Title text" message="Message text" :duration="99999999" />

[Color from config]
<VaToast inline color="danger" title="Title text" message="Message text" :duration="99999999" />
`,
})
