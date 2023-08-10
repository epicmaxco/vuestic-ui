import { defineComponent } from 'vue'
import TypographyLinkStyle from './typography-link-style.demo.vue'

export default {
  title: 'TypographyLinkStyle',
  component: TypographyLinkStyle,
}

export const Default = defineComponent({
  components: { TypographyLinkStyle },
  template: '<TypographyLinkStyle/>',
})
