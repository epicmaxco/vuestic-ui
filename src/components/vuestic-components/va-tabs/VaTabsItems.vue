<script>
export default {
  name: 'VaTabsItems',
  render: function (createElement) {
    return createElement(
      'div',
      this.$slots.default.filter(e => {
        if (e.componentOptions) {
          return e.componentOptions.Ctor.options.name === 'VaTab'
        }
        return false
      }),
    )
  },
}
</script>
