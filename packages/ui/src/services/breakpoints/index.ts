import { BreakpointsConfig, ThresholdsConfig } from './types'

const defaultThresholds: ThresholdsConfig = {
  xs: 0,
  sm: 600,
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
