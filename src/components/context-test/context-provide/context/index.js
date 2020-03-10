import iconsDemoConfig from './va-icons-demo-config'
import iconsDocsConfig from './va-icons-docs-config'
import iconsFrameworkConfig from './va-icons-framework-config'

export const getContext = () => {
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
        }
      },
    },
  }
}
