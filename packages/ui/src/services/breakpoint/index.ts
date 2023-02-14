import { BreakpointConfig, ThresholdsConfig } from './types'

export const vaBreakpointSymbol = Symbol('vaBreakpoint')

export const defaultThresholds: ThresholdsConfig = {
  xs: 0,
  sm: 640,
  md: 1024,
  lg: 1440,
  xl: 1920,
}

export const getBreakpointDefaultConfig = (): BreakpointConfig => ({
  enabled: true,
  bodyClass: true,
  thresholds: defaultThresholds,
})

export * from './types'
