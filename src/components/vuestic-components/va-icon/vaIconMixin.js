import { makeContextablePropsMixin } from './../../context-test/context-provide/ContextPlugin'

const isMaterialFont = font => {
  return font === 'md'
}

const isFontAwesome4Font = font => {
  return font === 'fa4'
}

const isFontAwesome5Font = font => {
  return font.match(/fas|far|fal|fad|fab/)
}

const isIonicFont = font => {
  return font === 'ion'
}

// https://weloveiconfonts.com/
const isWeLoveIconsFont = font => {
  return font.match(/brandico|entypo|fontawesome|fontelico|iconicfill|iconicstroke|maki|openwebicons|typicons|zocial/)
}

const getClass = (iconConfig, font) => {
  let iconClass = ''
  if (isMaterialFont(font)) {
    iconClass = 'material-icons'
  } else if (isFontAwesome4Font(font)) {
    iconClass = `fa fa-${iconConfig.code}`
  } else if (isFontAwesome5Font(font)) {
    iconClass = `${font} fa-${iconConfig.code}`
  } else if (isIonicFont(font)) {
    iconClass = `icon ion-md-${iconConfig.code}`
  } else if (isWeLoveIconsFont(font)) {
    iconClass = `${font}-${iconConfig.code}`
  }

  return iconClass
}

const getContent = (iconConfig, font) => {
  if (isMaterialFont(font)) {
    return iconConfig.code
  }

  return null
}

const getComponent = iconConfig => {
  return iconConfig.component
}

const iconContextMixin = makeContextablePropsMixin({
  name: {
    type: String,
    default: '',
  },
  iconsConfig: {
    type: Object,
    default: () => ({}),
  },
})

export default {
  mixins: [iconContextMixin],
  computed: {
    icon () {
      return this.getIcon(this.name)
    },
  },
  methods: {
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
    },
  },
}
