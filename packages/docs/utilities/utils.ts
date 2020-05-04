// File for documentation helper functions

import { ApiDocsBlock, BlockType } from '../types/configTypes'

export const readTemplate = async (fileName: string): Promise<any> => {
  return await import(
    /* webpackChunkName: "examples" */
    /* webpackMode: "lazy-once" */
    `!raw-loader!../examples/${fileName}.vue`)
}

export const readComponent = async (fileName: string): Promise<any> => {
  return await import(
    /* webpackChunkName: "examples" */
    /* webpackMode: "lazy-once" */
    `../examples/${fileName}.vue`)
}

export const getFileName = (component: string, namespace?: string) =>
  namespace ? `${namespace}/${component}` : component

type PrepareConfigOptions = {
  namespace: string,
}

export const prepareConfig = (
  blocks: ApiDocsBlock[],
  options: PrepareConfigOptions,
) => {
  const { namespace } = options

  return blocks.map((block) => {
    if (block.type === BlockType.EXAMPLE) {
      return { namespace, ...block }
    }

    return block
  })
}
