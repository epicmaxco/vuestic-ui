export type WindowSizes = Record<'width' | 'height', number | undefined>

export type ThresholdsKeys = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

export type BodyClass = `va-screen-${ThresholdsKeys}`

export type ThresholdsConfig = { [key in ThresholdsKeys]: number }

export type BreakpointsConfig = {
  enabled: boolean,
  bodyClass: boolean,
  thresholds: ThresholdsConfig,
}
