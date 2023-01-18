import { type PageConfigOptions } from "../modules/page-config"

type PageConfigJSModule = { default: PageConfigOptions }

const files = Object.entries(import.meta.glob<false, string, PageConfigJSModule>('../page-config/**/index.ts'))
  .reduce((acc, [key, fn]) => {
    acc[key.replace('../page-config/', '').replace('/index.ts', '')] = fn
    return acc
  }, {} as Record<string, () => Promise<PageConfigJSModule>>)

console.log(files)

export const usePageConfigs = () => {
  return files
}

export const usePageConfig = (name: string) => {
  const config = ref<PageConfigOptions | null>(null)

  if (!files[name]) {
    console.log(`Page config ${name} not found`)
    console.log(Object.keys(files))
  }

  files[name]().then((module) => {
    config.value = module.default
  })


  return config
}
