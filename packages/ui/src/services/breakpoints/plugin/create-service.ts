import { App, Ref, computed, watch, ComputedRef } from 'vue'

import { useDocument, useWindowSize } from '../../../composables'

import { isClient } from '../../../utils/ssr-utils'
import { warn, generateUniqueId } from '../../utils'
import { getGlobalProperty } from '../../../vuestic-plugin/utils'
import { addOrUpdateStyleElement } from '../../dom-functions'

import { GlobalConfig } from '../../global-config/types'
import { ThresholdsKey, BreakpointsConfig, BodyClass } from '../types'

export const createBreakpointsConfigPlugin = (app: App) => {
  const globalConfig: Ref<GlobalConfig> | undefined = getGlobalProperty(app, '$vaConfig')?.globalConfig
  if (!globalConfig) {
    warn('createBreakpointsConfigPlugin: globalConfig is not defined!')
    return {}
  }

  const breakpointsConfig: ComputedRef<BreakpointsConfig> = computed(() => {
    const breakpoints = globalConfig.value.breakpoints
    if (!breakpoints) { warn('createBreakpointsConfigPlugin: breakpointsConfig is not defined!') }
    return breakpoints ?? {} as BreakpointsConfig
  })

  if (!breakpointsConfig.value.enabled) {
    return {}
  }

  if (!breakpointsConfig.value.thresholds || !Object.values(breakpointsConfig.value.thresholds).length) {
    warn('createBreakpointsConfigPlugin: there are no defined thresholds!')
    return {}
  }

  const { windowSizes } = useWindowSize()

  const isMounted = computed(isClient)
  const currentBreakpoint = computed(() => {
    if (!isMounted.value || !windowSizes.width) { return }

    return Object.entries(breakpointsConfig.value.thresholds).reduce((acc: string, [key, value]) => {
      if (windowSizes.width! >= value) { acc = key }
      return acc
    }, 'xs') as unknown as ThresholdsKey
  })

  const screenClasses = computed(() =>
    (Object.keys(breakpointsConfig.value.thresholds) as ThresholdsKey[])
      .reduce((acc: Record<ThresholdsKey, BodyClass>, threshold: ThresholdsKey) => {
        acc[threshold] = `va-screen-${threshold}`
        return acc
      }, {} as Record<ThresholdsKey, BodyClass>))

  const generateHelpersMediaCss = () => {
    let result = ''

    Object.values(breakpointsConfig.value.thresholds)
      .forEach((thresholdValue, index) => {
        result += `@media screen and (min-width: ${thresholdValue}px) {`
        // 0.2 coefficient for xs threshold and 1 for xl, experimental value for now
        result += `:root { --va-media-ratio: ${(index + 1) * 0.2} }`
        result += '}\n'
      })

    return result
  }

  const uniqueId = computed(generateUniqueId)
  addOrUpdateStyleElement(`va-helpers-media-${uniqueId.value}`, generateHelpersMediaCss)

  const getDocument = useDocument()
  watch(currentBreakpoint, (newValue) => {
    if (!newValue || !breakpointsConfig.value.bodyClass || !getDocument.value) { return }

    getDocument.value.body.classList.forEach((className: string) => {
      if ((Object.values(screenClasses.value) as string[]).includes(className)) {
        getDocument.value!.body.classList.remove(className)
      }
    })

    getDocument.value.body.classList.add(screenClasses.value[newValue])
  }, { immediate: true })

  const breakpointsHelpers = computed(() => {
    const isXs = currentBreakpoint.value === 'xs'
    const isSm = currentBreakpoint.value === 'sm'
    const isMd = currentBreakpoint.value === 'md'
    const isLg = currentBreakpoint.value === 'lg'
    const isXl = currentBreakpoint.value === 'xl'

    return {
      xs: isXs,
      sm: isSm,
      md: isMd,
      lg: isLg,
      xl: isXl,

      smUp: isSm || isMd || isLg || isXl,
      mdUp: isMd || isLg || isXl,
      lgUp: isLg || isXl,

      smDown: isXs || isSm,
      mdDown: isXs || isSm || isMd,
      lgDown: isXs || isSm || isMd || isLg,
    }
  })

  const result = computed(() => ({
    width: windowSizes.width,
    height: windowSizes.height,
    current: currentBreakpoint.value,
    thresholds: breakpointsConfig.value.thresholds,
    ...breakpointsHelpers.value,
  }))

  return new Proxy({}, {
    ownKeys: () => Reflect.ownKeys(result.value),
    getOwnPropertyDescriptor: (_, key) => Reflect.getOwnPropertyDescriptor(result.value, key),
    get: (_, key: string, receiver: any) => Reflect.get(result.value, key, receiver),
  })
}
