import { PartialGlobalConfig } from 'vuestic-ui'
import { icons } from './icons-config/icons-config'

const scrollWrapperSelector = '.docs-layout__main-content'

const VaButtonLandingHeader = {
  round: false,
  size: 'large',
  plain: true,
  'hover-behavior': 'mask',
  'hover-mask-color': 'textPrimary',
  'hover-opacity': '1',
}

// const cookie = useCookie('vuestic-theme')

const theme = 'light'

export const VuesticConfig: PartialGlobalConfig = {
  icons,
  components: {
    VaParallax: {
      target: scrollWrapperSelector,
    },
    VaDropdown: {
      target: scrollWrapperSelector,
    },
    VaBacktop: {
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
    currentPresetName: theme,
    presets: {
      light: {
        secondary: '#666E75',
        backgroundPrimary: '#FFFFFF',
        backgroundLanding: '#f4f9fc',
        backgroundLandingBorder: 'rgba(155, 179, 206, 0.8)',
      },
      dark: {
        // TODO: Check color contrast:  current primary is bad
        // primary: '#5389F3',
        secondary: '#818992',
        backgroundLanding: '#070d14',
        backgroundLandingBorder: 'rgba(43, 49, 56, 0.8)',
      },
    },
  },
}
