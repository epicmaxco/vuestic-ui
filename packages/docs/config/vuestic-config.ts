import { defineVuesticConfig } from 'vuestic-ui'
import { icons } from './icons-config/icons-config'
import GithubSvgIcon from './GithubSvgIcon.vue'
import { markRaw } from 'vue'

const scrollWrapperSelector = '.docs-layout__main-content'

const VaButtonLandingHeader = {
  color: 'textInverted',
  plain: true,
  'hover-behavior': 'mask',
  'hover-mask-color': 'textPrimary',
  'hover-opacity': '1',
}

const halloweenColors = {
  primary: '#e36414',
  secondary: '#EDE8E8',
  success: '#3D9209',
  info: '#158DE3',
  danger: '#E42222',
  warning: '#FFD43A',

  // Background Colors
  backgroundPrimary: '#000',
  backgroundSecondary: '#210505',
  backgroundElement: '#941b0c',
  backgroundBorder: '#621708',
  backgroundSidebar: '#130C0C',
  backgroundLanding: '#f4f9fc',
  backgroundLandingBorder: 'rgba(155, 179, 206, 0.8)',
  textPrimary: '#FFFFFF',
  textInverted: '#FFFFFF',
  shadow: 'rgba(0, 0, 0, 0.30)',

  header: '#b44f10',
  preview1: '#a74a11',
  preview2: '#a72e16',
  partners: '#621708',
  customize1: '#210505',
  customize2: '#000000',
  seamless: '#38120a',
  admin: '#481308',
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
    VaSidebar: {
      color: 'backgroundSidebar',
    },
    presets: {
      VaButton: {
        addToCart: { round: true, color: 'success', icon: 'shopping_cart', 'slot:default': 'Add to card' },
        promotion: { gradient: true, color: 'primary' },
        deleteFromCart: { size: 'small', plain: true },
        landingHeader: VaButtonLandingHeader,
        github: {
          'slot:prepend': markRaw(GithubSvgIcon),
          'slot:default': 'View on GitHub',
          color: '#000000',
          style: 'fill: currentColor',
          class: 'va-button--github',
        }
      },
      VaButtonDropdown: {
        landingHeader: VaButtonLandingHeader,
      },
    },
  },
  colors: {
    presets: {
      // Halloween colors
      light: {
        secondary: '#666E75',
        backgroundPrimary: '#FFFFFF',
        backgroundLanding: '#f4f9fc',
        backgroundLandingBorder: 'rgba(155, 179, 206, 0.8)',
        backgroundSidebar: '#ECF0F1',
      },
      dark: {
        secondary: '#818992',
        backgroundLanding: '#070d14',
        backgroundLandingBorder: 'rgba(43, 49, 56, 0.8)',
        backgroundSidebar: '#131A22',
        shadow: 'rgba(0, 0, 0, 0.12)',
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

        // Landing colors
        header: "#2450BE",
        preview1: "#2450BE",
        preview2: "#557DE2",
        partners: "#335DC9",
        customize1: "#4D2CC1",
        customize2: "#847EE2",
        seamless: "#F4F9FC",
        admin: "#F4F9FC",
      },
      halloween: halloweenColors,
    },
  },
})
