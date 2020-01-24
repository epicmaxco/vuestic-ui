const iconsConfig = {
  defaultFont: 'md',
  icons: {
    // Fraemwork
    'arrow_back_ios': {
      code: 'arrow_back_ios',
    },
    'arrow_forward_ios': {
      code: 'arrow_forward_ios',
    },
    'first_page': {
      code: 'first_page',
    },
    'last_page': {
      code: 'last_page',
    },
    'chevron_right': {
      code: 'chevron_right',
    },
    'chevron_left': {
      code: 'chevron_left',
    },
    'expand_more': {
      code: 'expand_more',
    },
    'expand_less': {
      code: 'expand_less',
    },
    'arrow_drop_down': {
      code: 'arrow_drop_down',
    },
    'arrow_drop_up': {
      code: 'arrow_drop_up',
    },
    'calendar_today': {
      code: 'calendar_today',
    },
    'delete_outline': {
      code: 'delete_outline',
    },
    'clear': {
      code: 'clear',
    },
    'check': {
      code: 'check',
    },
    'warning': {
      code: 'warning',
    },
    'highlight_off': {
      code: 'highlight_off',
    },
    'close': {
      code: 'close',
    },
    'done': {
      code: 'done',
    },
    'cancel': {
      code: 'cancel',
    },
    // Snippets
    'remove_red_eye': {
      code: 'remove_red_eye',
    },
    // 'warning': {
    //   code: 'warning',
    // },
    'account_box': {
      code: 'account_box',
    },
    'info': {
      code: 'info',
    },
    // 'account_box': {
    //   code: 'account_box',
    // },
    'face': {
      code: 'face',
    },
    // 'account_box': {
    //   code: 'account_box',
    // },
    // 'warning': {
    //   code: 'warning',
    // },
    // 'arrow_forward_ios': {
    //   code: 'arrow_forward_ios',
    // },
    // Demo
    'info_outline': {
      code: 'info_outline',
    },
    'check_circle': {
      code: 'check_circle',
    },
    // 'face': {
    //   code: 'face',
    // },
    'share': {
      code: 'share',
    },
    'volume_down': {
      code: 'volume_down',
    },
    'volume_up': {
      code: 'volume_up',
    },
    // 'remove_red_eye': {
    //   code: 'remove_red_eye',
    // },
    'star': {
      code: 'star',
    },
    'star_half': {
      code: 'star_half',
    },
    'star_border': {
      code: 'star_border',
    },
    'send': {
      code: 'send',
    },
    'room': {
      code: 'room',
    },
    'schedule': {
      code: 'schedule',
    },
    'create': {
      code: 'create',
    },
    'add': {
      code: 'add',
    },
    'add_circle_outline': {
      code: 'add_circle_outline',
    },
    'block': {
      code: 'block',
    },
    'menu': {
      code: 'menu',
    },
    'loop': {
      code: 'loop',
    },
    'email': {
      code: 'email',
    },
    'local_phone': {
      code: 'local_phone',
    },
    'volume_mute': {
      code: 'volume_mute',
    },
    'volume_off': {
      code: 'volume_off',
    },
    'error': {
      code: 'error',
    },
    // Icons demo
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

const getClass = (icon, font) => {
  let iconClass = ''
  if (isMaterialFont(font)) {
    iconClass = 'material-icons'
  } else if (isFontAwesome4Font(font)) {
    iconClass = `fa fa-${icon.code}`
  } else if (isFontAwesome5Font(font)) {
    iconClass = `${font} fa-${icon.code}`
  } else if (isIonicFont(font)) {
    iconClass = `icon ion-md-${icon.code}`
  } else if (isWeLoveIconsFont(font)) {
    iconClass = `${font}-${icon.code}`
  }

  return iconClass
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
    throw new Error(`Configuration for icon '${key}' not found`)
  }

  const iconConfig = icons[key]
  const iconFont = font || iconConfig.font || defaultFont

  return {
    iconClass: getClass(iconConfig, iconFont),
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
