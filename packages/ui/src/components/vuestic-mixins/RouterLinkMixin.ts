
import { Component, Mixins } from 'vue-property-decorator'
import { makeContextablePropsMixin } from '../context-test/context-provide/ContextPlugin'
// @ts-nocheck
@Component
export class RouterLinkMixin extends Mixins(makeContextablePropsMixin({
  to: { type: [String, Object] },
  replace: { type: Boolean },
  append: { type: Boolean },
  exact: { type: Boolean },
  activeClass: { type: String },
  exactActiveClass: { type: String },
  href: { type: String },
})) {
  get hasRouterLinkParams () {
    return Boolean(
      this.to ||
        this.append ||
        this.replace ||
        this.exact ||
        this.activeClass ||
        this.href ||
        this.exactActiveClass,
    )
  }

  get isActiveRouterLink () {
    if (!this.$router || !this.to) {
      return false
    }

    const resolve = this.$router.resolve(
      this.to,
      this.$route,
    )

    const to = resolve.href
    const currentHref = this.$router.currentRoute.path

    return to.replace('#', '') === currentHref.replace('#', '')
  }
}
