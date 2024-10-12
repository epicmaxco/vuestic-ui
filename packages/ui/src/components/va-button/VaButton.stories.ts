import { defineComponent } from 'vue'
import VaButton from './VaButton.vue'
import VaButtonDemo from './VaButton.demo.vue'

export default {
  title: 'VaButton',
  component: VaButton,
}

export const Default = () => defineComponent({
  components: { VaButton: VaButtonDemo },
  template: '<VaButton/>',
})

// See: https://github.com/epicmaxco/vuestic-ui/issues/2704
export const RightShift = () => ({
  components: { VaButton },
  template: `
    <div>
      <VaButton>Text</VaButton>
      <VaButton icon="phone">Text2</VaButton>
    </div>
  `,
})

export const Focus = () => ({
  components: { VaButton },
  template: `
    <div>
      <VaButton ref="target">Target</VaButton>
      <VaButton @click="$refs.target.focus()">Focus</VaButton>
    </div>
  `,
})
