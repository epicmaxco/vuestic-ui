import { computed, PropType, getCurrentInstance, ComputedRef } from 'vue'

export const useRouterLinkProps = {
  tag: { type: String as PropType<string>, default: 'router-link' },
  to: { type: [String, Object] as PropType<string | Record<string, unknown>> },
  replace: { type: Boolean as PropType<boolean> },
  append: { type: Boolean as PropType<boolean> },
  exact: { type: Boolean as PropType<boolean> },
  activeClass: { type: String as PropType<string> },
  exactActiveClass: { type: String as PropType<string> },
  href: { type: String as PropType<string> },
  target: { type: String as PropType<string> },
}

export const useRouterLink = (props: Record<string, any>) => {
  const globalProperties = computed(() => getCurrentInstance()?.appContext.config.globalProperties)
  const isNuxt = computed(() => !!globalProperties.value?.$nuxt)
  const vueRouter = computed(() => globalProperties.value?.$router)
  const vueRoute = computed(() => globalProperties.value?.$route)

  const hasRouterLinkParams = computed(() => Boolean(
    props.to ||
    props.append ||
    props.replace ||
    props.exact ||
    props.activeClass ||
    props.href ||
    props.exactActiveClass,
  ))

  const tagComputed = computed(() => {
    if (props.tag === 'a' || (props.href && !props.to) || props.target) {
      return 'a'
    }
    if (props.tag === 'nuxt-link' || (isNuxt.value && hasRouterLinkParams.value)) {
      return 'nuxt-link'
    }
    if (props.tag === 'router-link' || hasRouterLinkParams.value) {
      return 'router-link'
    }

    return props.tag
  })

  const isActiveRouterLink = computed(() => {
    if (!vueRouter.value || !props.to) {
      return false
    }

    const to = vueRouter.value.resolve(props.to).href
    const currentHref = vueRouter.value.currentRoute.value.path

    return to.replace('#', '') === currentHref.replace('#', '')
  })

  const hrefComputed = computed(() => {
    // to resolve href on server for SEO optimization
    // https://github.com/nuxt/nuxt.js/issues/8204
    // @ts-ignore
    return props.href || (props.to ? vueRouter.value?.resolve(props.to, vueRoute.value).href : null)
  })

  return { hasRouterLinkParams, tagComputed, isActiveRouterLink, hrefComputed }
}
