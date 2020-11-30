import { Options, prop, mixins } from 'vue-class-component'

import { makeContextablePropsMixin } from '../../context-test/context-provide/ContextPlugin'

const RouterLinkPropsMixin = makeContextablePropsMixin({
  tag: { type: String, default: 'router-link' },
})
// should not be contextable as it's a unique case (we just pass values to vue-router's <router-link/>)

@Options({
  props: {
    to: [String, Object],
    replace: Boolean,
    append: Boolean,
    exact: Boolean,
    activeClass: String,
    exactActiveClass: String,
    href: String,
    target: String,
  },
})
export class RouterLinkMixin extends mixins(
  RouterLinkPropsMixin,
) {
  get tagComputed () {
    if (this.c_tag === 'a' || (this.href && !this.to) || this.target) {
      return 'a'
    }
    if (this.c_tag === 'nuxt-link' || (this.$nuxt && this.hasRouterLinkParams)) {
      return 'nuxt-link'
    }
    if (this.c_tag === 'router-link' || this.hasRouterLinkParams) {
      return 'router-link'
    }
    return this.c_tag
  }

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
    )

    const to = resolve.href
    const currentHref = this.$router.currentRoute.value.path

    return to.replace('#', '') === currentHref.replace('#', '')
  }

  get hrefComputed () {
    // to resolve href on server for SEO optimization
    // https://github.com/nuxt/nuxt.js/issues/8204
    return this.href || (this.to ? this.$router?.resolve(this.to, this.$route).href : null)
  }

  created () {
    this.hasRouterLinkMixin = true
  }
}
