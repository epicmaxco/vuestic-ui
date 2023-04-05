import { useToast } from 'vuestic-ui'

export default defineComponent({
  setup() {
    const { init, close, closeAll } = useToast()

    return {
      onButtonClick: () => init('Toast example!'),
    }
  }
})