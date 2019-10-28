export const RouterLinkMixin = {
  props: {
    to: {
      type: [String, Object],
    },
    replace: {
      type: Boolean,
    },
    append: {
      type: Boolean,
    },
    exact: {
      type: Boolean,
    },
    activeClass: {
      type: String,
    },
    exactActiveClass: {
      type: String,
    },
  },

  computed: {
    hasRouterLinkParams () {
      return Boolean(
        this.to ||
        this.append ||
        this.replace ||
        this.exact ||
        this.activeClass ||
        this.exactActiveClass
      )
    },
  },
}
