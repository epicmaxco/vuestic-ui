export default {
  methods: {
    onButtonClick() {
      this.$vaModal.confirm('Are you sure you want to see standard alert?')
        .then((ok) => ok && alert('This is standard browser alert'))
    },
  },
}