import { DocsBlock } from "~~/types/docs-blocks"

const modules = import.meta.globEager('./**/*.ts')

const configs = Object.entries(modules)
  .reduce((acc, [name, value]) => {
    const fileNameWithoutSlashAndExtension = name.slice(2, -3)

    acc[fileNameWithoutSlashAndExtension] = value

    return acc
  }, {} as typeof modules)


export const getConfig = (config: string) => {
  return configs[config].default as DocsBlock[]
  // return new Promise<DocsBlock[]>((resolve) => {
  //   configs[config]().then((module) => {
  //     if (module.default) {
  //       resolve(module.default)
  //     } else {
  //       throw new Error('Page config must be default export.')
  //     }
  //   })
  // })
}  

export default configs