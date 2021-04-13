export type IconNameWithDynamicSegment = string

export interface IconConfigurationDefaultParams {
  attrs?: Record<string, string | ((...args: any[]) => unknown)>

  /** Vue component */
  component?: any
  /** Content that will be passed as text inside icon tag or as slot in component */
  content?: string

  class?: string,
  tag?: string
  color?: string
  rotation?: number | string
  spin?: 'clockwise' | 'counter-clockwise'
  to?: string
}

export interface IconConfigurationWithDynamicSegmentName extends IconConfigurationDefaultParams {
  name: IconNameWithDynamicSegment
  resolve?: ((dynamicSegmentsValue: {[dynamicSegmentName: string]: string }) => IconConfigurationDefaultParams)
}

export interface IconConfigurationWithRegexName extends IconConfigurationDefaultParams {
  name: RegExp
  // Need a different resolve method name because ts don't understand types
  resolveFromRegex?: ((...regexGroupValues: string[]) => IconConfigurationDefaultParams)
}

export type IconConfiguration = IconConfigurationWithDynamicSegmentName | IconConfigurationWithRegexName

export type IconConfig = IconConfiguration[]

export function isIconConfigurationWithDynamicSegmentName (config: IconConfiguration): config is IconConfigurationWithDynamicSegmentName {
  return typeof config.name === 'string' // TODO: make this check more smart
}

export function isIconConfigurationWithRegexName (config: IconConfiguration): config is IconConfigurationWithRegexName {
  return config.name instanceof RegExp
}
