import { Component, Prop, Vue } from 'vue-property-decorator'

// should not be contextable as it's a unique case (we just pass values to vue-router's <router-link/>)
@Component
export class RouterLinkMixin extends Vue {
  @Prop({
    type: [String, Object],
  }) readonly to!: string | Record<string, any>

  @Prop({ type: String, default: 'router-link' }) tag?: string

  @Prop({
    type: Boolean,
  }) readonly replace!: boolean

  @Prop({
    type: Boolean,
  }) readonly append!: boolean

  @Prop({
    type: Boolean,
  }) readonly exact!: boolean

  @Prop({
    type: String,
  }) readonly activeClass!: string

  @Prop({
    type: String,
  }) readonly exactActiveClass!: string

  @Prop({
    type: String,
  }) readonly href!: string

  @Prop({
    type: String,
  }) readonly target!: string

  setup () {
    return {
      hasRouterLinkMixin: true,
    }
  }

  // TODO: for some reason setup is not always working
  created () {
    (this as any).hasRouterLinkMixin = true
  }

  get tagComputed () {
    if (this.tag === 'nuxt-link') {
      return 'nuxt-link'
    }
    if (this.tag === 'a' || this.href || this.target) {
      return 'a'
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
