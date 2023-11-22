import { useToast } from 'vuestic-ui'

export default defineComponent({
  setup() {
    const { init, notify, close, closeAll } = useToast()

    return {
      onButtonClick: () => notify('Toast example!'),
    }
  }
})