import { App, ref, Ref, computed, watch } from 'vue'

import { warn } from '../../utils'
import { getGlobalProperty } from '../../../vuestic-plugin/utils'
import { addOrUpdateStyleElement } from '../../dom-functions'

import { GlobalConfig } from '../../global-config/types'
import { ThresholdsKeys, BreakpointsConfig, BodyClass } from '../types'

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

  const isMounted = computed(() => !!document.documentElement)
  const windowWidth = ref<number | undefined>()
  const windowHeight = ref<number | undefined>()

  const setCurrentDocumentSizes = () => {
    windowWidth.value = document.documentElement.clientWidth
    windowHeight.value = document.documentElement.clientHeight
  }

  watch(isMounted, (v) => {
    if (!v) { return }

    setCurrentDocumentSizes()

    window.addEventListener('resize', setCurrentDocumentSizes, true)
  }, { immediate: true })

  const getCurrentBreakpoint = computed(() => {
    if (!isMounted.value || !windowWidth.value) { return }

    return Object.entries(breakpointsConfig.thresholds).reduce((acc: string, [key, value]) => {
      if (windowWidth.value! >= value) { acc = key }
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
    const mediaHeader = (minWidth: number) => `@media screen and (min-width: ${minWidth}px) {`
    const mediaFooter = '}\n'

    Object.values(breakpointsConfig.thresholds)
      .forEach((thresholdValue, index) => {
        result += mediaHeader(thresholdValue)
        // 0.2 coefficient for xs threshold and 1 for xl, experimental value for now
        result += `:root { --media-ratio: ${(index + 1) * 0.2} }`
        result += mediaFooter
      })

    return result
  }

  watch(getCurrentBreakpoint, (v) => {
    if (!v) { return }

    addOrUpdateStyleElement('helpers-media', getHelpersMedia)

    if (!breakpointsConfig.bodyClass || !getCurrentBreakpoint.value) { return }

    document.body.classList.forEach((className: string) => {
      if ((Object.values(screenClasses.value) as string[]).includes(className)) {
        document.body.classList.remove(className)
      }
    })

    document.body.classList.add(screenClasses.value[getCurrentBreakpoint.value])
  }, { immediate: true })

  const isXs = computed(() => getCurrentBreakpoint.value === 'xs')
  const isSm = computed(() => getCurrentBreakpoint.value === 'sm')
  const isMd = computed(() => getCurrentBreakpoint.value === 'md')
  const isLg = computed(() => getCurrentBreakpoint.value === 'lg')
  const isXl = computed(() => getCurrentBreakpoint.value === 'xl')

  const breakpointsHelpers = computed(() => ({
    xs: isXs.value,
    sm: isSm.value,
    md: isMd.value,
    lg: isLg.value,
    xl: isXl.value,

    smUp: isSm.value || isMd.value || isLg.value || isXl.value,
    mdUp: isMd.value || isLg.value || isXl.value,
    lgUp: isLg.value || isXl.value,

    smDown: isXs.value || isSm.value,
    mdDown: isXs.value || isSm.value || isMd.value,
    lgDown: isXs.value || isSm.value || isMd.value || isLg.value,

    xsOnly: isXs.value,
    smOnly: isSm.value,
    mdOnly: isMd.value,
    lgOnly: isLg.value,
    xlOnly: isXl.value,
  }))

  const result = computed(() => ({
    width: windowWidth.value,
    height: windowHeight.value,
    current: getCurrentBreakpoint.value,
    thresholds: breakpointsConfig.thresholds,
    ...breakpointsHelpers.value,
  }))

  return new Proxy({}, {
    ownKeys: () => Reflect.ownKeys(result.value),
    getOwnPropertyDescriptor: (_, key) => Reflect.getOwnPropertyDescriptor(result.value, key),
    get: (_, key: string, receiver: any) => Reflect.get(result.value, key, receiver),
  })
}
