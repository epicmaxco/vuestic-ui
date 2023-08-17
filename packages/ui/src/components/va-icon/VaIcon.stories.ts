import { defineComponent } from 'vue'
import VaIcon from './VaIcon.demo.vue'

export default {
  title: 'VaIcon',
  component: VaIcon,
}

export const Default = defineComponent({
  components: { VaIcon },
  template: '<VaIcon/>',
})
