import { PageConfig, PageRoute } from "~~/types/page-config"

//TODO: Let's have some server with API calls, so we don't need to bundle page-configs
const modules = import.meta.globEager('./**/index.ts')

export const configs = Object.entries(modules)
  .reduce((acc, [name, value]) => {
    const configPath = name.replace('/index.ts', '').replace('./', '')

    acc[configPath] = value

    return acc
  }, {} as typeof modules)

export const getConfig = (configPath: string) => {
  return configs[configPath].default as PageConfig
}

export const createPageRoutes = () => {
  return Object.values(Object.keys(configs)
    .sort((a, b) => a < b ? -1 : 1)
    .reduce((acc, configPath, i, arr) => {
      const [catergory, child] = configPath.split('/')

      const name = child || catergory

      const page: PageRoute = { ...getConfig(configPath), path: configPath, name }

      if (child) {
        if (!acc[catergory].children) { acc[catergory].children = [] }
        acc[catergory].children.push(page)
      } else {
        acc[catergory] = page
      }

      return acc
    }, {} as Record<string, PageRoute>))
} 
