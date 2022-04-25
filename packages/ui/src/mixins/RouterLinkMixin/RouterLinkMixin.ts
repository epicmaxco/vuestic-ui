import { Options, Vue, prop, mixins } from 'vue-class-component'

class RouterLinkProps {
  tag = prop<string>({ type: String, default: 'router-link' })
  to = prop<string | Record<string, unknown>>({ type: [String, Object] })
  replace = prop<boolean>({ type: Boolean })
  append = prop<boolean>({ type: Boolean })
  exact = prop<boolean>({ type: Boolean })
  activeClass = prop<string>({ type: String })
  exactActiveClass = prop<string>({ type: String })
  href = prop<string>({ type: String })
  target = prop<string>({ type: String })
}

const RouterLinkPropsMixin = Vue.with(RouterLinkProps)

/** @deprecated */
@Options({})
export class RouterLinkMixin extends mixins(
  RouterLinkPropsMixin,
) {
  hasRouterLinkMixin!: boolean

  get tagComputed () {
    const isNuxt = !!Object.getOwnPropertyDescriptor(this, '$nuxt')
    if (this.tag === 'a' || (this.href && !this.to) || this.target) {
      return 'a'
    }
    if (this.tag === 'nuxt-link' || (isNuxt && this.hasRouterLinkParams)) {
      return 'nuxt-link'
    }
    if (this.tag === 'router-link' || this.hasRouterLinkParams) {
      return 'router-link'
    }
    return this.tag
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
    if (!(this as any).$router || !this.to) {
      return false
    }

    const resolve = (this as any).$router.resolve(
      this.to,
    )

    const to = resolve.href
    const currentHref = (this as any).$router.currentRoute.value.path

    return to.replace('#', '') === currentHref.replace('#', '')
  }

  get hrefComputed () {
    // to resolve href on server for SEO optimization
    // https://github.com/nuxt/nuxt.js/issues/8204
    // @ts-ignore
    return this.href || (this.to ? (this as any).$router?.resolve(this.to, (this as any).$route).href : null)
  }

  created () {
    this.hasRouterLinkMixin = true
  }
}
