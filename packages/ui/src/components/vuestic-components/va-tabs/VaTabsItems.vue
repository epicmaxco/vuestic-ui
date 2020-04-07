<script>
export default {
  name: 'VaTabsItems',
  render: function (createElement) {
    return createElement(
      'div',
      {
        attrs: {
          class: 'va-tabs__tabs-items',
        },
      },
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
