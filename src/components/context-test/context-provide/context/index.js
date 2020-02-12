import iconsDemoConfig from './va-icons-demo-config'
import iconsDocsConfig from './va-icons-docs-config'
import iconsFrameworkConfig from './va-icons-framework-config'

export const getContext = () => {
  return {
    VaIcon: {
      font: 'md',
      config: { ...iconsDemoConfig, ...iconsDocsConfig, ...iconsFrameworkConfig },
    },
  }
}
