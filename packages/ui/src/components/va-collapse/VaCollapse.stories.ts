import { StoryFn } from '@storybook/vue3'
import { defineComponent } from 'vue'
import VaCollapseDemo from './VaCollapse.demo.vue'
import { VaCollapse } from './index'
import { userEvent } from '@storybook/testing-library'
import { expect } from '@storybook/jest'

export default {
  title: 'VaCollapse',
  component: VaCollapse,
  tags: ['autodocs'],
}

export const OldDemos = () => defineComponent({
  components: { VaCollapseDemo },
  template: '<VaCollapseDemo />',
})

export const Overflow: StoryFn = () => defineComponent({
  components: { VaCollapse },

  data: () => ({ open: true }), // Open be default

  template: `
    <VaCollapse v-model="open" style="width: 200px; height: 300px; border: 1px solid red;">
      <template #header-content>
        <div style="border: 1px solid blue">Header</div>
      </template>
      <template #content>
        <div style="height: 600px; width: 300px; background: var(--va-primary); color: var(--va-on-primary);">
          Content
        </div>
      </template>
    </VaCollapse>
  `,
})
