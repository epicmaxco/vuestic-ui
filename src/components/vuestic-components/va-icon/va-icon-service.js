const iconsConfig = {
  defaultFont: 'md',
  icons: {
    'home': {
      code: 'home',
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
    },
  },
}

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
    [`${font}-${icon.code}`]: isWeLoveIconsFont(font),
  }
}

const getContent = (icon, font) => {
  if (isMaterialFont(font)) {
    return icon.code
  }

  return null
}

const getIcon = (key, font = '') => {
  if (!key) {
    return null
  }

  const { defaultFont, icons } = iconsConfig

  if (!(key in icons)) {
    throw new Error(`Configuration for icon ${key} not found`)
  }

  const iconConfig = icons[key]
  const iconFont = font || iconConfig.font || defaultFont

  return {
    classes: getClasses(iconConfig, iconFont),
    content: getContent(iconConfig, iconFont),
  }
}

const addOrUpdateIcon = (key, code, font) => {
  if (!key) {
    throw new Error('Key parameter is required')
  }

  if (!code) {
    throw new Error('Code parameter is required')
  }

  iconsConfig.icons[key] = {
    code,
    font,
  }
}

export { addOrUpdateIcon, getIcon }
