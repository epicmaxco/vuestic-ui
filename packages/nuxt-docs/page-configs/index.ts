import { PageConfig, PageRoute } from "~~/types/page-config"

// TOOD: deal with treeshaking here somehow.
const modules = import.meta.globEager('./**/index.ts')

export const configs = Object.entries(modules)
  .filter(([name, config]) => {
    const path = name.replace('/index.ts', '').replace('./', '')
    return path.split('/').length <= 2
  })
  .reduce((acc, [name, value]) => {
    const configPath = name.replace('/index.ts', '').replace('./', '')

    acc[configPath] = value

    return acc
  }, {} as typeof modules)

export const getConfig = (configPath: string) => {
  const config = configs[configPath]

  if (!config) {
    throw new Error(`Config ${configPath} not found`)
  }

  return config.default as PageConfig
}

export const createPageRoutes = () => {
  return Object.values(Object.keys(configs)
    .sort((a, b) => a < b ? -1 : 1)
    .reduce((acc, configPath, i, arr) => {
      const [category, child] = configPath.split('/')

      const name = child || category

      const page: PageRoute = { ...getConfig(configPath), path: configPath, name }

      if (child) {
        if (!acc[category]) {
          return acc
        }

        if (!acc[category].children) { acc[category].children = [] }
        acc[category].children.push(page)
      } else {
        acc[category] = page
      }

      return acc
    }, {} as Record<string, PageRoute>))
}
