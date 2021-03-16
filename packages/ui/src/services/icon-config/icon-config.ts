import { IconConfigPreset } from './types/preset'
import { IconsConfig } from './types'
import IconProps from './types/icon-props'

export type IconMixinIcon = {
  iconClass?: string
  content?: string
  component?: any
  componentProps?: any
} & IconProps

function defaultPropsFromPreset (preset?: IconConfigPreset): IconProps {
  if (!preset) { return {} }
  return ['tag', 'color', 'rotation', 'spin'].map((key: string) => preset[key])
}

function getRegexGroups (str: string, regex: RegExp) {
  return str.match(regex)?.slice(1)
}

function getCssIcon (name: string, preset?: IconConfigPreset) {
  if (preset?.type === 'css') {
    const regexGroups = getRegexGroups(name, preset.name)

    if (regexGroups) {
      return { iconClass: preset.iconClass(...regexGroups) }
    } else {
      return { iconClass: name }
    }
  }
}

function getLigatureIcon (name: string, preset?: IconConfigPreset) {
  if (preset?.type === 'ligature') {
    const regexGroups = getRegexGroups(name, preset.name)

    if (regexGroups) {
      return { content: preset.content(...regexGroups), iconClass: preset.iconClass }
    } else {
      return { content: name, iconClass: preset.iconClass }
    }
  }
}

function getComponentIcon (name: string, preset?: IconConfigPreset) {
  if (preset && preset.type === 'component') {
    const regexGroups = getRegexGroups(name, preset.name)

    if (regexGroups) {
      return {
        componentProps: preset.componentProps(...regexGroups),
        component: preset.component,
      }
    } else {
      return { component: preset.component }
    }
  }
}

export function getIcon (name: string, iconsConfig: IconsConfig): IconMixinIcon {
  if (!name) { return {} }

  const alias = iconsConfig.aliases?.find((alias) => alias.from === name)
  if (alias && typeof alias.to !== 'string') {
    return { component: alias.to }
  }

  const icon = alias?.to || name
  const preset = iconsConfig.presets?.find((preset) => icon.match(preset.name)) || iconsConfig.defaultPreset

  const iconConfig = getCssIcon(icon, preset) || getLigatureIcon(icon, preset) || getComponentIcon(icon, preset)
  return { ...iconConfig, ...defaultPropsFromPreset(preset) }
}
