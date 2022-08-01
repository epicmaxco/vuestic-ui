export type ThresholdsKeys = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

export type BodyClass = `screen--${ThresholdsKeys}`

export type ThresholdsConfig = { [key in ThresholdsKeys]: number }

export type BreakpointsConfig = {
  enabled: boolean,
  bodyClass: boolean,
  thresholds: ThresholdsConfig,
}
