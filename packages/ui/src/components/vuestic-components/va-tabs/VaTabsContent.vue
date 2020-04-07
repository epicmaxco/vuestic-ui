<script>
export default {
  name: 'VaTabsContent',
  render: function (createElement) {
    // Should render only html markup mapped to selected tab
    // ATM renders all content that is not tabs
    return createElement(
      'div', this.$slots.default.filter(e => {
        if (e.componentOptions) {
          return e.componentOptions.Ctor.options.name !== 'VaTab'
        }
        return true
      }),
    )
  },
}
</script>
