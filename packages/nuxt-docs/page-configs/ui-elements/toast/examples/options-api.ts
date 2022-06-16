export default `
export default {
  methods: {
    onButtonClick() {
      this.$vaToast.init('Toast example!')
    },
  },

  beforeRouteLeave (to, from, next) {
    this.$vaToast.closeAll()
    next()
  }
}
`;
