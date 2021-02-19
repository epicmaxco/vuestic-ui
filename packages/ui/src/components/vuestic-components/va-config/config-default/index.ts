import iconsDemoConfig from './va-icons-demo-config'
import iconsDocsConfig from './va-icons-docs-config'
import iconsFrameworkConfig from './va-icons-framework-config'

export const getDefaultConfig = () => {
  return {
    VaIcon: {
      iconsConfig: {
        defaultFont: 'md',
        icons: {
          ...iconsDemoConfig,
          ...iconsDocsConfig,
          ...iconsFrameworkConfig,
        },
      },
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
