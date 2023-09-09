import { defineComponent } from 'vue'
import { WithSlotInheritance } from '../with-slot-inheritance'
import ProxyComponent from './Parent.vue'

export default {
  title: 'WithSlotInheritance',
  component: WithSlotInheritance,
}

export const Default = () => ({
  components: { ProxyComponent },
  template: `
    <ProxyComponent>
      <template #blue>
        Must be blue
      </template>
      <template #yellow>
        Must be yellow
      </template>
    </ProxyComponent>
  `,
})
