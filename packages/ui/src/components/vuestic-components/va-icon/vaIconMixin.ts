import { makeContextablePropsMixin } from '../../context-test/context-provide/ContextPlugin'
import { Component, Mixins } from 'vue-property-decorator'

const isMaterialFont = (font: string) => font === 'md'

const isMaterialOutlinedFont = (font: string) => font === 'md-outlined'

const isFontAwesome4Font = (font: string) => font === 'fa4'

const isFontAwesome5Font = (font: string) => font.match(/fas|far|fal|fad|fab/)

const isIonicFont = (font: string) => font === 'ion'

const isIonicOutlineFont = (font: string) => font === 'ion-outline'

// https://weloveiconfonts.com/
const isWeLoveIconsFont = (font: string) => font.match(/brandico|entypo|fontawesome|fontelico|iconicfill|iconicstroke|maki|openwebicons|typicons|zocial/)

// TODO Icon config should be proper type.
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

@Component({
})
export default class VaIconMixin extends Mixins(
  makeContextablePropsMixin({
    name: {
      type: String,
      default: '',
    },
    iconsConfig: {
      type: Object,
      default: () => ({}),
    },
  }),
) {
  get icon () {
    return this.getIcon()
  }

  getIcon () {
    if (!this.name) {
      return null
    }

    if (this.c_iconsConfig.icons && !(this.name in this.c_iconsConfig.icons)) {
      throw new Error(`Icon config for icon '${this.name}' not found`)
    }

    const iconConfig = this.c_iconsConfig.icons[this.name]
    const iconFont = iconConfig.font || // from icon alias config
      this.c_iconsConfig.defaultFont // from icon component context config

    return {
      iconClass: getClass(iconConfig, iconFont),
      content: getContent(iconConfig, iconFont),
      component: getComponent(iconConfig),
    }
  }
}
