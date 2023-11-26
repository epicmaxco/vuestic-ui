export default {
  methods: {
    onButtonClick() {
      this.$vaToast.notify('Toast example!')
    },
  },

  beforeRouteLeave (to, from, next) {
    this.$vaToast.closeAll()
    next()
  },
}