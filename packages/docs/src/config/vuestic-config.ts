import { getThemeFromLocalStorage } from './theme-config'
import { GlobalConfig } from 'vuestic-ui/src/main'
import { icons } from './icons-config/icons-config'

const scrollWrapperSelector = '.base-layout__content'

const colors = getThemeFromLocalStorage()

document.body.style.backgroundColor = colors.backgroundPrimary

export const VuesticConfig: GlobalConfig = {
  icons,
  colors: colors,
  components: {
    VaParallax: {
      target: scrollWrapperSelector,
    },
    VaDropdown: {
      target: scrollWrapperSelector,
    },
  },
}
