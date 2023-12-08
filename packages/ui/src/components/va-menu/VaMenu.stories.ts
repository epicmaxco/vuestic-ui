import VaMenu from './VaMenu.vue'
import { VaButton } from '../va-button'
import VaMenuItem from '../va-menu-list/components/VaMenuItem.vue'

export default {
  title: 'VaMenu',
  component: VaMenu,
  tags: ['autodocs'],
}

export const Default = () => ({
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

export const MenuListSlot = () => ({
  components: { VaMenu, VaMenuItem, VaButton },
  template: `
  <VaMenu @selected="(v) => value = v ">
    <template #anchor>
      <VaButton>Open</VaButton>
    </template>
    <VaMenuItem>Item 1</VaMenuItem>
    <VaMenuItem>Item 2</VaMenuItem>
  </VaMenu>
  `,
})
