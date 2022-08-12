import { App, Ref, computed, watch, reactive, ComputedRef } from 'vue'

import { useEvent } from '../../../composables'

import { warn } from '../../utils'
import { isClient } from '../../../utils/ssr-utils'
import { getGlobalProperty } from '../../../vuestic-plugin/utils'
import { addOrUpdateStyleElement } from '../../dom-functions'

import { GlobalConfig } from '../../global-config/types'
import { ThresholdsKeys, BreakpointsConfig, BodyClass, WindowSizes } from '../types'

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

  const isMounted = computed(isClient)
  const windowSizes = reactive<WindowSizes>({
    width: undefined,
    height: undefined,
  })

  const setCurrentWindowSizes = () => {
    windowSizes.width = window?.innerWidth
    windowSizes.height = window?.innerHeight
  }

  watch(isMounted, (v) => {
    if (!v) { return }
    setCurrentWindowSizes()
    useEvent('resize', setCurrentWindowSizes, true)
  }, { immediate: true })

  const currentBreakpoint = computed(() => {
    if (!isMounted.value || !windowSizes.width) { return }

    return Object.entries(breakpointsConfig.value.thresholds).reduce((acc: string, [key, value]) => {
      if (windowSizes.width! >= value) { acc = key }
      return acc
    }, 'xs') as unknown as ThresholdsKeys
  })

  const screenClasses = computed(() =>
    (Object.keys(breakpointsConfig.value.thresholds) as ThresholdsKeys[])
      .reduce((acc: Record<ThresholdsKeys, BodyClass>, threshold: ThresholdsKeys) => {
        acc[threshold] = `screen--${threshold}`
        return acc
      }, {} as Record<ThresholdsKeys, BodyClass>))

  const getHelpersMedia = () => {
    let result = ''

    Object.values(breakpointsConfig.value.thresholds)
      .forEach((thresholdValue, index) => {
        result += `@media screen and (min-width: ${thresholdValue}px) {`
        // 0.2 coefficient for xs threshold and 1 for xl, experimental value for now
        result += `:root { --media-ratio: ${(index + 1) * 0.2} }`
        result += '}\n'
      })

    return result
  }

  watch(currentBreakpoint, (v) => {
    if (!v) { return }

    addOrUpdateStyleElement('helpers-media', getHelpersMedia)

    if (!breakpointsConfig.value.bodyClass || !currentBreakpoint.value) { return }

    document.body.classList.forEach((className: string) => {
      if ((Object.values(screenClasses.value) as string[]).includes(className)) {
        document.body.classList.remove(className)
      }
    })

    document.body.classList.add(screenClasses.value[currentBreakpoint.value])
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

      xsOnly: isXs,
      smOnly: isSm,
      mdOnly: isMd,
      lgOnly: isLg,
      xlOnly: isXl,
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
