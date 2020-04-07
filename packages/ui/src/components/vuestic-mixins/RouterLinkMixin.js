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
    href: {
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
        this.href ||
        this.exactActiveClass,
      )
    },
    isActiveRouterLink () {
      if (this.$router && this.to) {
        const resolve = this.$router.resolve(
          this.to,
          this.$route,
        )

        const to = resolve.href
        const currentHref = this.$router.currentRoute.path

        return to.replace('#', '') === currentHref.replace('#', '')
      } else {
        return false
      }
    },
  },
}
