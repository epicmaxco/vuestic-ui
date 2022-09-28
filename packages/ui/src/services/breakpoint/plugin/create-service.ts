import { App, Ref, computed, watch, ComputedRef } from 'vue'

import { useDocument, useWindowSize } from '../../../composables'

import { isClient } from '../../../utils/ssr-utils'
import { warn, generateUniqueId } from '../../utils'
import { getGlobalProperty } from '../../../vuestic-plugin/utils'
import { addOrUpdateStyleElement } from '../../dom-functions'

import { GlobalConfig } from '../../global-config/types'
import { ThresholdsKey, BreakpointConfig, BodyClass, BreakpointServiceObject, BreakpointHelpers } from '../types'

export const createBreakpointConfigPlugin = (app: App) => {
  const globalConfig: Ref<GlobalConfig> | undefined = getGlobalProperty(app, '$vaConfig')?.globalConfig
  if (!globalConfig) {
    warn('createBreakpointConfigPlugin: globalConfig is not defined!')
    return {}
  }

  const breakpointConfig: ComputedRef<BreakpointConfig> = computed(() => {
    const breakpoint = globalConfig.value.breakpoint
    if (!breakpoint) { warn('createBreakpointConfigPlugin: breakpointConfig is not defined!') }
    return breakpoint ?? {} as BreakpointConfig
  })

  if (!breakpointConfig.value.enabled) {
    return {}
  }

  if (!breakpointConfig.value.thresholds || !Object.values(breakpointConfig.value.thresholds).length) {
    warn('createBreakpointConfigPlugin: there are no defined thresholds!')
    return {}
  }

  const { windowSizes } = useWindowSize()

  const isMounted = computed(isClient)
  const currentBreakpoint = computed(() => {
    if (!isMounted.value || !windowSizes.width) { return }

    return Object.entries(breakpointConfig.value.thresholds).reduce((acc: string, [key, value]) => {
      if (windowSizes.width! >= value) { acc = key }
      return acc
    }, 'xs') as unknown as ThresholdsKey
  })

  const screenClasses = computed(() =>
    (Object.keys(breakpointConfig.value.thresholds) as ThresholdsKey[])
      .reduce((acc: Record<ThresholdsKey, BodyClass>, threshold: ThresholdsKey) => {
        acc[threshold] = `va-screen-${threshold}`
        return acc
      }, {} as Record<ThresholdsKey, BodyClass>))

  const generateHelpersMediaCss = () => {
    let result = ''

    Object.values(breakpointConfig.value.thresholds)
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
    if (!newValue || !breakpointConfig.value.bodyClass || !getDocument.value) { return }

    getDocument.value.body.classList.forEach((className: string) => {
      if ((Object.values(screenClasses.value) as string[]).includes(className)) {
        getDocument.value!.body.classList.remove(className)
      }
    })

    getDocument.value.body.classList.add(screenClasses.value[newValue])
  }, { immediate: true })

  const breakpointHelpers = computed(() => {
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
  }) as ComputedRef<BreakpointHelpers>

  const result = computed(() => ({
    width: windowSizes.width,
    height: windowSizes.height,
    current: currentBreakpoint.value,
    thresholds: breakpointConfig.value.thresholds,
    ...breakpointHelpers.value,
  })) as ComputedRef<BreakpointServiceObject>

  return new Proxy({} as typeof result.value, {
    ownKeys: () => Reflect.ownKeys(result.value),
    getOwnPropertyDescriptor: (_, key) => Reflect.getOwnPropertyDescriptor(result.value, key),
    get: (_, key: string, receiver: any) => Reflect.get(result.value, key, receiver),
  })
}
