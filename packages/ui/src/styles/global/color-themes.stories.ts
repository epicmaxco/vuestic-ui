import { defineComponent } from 'vue'
import ColorThemes from './color-themes.demo.vue'

export default {
  title: 'ColorThemes',
  component: ColorThemes,
}

export const Default = defineComponent({
  components: { ColorThemes },
  template: '<ColorThemes/>',
})
