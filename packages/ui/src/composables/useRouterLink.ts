import { computed, PropType, getCurrentInstance } from 'vue'

export interface RouterLinkProps {
  tag: string
  to: string | Record<string, unknown>
  replace: boolean
  append: boolean
  exact: boolean
  activeClass: string
  exactActiveClass: string
  href: string
  target: string
}

export const useRouterLinkProps = {
  tag: { type: String as PropType<string>, default: 'router-link' },
  to: { type: [String, Object] as PropType<string | Record<string, unknown>>, default: null },
  replace: { type: Boolean as PropType<boolean>, default: false },
  append: { type: Boolean as PropType<boolean>, default: false },
  exact: { type: Boolean as PropType<boolean>, default: false },
  activeClass: { type: String as PropType<string>, default: '' },
  exactActiveClass: { type: String as PropType<string>, default: '' },
  href: { type: String as PropType<string>, default: '' },
  target: { type: String as PropType<string>, default: '' },
}

export const useRouterLink = (props: RouterLinkProps) => {
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

  return {
    hasRouterLinkParams,
    tagComputed,
    isActiveRouterLink,
    hrefComputed,
  }
}
