import { PageConfigOptions } from "../modules/page-config"

type PageConfigJSModule = { default: PageConfigOptions }

const files = Object.entries(import.meta.glob<true, string, PageConfigJSModule>('../page-config/**/index.ts', { eager: true }))
  .reduce((acc, [key, fn]) => {
    acc[key.replace('../page-config/', '').replace('/index.ts', '')] = fn
    return acc
  }, {} as Record<string, PageConfigJSModule>)

export const usePageConfigs = () => {
  return files
}

export const usePageConfig = (name: string) => {
  const config = ref<PageConfigOptions | null>(null)

  if (!files[name]) {
    console.log(`Page config ${name} not found`)
    console.log(Object.keys(files))
  }

  config.value = files[name].default

  return config
}
