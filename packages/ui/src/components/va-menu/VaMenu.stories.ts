import VaMenu from './VaMenu.vue'

export default {
  title: 'VaMenu',
  component: VaMenu,
}

export const Default = () => ({
  components: { VaMenu },
  data: () => ({
    options: ['Option 1', 'Option 2', 'Option 3'],
    value: false,
  }),
  template: `
  <VaMenu :options="options">
    <template #anchor>
      <button>Open menu</button>
    </template>
  </VaMenu>
  `,
})

export const OptionSelected = () => ({
  components: { VaMenu },
  data: () => ({
    options: ['Option 1', 'Option 2', 'Option 3'],
    value: false,
  }),
  template: `
  [value]: {{ value }}
  <br/>
  <VaMenu :options="options" @selected="(v) => value = v ">
    <template #anchor>
      <button>Open menu</button>
    </template>
  </VaMenu>
  `,
})
