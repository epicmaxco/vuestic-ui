
export interface IconProps {
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

export interface IconConfigurationString extends IconProps {
  name: string
  resolve?: ((dynamicSegments: {[dynamicSegment: string]: string }) => IconProps)
}

export interface IconConfigurationRegex extends IconProps {
  name: RegExp
  // Need a different resolve method name because ts don't understand types
  resolveFromRegex?: ((...regexGroupValues: string[]) => IconProps)
}

export type IconConfiguration = IconConfigurationString | IconConfigurationRegex

export type IconConfig = IconConfiguration[]

export const isIconConfigurationString = (config: IconConfiguration): config is IconConfigurationString => {
  return typeof config.name === 'string'
}

export const isIconConfigurationRegex = (config: IconConfiguration): config is IconConfigurationRegex => {
  return config.name instanceof RegExp
}
