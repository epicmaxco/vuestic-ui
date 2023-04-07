import { useModal } from 'vuestic-ui'

export default defineComponent({
  setup() {
    const { confirm } = useModal()

    return {
      onButtonClick: () => {
        confirm('Are you sure you want to see standard alert?')
          .then((ok) => ok && alert('This is standard browser alert'))
      },
    }
  }
})