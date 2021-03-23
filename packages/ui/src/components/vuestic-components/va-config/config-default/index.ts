import { ComponentConfig } from './../../../../services/component-config/component-config'

export const getDefaultConfig = (): ComponentConfig => {
  // TODO Should be hanled in size service
  return {
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
  }
}
