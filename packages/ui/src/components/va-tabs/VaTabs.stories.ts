import { defineComponent } from 'vue'
import { VaTab, VaTabs } from './index'
import VaTabsDemo from './VaTabs.demo.vue'
import { defineStory } from '../../../.storybook/types'

export default {
  title: 'VaTabs',
  component: VaTabs,
}

export const Default = defineStory({
  story: () => ({
    components: { VaTabsDemo },
    template: '<VaTabsDemo />',
  }),
})

export const WithScroll = defineStory({
  story: () => ({
    components: { VaTabs: VaTabs, VaTab },
    data () {
      return {
        tabValue: 'tab1',
        tabStatic: ['Tab 1', 'Tab 2', 'Tab 3', 'Tab 4', 'Tab 5', 'Tab 6'],
      }
    },
    template: `
      <va-tabs v-model="tabValue" style="max-width: 230px;">
        <template #tabs>
          <va-tab
            v-for="title in tabStatic"
            :name="title"
            :key="title"
          >
            {{ title }}
          </va-tab>
        </template>
      </va-tabs>
    `,
  }),
})
