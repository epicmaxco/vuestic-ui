import { ComponentConfig } from '../types'

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
          hoverBehavior: 'mask',
          hoverOpacity: 0.15,
          pressedBehavior: 'mask',
          pressedOpacity: 0.13,
        },
        primary: {
          backgroundOpacity: 0.1,
          hoverBehavior: 'opacity',
          hoverOpacity: 0.07,
          pressedBehavior: 'opacity',
          pressedOpacity: 0.13,
        },
        secondary: {
          backgroundOpacity: 0,
          hoverBehavior: 'opacity',
          hoverOpacity: 0.07,
          pressedBehavior: 'opacity',
          pressedOpacity: 0.13,
        },
        plain: {
          plain: true,
          hoverBehavior: 'mask',
          hoverOpacity: 0.15,
          pressedBehavior: 'mask',
          pressedOpacity: 0.13,
        },
        plainOpacity: {
          plain: true,
          textOpacity: 0.6,
          hoverBehavior: 'opacity',
          hoverOpacity: 1,
          pressedBehavior: 'opacity',
          pressedOpacity: 0.9,
        },
      },
      VaInputWrapper: {
        solid: {
          background: 'backgroundElement',
        },
        bordered: {
          class: 'va-input-wrapper--bordered',
          background: 'backgroundElement',
        },
      },
      VaCheckbox: {
        solid: {
          style: '--va-checkbox-background: var(--va-background-element)',
        },
      },
      VaRadio: {
        solid: {
          style: '--va-radio-background: var(--va-background-element)',
        },
      },
    },
  })
