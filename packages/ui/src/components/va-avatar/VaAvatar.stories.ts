import { defineComponent } from 'vue'
import VaAvatar from './VaAvatar.demo.vue'

export default {
  title: 'VaAvatar',
  component: VaAvatar,
}

export const Default = defineComponent({
  components: { VaAvatar },
  template: '<VaAvatar/>',
})
