import VaMenu from './VaMenu.vue'
import { VaButton } from '../va-button'

export default {
  title: 'VaMenu',
  component: VaMenu,
  tags: ['autodocs'],
}

export const Default = () => ({
  components: { VaMenu, VaButton },
  data: () => ({
  }),
  template: `
  <VaMenu>
    <template #anchor>
      <VaButton>Open</VaButton>
    </template>
  </VaMenu>
  `,
})

export const OptionSelected = () => ({
  components: { VaMenu, VaButton },
  data: () => ({
    options: ['Option 1', 'Option 2', 'Option 3'],
    value: false,
  }),
  template: `
  <VaMenu :options="options" @selected="(v) => value = v ">
    <template #anchor>
      <VaButton>Open</VaButton>
    </template>
  </VaMenu>
  <p class="mt-32">value: {{ value }}</p>
  `,
})
