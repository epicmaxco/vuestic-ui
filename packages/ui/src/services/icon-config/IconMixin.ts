import { prop, Vue } from 'vue-class-component'
import { getIconConfig } from './get-icon-config'
import { getGlobalConfig } from '../GlobalConfigPlugin'
import { copyObjectWithoutUndefined } from './utils'

class IconMixinProps {
  name = prop<string>({ type: String, required: true })
  iconsConfig = prop<any>({ type: Object, default: {} })
}

export class IconMixin extends Vue.with(IconMixinProps) {
  get icon () {
    const globalConfig = getGlobalConfig()
    const iconsConfig = globalConfig.icons
    const config = getIconConfig(this.name, iconsConfig)
    const props = copyObjectWithoutUndefined(this.$props)
    return { ...config, ...props }
  }
}
