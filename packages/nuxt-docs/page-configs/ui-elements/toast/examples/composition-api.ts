export default `
export default defineComponent({
  setup() {
    const { init, close, closeAll } = useToast()

    return {
      onButtonClick: () => init('Toask example!'),
    }
  }
})
`;
