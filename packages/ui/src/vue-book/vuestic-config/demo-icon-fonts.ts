const fontsConfig = {
  md: {
    name: /md-(.*)/,
    iconClass: 'material-icons',
    content: (content: string) => content,
  },
  fa: {
    name: /fa4-(.*)/,
    iconClass: (code: string) => `fa fa-${code}`,
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
  welovefonts: {
    name: /(brandico|entypo|fontawesome|fontelico|iconicfill|iconicstroke|maki|openwebicons|typicons|zocial)-(.*)/,
    iconClass: (font: string, code: string) => `${font}-${code}`,
  },
  text: {
    name: 'text',
  },
}

export default Object.values(fontsConfig)
