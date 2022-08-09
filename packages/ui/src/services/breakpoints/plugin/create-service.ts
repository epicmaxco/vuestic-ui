import { App, Ref, computed, watch, reactive } from 'vue'

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

  const breakpointsConfig: BreakpointsConfig | undefined = globalConfig.value.breakpoints
  if (!breakpointsConfig) {
    warn('createBreakpointsConfigPlugin: breakpointsConfig is not defined!')
    return {}
  }

  if (!breakpointsConfig.enabled) {
    return {}
  }

  if (!breakpointsConfig.thresholds || !Object.values(breakpointsConfig.thresholds).length) {
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

  const currentBreakpoints = computed(() => {
    if (!isMounted.value || !windowSizes.width) { return }

    return Object.entries(breakpointsConfig.thresholds).reduce((acc: string, [key, value]) => {
      if (windowSizes.width! >= value) { acc = key }
      return acc
    }, 'xs') as unknown as ThresholdsKeys
  })

  const screenClasses = computed(() =>
    (Object.keys(breakpointsConfig.thresholds) as ThresholdsKeys[])
      .reduce((acc: Record<ThresholdsKeys, BodyClass>, threshold: ThresholdsKeys) => {
        acc[threshold] = `screen--${threshold}`
        return acc
      }, {} as Record<ThresholdsKeys, BodyClass>))

  const getHelpersMedia = () => {
    let result = ''

    Object.values(breakpointsConfig.thresholds)
      .forEach((thresholdValue, index) => {
        result += `@media screen and (min-width: ${thresholdValue}px) {`
        // 0.2 coefficient for xs threshold and 1 for xl, experimental value for now
        result += `:root { --media-ratio: ${(index + 1) * 0.2} }`
        result += '}\n'
      })

    return result
  }

  watch(currentBreakpoints, (v) => {
    if (!v) { return }

    addOrUpdateStyleElement('helpers-media', getHelpersMedia)

    if (!breakpointsConfig.bodyClass || !currentBreakpoints.value) { return }

    document.body.classList.forEach((className: string) => {
      if ((Object.values(screenClasses.value) as string[]).includes(className)) {
        document.body.classList.remove(className)
      }
    })

    document.body.classList.add(screenClasses.value[currentBreakpoints.value])
  }, { immediate: true })

  const breakpointsHelpers = computed(() => {
    const isXs = currentBreakpoints.value === 'xs'
    const isSm = currentBreakpoints.value === 'sm'
    const isMd = currentBreakpoints.value === 'md'
    const isLg = currentBreakpoints.value === 'lg'
    const isXl = currentBreakpoints.value === 'xl'

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
    current: currentBreakpoints.value,
    thresholds: breakpointsConfig.thresholds,
    ...breakpointsHelpers.value,
  }))

  return new Proxy({}, {
    ownKeys: () => Reflect.ownKeys(result.value),
    getOwnPropertyDescriptor: (_, key) => Reflect.getOwnPropertyDescriptor(result.value, key),
    get: (_, key: string, receiver: any) => Reflect.get(result.value, key, receiver),
  })
}
