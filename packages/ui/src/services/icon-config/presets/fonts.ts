import { IconFonts } from '../types'

export const fontPresets: IconFonts = [
  {
    name: 'md',
    type: 'ligature',
    iconClass: 'material-icons',
  },
  {
    name: 'fa4',
    type: 'css',
    iconClass: (code: string) => `fa fa-${code}`,
  },
  {
    name: /fas|far|fal|fad|fab/,
    type: 'css',
    iconClass: (code: string) => `fas fa-${code} fa-fw`,
  },
  {
    name: 'ion',
    type: 'css',
    iconClass: (code: string) => `icon ion-md-${code}`,
  },
  {
    name: 'ion-outline',
    type: 'css',
    iconClass: (code: string) => `icon ion-ios-${code}-outline`,
  },
  {
    name: /brandico|entypo|fontawesome|fontelico|iconicfill|iconicstroke|maki|openwebicons|typicons|zocial/,
    type: 'css',
    iconClass: (code: string, font: string) => `${font}-${code}`,
  },
]
