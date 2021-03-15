import { IconConfig } from './../types/index'

export const fontPresets: IconConfig[] = [
  {
    name: /(md)-(.*)/,
    iconClass: 'material-icons',
    content: (font: string, content: string) => content,
  },
  {
    name: /fa4-(.*)/,
    iconClass: (code: string) => `fa fa-${code}`,
  },
  {
    name: /(fas|far|fal|fad|fab)-(.*)/,
    iconClass: (font: string, code: string) => `${font} fa-${code} fa-fw`,
  },
  {
    name: /ion-(.*)/,
    iconClass: (code: string) => `icon ion-md-${code}`,
  },
  {
    name: /ion-outline-(.*)/,
    iconClass: (code: string) => `icon ion-ios-${code}-outline`,
  },
  {
    name: /(brandico|entypo|fontawesome|fontelico|iconicfill|iconicstroke|maki|openwebicons|typicons|zocial)-(.*)/,
    iconClass: (font: string, code: string) => `${font}-${code}`,
  },
  {
    name: 'text',
  },
  {
    name: /.*/,
    iconClass: 'material-icons',
    content: (content: string) => content,
    color: 'red',
  },
]
