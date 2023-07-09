import { defineVuesticConfig } from 'vuestic-ui'
import { icons } from './icons-config/icons-config'

const scrollWrapperSelector = '.docs-layout__main-content'

const VaButtonLandingHeader = {
  color: 'textInverted',
  plain: true,
  'hover-behavior': 'mask',
  'hover-mask-color': 'textPrimary',
  'hover-opacity': '1',
}

export const VuesticConfig = defineVuesticConfig({
  icons,
  components: {
    VaParallax: {
      target: scrollWrapperSelector,
    },
    VaDropdown: {
      target: scrollWrapperSelector,
      teleport: 'body',
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
      landing: {
        primary: '#1827A7',
        secondary: '#767C88',
        success: '#3D9209',
        info: '#158DE3',
        danger: '#E42222',
        warning: '#FFD43A',

        // Background Colors
        backgroundPrimary: '#f6f6f6',
        backgroundSecondary: '#FFFFFF',
        backgroundElement: '#ECF0F1',
        backgroundBorder: '#DEE5F2',

        // Text Colors
        textPrimary: '#262824',
        textInverted: '#FFFFFF',

        // Misc
        shadow: 'rgba(0, 0, 0, 0.12)',
        focus: '#49A8FF',
      },
    },
  },
})
