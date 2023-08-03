import { defineComponent } from 'vue'
import VaBreadcrumbs from './VaBreadcrumbs.demo.vue'

export default {
  title: 'VaBreadcrumbs',
  component: VaBreadcrumbs,
}

export const Default = defineComponent({
  components: { VaBreadcrumbs },
  template: '<VaBreadcrumbs/>',
})
