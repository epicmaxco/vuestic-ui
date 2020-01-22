const iconConfig = {
  defaultFont: 'md',
  icons: {
    'home': {
      code: 'home'
    },
    'fa4-home': {
      code: 'home',
      font: 'fa4',
    },
    'fas-home': {
      code: 'home',
      font: 'fas',
    },
    'ion-home': {
      code: 'home',
      font: 'ion',
    },
    'entypo-home': {
      code: 'home',
      font: 'entypo',
    }
  },
}

const iconSet = {}

const isMaterialFont = font => font === 'md'
const isFontAwesome4Font = font => font === 'fa4'
const isFontAwesome5Font = font => font.match(/fas|far|fal|fad|fab/)
const isIonicFont = font => font === 'ion'
// https://weloveiconfonts.com/
const isWeLoveIconsFont = font => font.match(/brandico|entypo|fontawesome|fontelico|iconicfill|iconicstroke|maki|openwebicons|typicons|zocial/)

const getClasses = (icon, font) => {
  return {
    'material-icons': isMaterialFont(font),
    [`fa fa-${icon.code}`]: isFontAwesome4Font(font),
    [`${font} fa-${icon.code}`]: isFontAwesome5Font(font),
    [`icon ion-md-${icon.code}`]: isIonicFont(font),
    [`${font}-${icon.code}`]: isWeLoveIconsFont(font)
  }
}

const getContent = (icon, font) => {
  if (isMaterialFont(font)) {
    return icon.code
  }

  return null
}

const init = () => {
  const { defaultFont, icons } = iconConfig

  Object.keys(icons).forEach(key => {
    const icon = icons[key]
    const font = icon.font || defaultFont

    iconSet[key] = {
      classes: getClasses(icon, font),
      content: getContent(icon, font),
    }
  })
}

init()

const getIcon = key => {
  if (!key) {
    return null
  }

  if (!(key in iconSet)) {
    throw new Error(`Configuration for ${key} icon was not founf`)
  }

  return iconSet[key]
}

const addOrUpdateIcon = () => {

}

export { addOrUpdateIcon, getIcon }
