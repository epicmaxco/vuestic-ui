import { computed, PropType, getCurrentInstance, ExtractPropTypes } from 'vue'

export const useRouterLinkProps = {
  tag: { type: String, default: 'span' },
  to: { type: [String, Object] as PropType<string | Record<string, any>>, default: '' },
  replace: { type: Boolean, default: false },
  append: { type: Boolean, default: false },
  exact: { type: Boolean, default: false },
  activeClass: { type: String, default: '' },
  exactActiveClass: { type: String, default: '' },
  href: { type: String, default: '' },
  target: { type: String, default: '' },
  disabled: { type: Boolean, default: false },
}

export const useRouterLink = (props: ExtractPropTypes<typeof useRouterLinkProps>) => {
  const globalProperties = computed(() => getCurrentInstance()?.appContext.config.globalProperties)
  const isNuxt = computed(() => !!globalProperties.value?.$nuxt)
  const vueRouter = computed(() => globalProperties.value?.$router)
  const vueRoute = computed(() => globalProperties.value?.$route)

  const tagComputed = computed(() => {
    if (props.disabled) { return props.tag }

    if (props.href && !props.to) { return 'a' }

    // if (props.to) { return isNuxt.value ? 'nuxt-link' : 'router-link' }
    // https://github.com/nuxt/framework/issues/6747
    // TODO: may be we will be able to register NuxtLink component via @vuestic/nuxt and use resolveComponent
    if (props.to) { return 'router-link' }

    return props.tag
  })

  const isLinkTag = computed(() => ['a', 'router-link', 'nuxt-link'].includes(tagComputed.value))

  const isActiveRouterLink = computed(() => {
    if (!vueRouter.value || !props.to) { return false }

    const to = vueRouter.value.resolve(props.to).href
    const currentHref = vueRouter.value.currentRoute.value.path

    return to.replace('#', '') === currentHref.replace('#', '')
  })

  const hrefComputed = computed(() => {
    // to resolve href on server for SEO optimization
    // https://github.com/nuxt/nuxt.js/issues/8204
    // @ts-ignore
    return props.href || (props.to ? vueRouter.value?.resolve(props.to, vueRoute.value).href : '')
  })

  return {
    tagComputed,
    isActiveRouterLink,
    hrefComputed,
    isLinkTag,
  }
}
