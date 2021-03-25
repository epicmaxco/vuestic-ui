import { IconConfig } from '../../services/icon-config/types'

const fontsConfig: { [key: string]: IconConfig} = {
  md: {
    name: 'md-{name}',
    iconClass: 'material-icons',
    content: (content: string) => content,
  },
  fa: {
    name: 'fa4-{code}',
    iconClass: ({ code }: any) => `fa fa-${code}`,
  },
  fa5: {
    name: /(fas|far|fal|fad|fab)-(.*)/,
    iconClass: (font: string, code: string) => `${font} fa-${code} fa-fw`,
  },
  ion: {
    name: /ion-(.*)/,
    iconClass: (code: string) => `icon ion-md-${code}`,
  },
  ion_o: {
    name: /ion-outline-(.*)/,
    iconClass: (code: string) => `icon ion-ios-${code}-outline`,
  },
  entypo: {
    name: 'entypo-{code}',
    iconClass: (regexGroups: any) => `entypo-${regexGroups.code}`,
  },
  welovefonts: {
    name: /(brandico|fontawesome|fontelico|iconicfill|iconicstroke|maki|openwebicons|typicons|zocial)-(.*)/,
    iconClass: (font: string, code: string) => `${font}-${code}`,
  },
  text: {
    name: 'text',
  },
}

export default Object.values(fontsConfig)
