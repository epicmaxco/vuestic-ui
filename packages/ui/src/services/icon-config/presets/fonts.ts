import { IconConfigPreset } from '../types/preset'

export const fontPresets: IconConfigPreset[] = [
  {
    name: /(md)-(.*)/,
    type: 'ligature',
    iconClass: 'material-icons',
    content: (font: string, content: string) => content,
    color: 'red',
  },
  {
    name: /fa4-(.*)/,
    type: 'css',
    iconClass: (code: string) => `fa fa-${code}`,
  },
  {
    name: /(fas|far|fal|fad|fab)-(.*)/,
    type: 'css',
    iconClass: (font: string, code: string) => `${font} fa-${code} fa-fw`,
  },
  {
    name: /ion-(.*)/,
    type: 'css',
    iconClass: (code: string) => `icon ion-md-${code}`,
  },
  {
    name: /ion-outline-(.*)/,
    type: 'css',
    iconClass: (code: string) => `icon ion-ios-${code}-outline`,
  },
  {
    name: /(brandico|entypo|fontawesome|fontelico|iconicfill|iconicstroke|maki|openwebicons|typicons|zocial)-(.*)/,
    type: 'css',
    iconClass: (font: string, code: string) => `${font}-${code}`,
  },
]
