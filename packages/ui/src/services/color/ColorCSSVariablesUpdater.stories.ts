import { defineComponent } from 'vue'
import ColorCSSVariablesUpdater from './ColorCSSVariablesUpdater.demo.vue'

export default {
  title: 'ColorCSSVariablesUpdater',
  component: ColorCSSVariablesUpdater,
}

export const Default = defineComponent({
  components: { ColorCSSVariablesUpdater },
  template: '<ColorCSSVariablesUpdater/>',
})
