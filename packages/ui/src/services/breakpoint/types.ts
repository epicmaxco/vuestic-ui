export type ThresholdsKey = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

export type BreakpointHelpersKeys = ThresholdsKey | 'smUp' | 'mdUp' | 'lgUp' | 'smDown' | 'mdDown' | 'lgDown'

export type BreakpointHelpers = Record<BreakpointHelpersKeys, boolean>

export type BodyClass = `va-screen-${ThresholdsKey}`

export type ThresholdsConfig = { [key in ThresholdsKey]: number }

export type BreakpointServiceObject = {
  width: number,
  height: number,
  current: ThresholdsKey,
  thresholds: ThresholdsConfig,
} & BreakpointHelpers

export type BreakpointConfig = {
  enabled: boolean,
  bodyClass: boolean,
  thresholds: ThresholdsConfig,
}
