import { Vue, Component, Prop } from 'vue-property-decorator'

// should not be contextable as it's a unique case (we just pass values to vue-router's <router-link/>)
@Component
export class RouterLinkMixin extends Vue {
  @Prop({
    type: [String, Object],
  }) readonly to!: string | Record<string, any>

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
