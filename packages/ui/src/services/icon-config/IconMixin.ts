import { prop, Vue } from 'vue-class-component'
import { getIcon } from './icon-config'

class IconMixinProps {
  name = prop<string>({ type: String, default: '' })
  iconsConfig = prop<any>({ type: Object, default: {} })
}

export class IconMixin extends Vue.with(IconMixinProps) {
  get icon () {
    return getIcon(this.name, this.iconsConfig)
  }
}
