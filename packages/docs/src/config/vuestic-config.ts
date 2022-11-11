import { PartialGlobalConfig } from 'vuestic-ui/src/main'
import { icons } from './icons-config/icons-config'

const scrollWrapperSelector = '.base-layout__content'

const VaButtonLandingHeader = {
  round: false,
  size: 'large',
  plain: true,
  'hover-behavior': 'mask',
  'hover-mask-color': 'textPrimary',
  'hover-opacity': '1',
}

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
        landingHeader: VaButtonLandingHeader,
      },
      VaButtonDropdown: {
        landingHeader: VaButtonLandingHeader,
      },
    },
  },
  colors: {
    currentPresetName: localStorage.getItem('vuestic-docs-theme') || 'light',
    presets: {
      light: {
        backgroundPrimary: '#FFFFFF',
        backgroundLanding: '#f4f9fc',
        backgroundLandingBorder: 'rgba(155, 179, 206, 0.8)',
      },
      dark: {
        backgroundLanding: '#070d14',
        backgroundLandingBorder: 'rgba(43, 49, 56, 0.8)',
      },
    },
  },
}
