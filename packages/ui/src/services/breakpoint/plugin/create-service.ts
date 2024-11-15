import { App, Ref, computed, watch, ComputedRef } from 'vue'

import { useDocument, useWindowSize, useReactiveComputed } from '../../../composables'

import { getDocument, isClient } from '../../../utils/ssr'
import { warn } from '../../../utils/console'
import { generateUniqueId } from '../../../utils/uuid'
import { getGlobalProperty } from '../../vue-plugin/utils'
import { addOrUpdateStyleElement } from '../../../utils/dom'

import { GlobalConfig } from '../../global-config/types'
import { ThresholdsKey, BreakpointConfig, BodyClass, BreakpointServiceObject, BreakpointHelpers } from '../types'

export const createBreakpointConfigPlugin = (app: App): BreakpointServiceObject => {
  const globalConfig: Ref<GlobalConfig> | undefined = getGlobalProperty(app, '$vaConfig')?.globalConfig
  if (!globalConfig) {
    warn('createBreakpointConfigPlugin: globalConfig is not defined!')
    return {} as BreakpointServiceObject
  }

  const breakpointConfig: ComputedRef<BreakpointConfig> = computed(() => {
    const breakpoint = globalConfig.value.breakpoint
    return breakpoint ?? {} as BreakpointConfig
  })

  if (!breakpointConfig.value.enabled) {
    return {} as BreakpointServiceObject
  }

  if (!breakpointConfig.value.thresholds || !Object.values(breakpointConfig.value.thresholds).length) {
    warn('createBreakpointConfigPlugin: there are no defined thresholds!')
    return {} as BreakpointServiceObject
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

  watch(currentBreakpoint, (newValue) => {
    const document = getDocument()
    if (!newValue || !breakpointConfig.value.bodyClass || !document) { return }

    document.body.classList.forEach((className: string) => {
      if ((Object.values(screenClasses.value) as string[]).includes(className)) {
        document.body.classList.remove(className)
      }
    })

    document.body.classList.add(screenClasses.value[newValue])
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

  return useReactiveComputed<BreakpointServiceObject>(() => ({
    width: windowSizes.width!,
    height: windowSizes.height!,
    current: currentBreakpoint.value!,
    thresholds: breakpointConfig.value.thresholds,
    ...breakpointHelpers.value,
  }))
}
