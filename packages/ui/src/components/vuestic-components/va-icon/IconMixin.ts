import { prop, Vue } from 'vue-class-component'

type IconFontName = string
type IconFont = {
  type: 'ligature' | 'css' | 'component'
  // resolution? (iconConfig => iconConfig?) // Different icon solution resolve differently.
}
type IconConfig = {
  iconFont?: IconFontName
  // TODO Add support for these props.
  // size: string
  // tag
  // component
  // color
  // rotation
  // spin
  // other icon props from mixins? Maybe we also can grab interface from mixin to tone down duplication a bit.
}

export type IconConfig = Record<string, {
  // In many cases application requires icon with all customization applied.
  // <va-icon alias="star"/> - so you just use something like this, and color, size, and correct icon implementation are applied.
  // Aliases shouldn't have fallback. So if alias is not defined - things should break :).
  // Aliases are recommended way to use icons and prevent a lot of duplication.
  aliases:  Record<string, IconConfig>,
  iconFont: IconFontName, // default icon font
  iconFonts: Record<IconFontName, IconFont> // Here we can probably use generics to make TS complain if IconFontName is invalid. Not 100% sure.
}>

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
  return font.match(/fas|far|fal|fad|fab/)
}

const isIonicFont = (font: string) => {
  return font === 'ion'
}

const isIonicOutlineFont = (font: string) => {
  return font === 'ion-outline'
}

// https://weloveiconfonts.com/
const isWeLoveIconsFont = (font: string) => {
  return font.match(/brandico|entypo|fontawesome|fontelico|iconicfill|iconicstroke|maki|openwebicons|typicons|zocial/)
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

class IconMixinProps {
  name = prop<string>({ type: String, default: '' })
  iconsConfig = prop<any>({ type: Object, default: {} })
}

export class IconMixin extends Vue.with(IconMixinProps) {
  get icon () {
    return this.getIcon()
  }

  getIcon (): any {
    if (!this.name) {
      return null
    }

    if (this.iconsConfig.icons && !(this.name in this.iconsConfig.icons)) {
      throw new Error(`Icon config for icon '${this.name}' not found`)
    }

    const iconConfig = this.iconsConfig.icons[this.name]
    const iconFont = iconConfig.font || // from icon alias config
      this.iconsConfig.defaultFont // from icon component context config

    return {
      iconClass: getClass(iconConfig, iconFont),
      content: getContent(iconConfig, iconFont),
      component: getComponent(iconConfig),
    }
  }
}
