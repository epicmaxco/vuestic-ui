import { defineComponent } from 'vue'
import VaOptionListDemo from './VaOptionList.demo.vue'
import VaOptionList from './VaOptionList.vue'
import { StoryFn } from '@storybook/vue3'

export default {
  title: 'VaOptionList',
  component: VaOptionList,
}

export const Default: StoryFn = () => ({
  components: { VaOptionListDemo },
  template: '<VaOptionListDemo/>',
})

export const StatefulWithDefaultValue: StoryFn = () => ({
  components: { VaOptionList },
  setup () {
    const planeOptions = ['test1', 'test2', 'test3']
    return {
      planeOptions,
    }
  },
  template: '<VaOptionList :options="planeOptions" stateful :defaultValue="[planeOptions[0], planeOptions[2]]" />',
})
