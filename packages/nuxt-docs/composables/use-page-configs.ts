import { PageConfigOptions } from "../modules/page-config"

type PageConfigJSModule = { default: PageConfigOptions }

const files = Object.entries(import.meta.glob('../page-config/**/index.ts'))
  .reduce((acc, [key, fn]) => {
    acc[key.replace('../page-config/', '').replace('/index.ts', '')] = fn
    return acc
  }, {})

export const usePageConfigs = () => {
  return files
}

export const usePageConfig = (name: string) => {
  const config = ref<PageConfigOptions | null>(null)

  files[name]().then((c: PageConfigJSModule) => {
    config.value = c.default
  })

  return config
}
