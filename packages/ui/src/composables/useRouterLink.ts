import { computed, PropType, getCurrentInstance, type ExtractPropTypes } from 'vue'

import { useGlobalConfig } from '../services/global-config'

export const useRouterLinkProps = {
  tag: { type: String, default: 'span' },
  to: { type: [String, Object] as PropType<string | Record<string, any>>, default: undefined },
  replace: { type: Boolean, default: undefined },
  append: { type: Boolean, default: undefined },
  exact: { type: Boolean, default: undefined },
  activeClass: { type: String, default: undefined },
  exactActiveClass: { type: String, default: undefined },
  href: { type: String, default: undefined },
  target: { type: String, default: undefined },
  disabled: { type: Boolean, default: false },
}

export const useRouterLink = (props: ExtractPropTypes<typeof useRouterLinkProps>) => {
  const currentInstance = getCurrentInstance()

  const globalProperties = computed(() => currentInstance?.appContext.config.globalProperties)
  const vueRouter = computed(() => globalProperties.value?.$router)
  const vueRoute = computed(() => globalProperties.value?.$route)

  const { getGlobalConfig } = useGlobalConfig()

  const tagComputed = computed(() => {
    if (props.disabled) { return props.tag }

    if (props.href && !props.to) { return 'a' }

    const globalConfig = getGlobalConfig()

    if (globalConfig.routerComponent && props.to) { return globalConfig.routerComponent }

    if (props.to && vueRouter.value !== undefined) { return 'router-link' }
    if (props.to && vueRouter.value === undefined) { return 'a' }

    return props.tag || 'div'
  })

  const isLinkTag = computed(() => {
    if (props.disabled) { return false }

    return Boolean(props.href || props.to)
  })

  const linkAttributesComputed = computed(() => {
    if (!isLinkTag.value) { return {} }

    return tagComputed.value === 'a'
      ? {
        target: props.target,
        href: hrefComputed.value,
      }
      : {
        target: props.target,
        to: props.to,
        replace: props.replace,
        append: props.append,
        activeClass: props.activeClass,
        exact: props.exact,
        exactActiveClass: props.exactActiveClass,
      }
  })

  const isActiveRouterLink = computed(() => {
    if (!vueRouter.value || !props.to) { return false }

    const to = vueRouter.value.resolve(props.to).href
    const currentHref = vueRouter.value.currentRoute.value.path

    return to.replace('#', '') === currentHref.replace('#', '')
  })

  const hrefComputed = computed(() => {
    if (props.href) { return props.href }

    if (vueRoute.value === undefined && props.to) {
      return props.to
    }

    // to resolve href on server for SEO optimization
    // https://github.com/nuxt/nuxt.js/issues/8204
    return props.to ? vueRouter.value?.resolve(props.to, vueRoute.value).href : undefined
  })

  return {
    isLinkTag,
    tagComputed,
    hrefComputed,
    isActiveRouterLink,
    linkAttributesComputed,
  }
}
