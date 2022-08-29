export type ThresholdsKey = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

export type BodyClass = `va-screen-${ThresholdsKey}`

export type ThresholdsConfig = { [key in ThresholdsKey]: number }

export type BreakpointsConfig = {
  enabled: boolean,
  bodyClass: boolean,
  thresholds: ThresholdsConfig,
}
