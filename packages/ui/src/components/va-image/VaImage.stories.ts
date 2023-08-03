import { defineComponent } from 'vue'
import VaImage from './VaImage.demo.vue'

export default {
  title: 'VaImage',
  component: VaImage,
}

export const Default = defineComponent({
  components: { VaImage },
  template: '<VaImage/>',
})
