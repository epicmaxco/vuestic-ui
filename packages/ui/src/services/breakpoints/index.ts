import { BreakpointsConfig, ThresholdsConfig } from './types'

export const vaBreakpointsSymbol = Symbol('vaBreakpoints')

const defaultThresholds: ThresholdsConfig = {
  xs: 0,
  sm: 640,
  md: 1024,
  lg: 1440,
  xl: 1920,
}

export const getBreakpointsDefaultConfig = (): BreakpointsConfig => ({
  enabled: true,
  bodyClass: true,
  thresholds: defaultThresholds,
})

export * from './types'
