import { defineComponent } from 'vue'
import useConfirm from './useConfirm.demo.vue'

export default {
  title: 'useConfirm',
  component: useConfirm,
}

export const Default = defineComponent({
  components: { useConfirm },
  template: '<useConfirm/>',
})
