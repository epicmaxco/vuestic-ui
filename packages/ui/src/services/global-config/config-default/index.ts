import { ComponentConfig } from '../../component-config/component-config'

export const getComponentsDefaultConfig = (): ComponentConfig =>
  // TODO: Should be handled in size service
  ({
    VaIcon: {
      sizesConfig: {
        defaultSize: 24,
        sizes: {
          small: 16,
          medium: 24,
          large: 32,
        },
      },
    },
    VaRating: {
      sizesConfig: {
        defaultSize: 24,
        sizes: {
          small: 16,
          medium: 24,
          large: 32,
        },
      },
    },
    all: {},
    presets: {
      VaButton: {
        default: {
          backgroundOpacity: 1,
          hoverBehaviour: 'mask',
          hoverOpacity: 0.15,
          pressedBehaviour: 'mask',
          pressedOpacity: 0.13,
        },
        primary: {
          backgroundOpacity: 0.1,
          hoverBehaviour: 'opacity',
          hoverOpacity: 0.07,
          pressedBehaviour: 'opacity',
          pressedOpacity: 0.13,
        },
        secondary: {
          backgroundOpacity: 0,
          hoverBehaviour: 'opacity',
          hoverOpacity: 0.07,
          pressedBehaviour: 'opacity',
          pressedOpacity: 0.13,
        },
        plain: {
          plain: true,
          hoverBehaviour: 'mask',
          hoverOpacity: 0.15,
          pressedBehaviour: 'mask',
          pressedOpacity: 0.13,
        },
        plainOpacity: {
          plain: true,
          textOpacity: 0.6,
          hoverBehaviour: 'opacity',
          hoverOpacity: 1,
          pressedBehaviour: 'opacity',
          pressedOpacity: 0.9,
        },
      },
    },
  })
