import { Component, Vue, Prop } from 'vue-property-decorator'

const isMaterialFont = (font: string) => {
  return font === 'md'
}

const isMaterialOutlinedFont = (font: string) => {
  return font === 'md-outlined'
}

const isFontAwesome4Font = (font: string) => {
  return font === 'fa4'
}

const isFontAwesome5Font = (font: string) => {
  return font ? font.match(/fas|far|fal|fad|fab/) : false
}

const isIonicFont = (font: string) => {
  return font === 'ion'
}

const isIonicOutlineFont = (font: string) => {
  return font === 'ion-outline'
}

// https://weloveiconfonts.com/
const isWeLoveIconsFont = (font: string) => {
  return font ? font.match(/brandico|entypo|fontawesome|fontelico|iconicfill|iconicstroke|maki|openwebicons|typicons|zocial/) : false
}

const getClass = (iconConfig: any, font: string) => {
  let iconClass = ''
  if (isMaterialFont(font)) {
    iconClass = 'material-icons'
  } else if (isMaterialOutlinedFont(font)) {
    iconClass = 'material-icons-outlined'
  } else if (isFontAwesome4Font(font)) {
    iconClass = `fa fa-${iconConfig.code}`
  } else if (isFontAwesome5Font(font)) {
    iconClass = `${font} fa-${iconConfig.code} fa-fw`
  } else if (isIonicFont(font)) {
    iconClass = `icon ion-md-${iconConfig.code}`
  } else if (isIonicOutlineFont(font)) {
    iconClass = `icon ion-ios-${iconConfig.code}-outline`
  } else if (isWeLoveIconsFont(font)) {
    iconClass = `${font}-${iconConfig.code}`
  }

  return iconClass
}

const getContent = (iconConfig: any, font: string) => {
  if (isMaterialFont(font) || isMaterialOutlinedFont(font)) {
    return iconConfig.code
  }

  return null
}

const getComponent = (iconConfig: any) => {
  return iconConfig.component
}

@Component
export class IconMixin extends Vue {
  @Prop({ type: String, default: '' }) name!: string
  @Prop({ type: Object, default: () => ({}) }) iconsConfig!: Record<string, any>

  get icon () {
    return this.getIcon()
  }

  getIcon (): any {
    const { iconsConfig = {} } = this

    if (!this.name) {
      return null
    }

    if (iconsConfig.icons && !(this.name in iconsConfig.icons)) {
      throw new Error(`Icon config for icon '${this.name}' not found`)
    }

    const iconConfig = (iconsConfig.icons || {})[this.name] || {}
    const iconFont = iconConfig.font || // from icon alias config
      iconsConfig.defaultFont // from icon component context config

    return {
      iconClass: getClass(iconConfig, iconFont),
      content: getContent(iconConfig, iconFont),
      component: getComponent(iconConfig),
    }
  }
}
