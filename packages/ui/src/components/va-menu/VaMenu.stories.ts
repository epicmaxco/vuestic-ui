import { defineComponent } from 'vue'
import VaMenu from './VaMenu.vue'
import VaMenuDemo from './VaMenu.demo.vue'
import { VaAvatar } from '../'

export default {
  title: 'VaMenu',
  component: VaMenu,
}

export const Default = () => ({
  components: { VaMenuDemo },
  template: '<VaMenuDemo/>',
})

export const IconSlot = () => ({
  components: { VaMenu, VaAvatar },
  data: () => ({
    options: [
      { id: '0', text: 'one', value: 'one', icon: 'accessible_forward', rightIcon: '', disabled: true, group: '' },
      { id: '1', text: 'two', value: 'two', icon: '', rightIcon: 'accessible_forward', group: 'A1' },
      { id: '2', text: 'three', value: 'three', icon: 'accessible_forward', rightIcon: '', group: 'A1' },
      { id: '3', text: 'four', value: 'four', icon: '', rightIcon: 'accessible_forward', disabled: true, group: 'A2' },
      { id: '4', text: 'five', value: 'five', icon: 'accessible_forward', rightIcon: '', group: 'A2' },
    ],
    value: false,
  }),
  template: `
  <VaMenu :options="options" v-model="value">
    <template #left-icon>
      <va-avatar src="https://randomuser.me/api/portraits/men/2.jpg" />
    </template>
  </VaMenu>
  `,
})
