import { PartialGlobalConfig } from 'vuestic-ui/src/main'
import { icons } from './icons-config/icons-config'

const scrollWrapperSelector = '.base-layout__content'

export const VuesticConfig: Partial<PartialGlobalConfig> = {
  icons,
  components: {
    VaParallax: {
      target: scrollWrapperSelector,
    },
    VaDropdown: {
      target: scrollWrapperSelector,
    },
    presets: {
      VaButton: {
        addToCart: { size: 'large', round: true },
        deleteFromCart: { size: 'small', plain: true },
        landingHeader: {
          size: 'large',
          plain: true,
          'hover-behavior': 'mask',
          'hover-mask-color': 'textPrimary',
          'hover-opacity': '1',
        },
      },
    },
  },
  colors: {
    currentPresetName: localStorage.getItem('vuestic-docs-theme') || 'light',
    presets: {
      light: {
        backgroundPrimary: '#FFFFFF',
        backgroundLanding: '#f4f9fc',
      },
      dark: {
        backgroundLanding: '#131A22',
      },
    },
  },
}
