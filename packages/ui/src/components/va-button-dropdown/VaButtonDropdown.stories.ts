import { defineComponent } from 'vue'
import VaButtonDropdownDemo from './VaButtonDropdown.demo.vue'
import VaButtonDropdown from './VaButtonDropdown.vue'
import { StoryFn } from '@storybook/vue3'

export default {
  title: 'VaButtonDropdown',
  component: VaButtonDropdownDemo,
}

export const OldDemos = defineComponent({
  components: { VaButtonDropdownDemo },
  template: '<VaButtonDropdownDemo />',
})

export const Default: StoryFn = () => ({
  components: { VaButtonDropdown },
  template: `
    <VaButtonDropdown />
  `,
})
