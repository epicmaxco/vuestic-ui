// File for documentation helper functions

export const readTemplate = async (path: string, fileName: string): Promise<any> => {
  return await import(
    /* webpackChunkName: "examples" */
    /* webpackMode: "lazy-once" */
    `!raw-loader!../page-configs/${path}/examples/${fileName}.vue`)
}

export const readComponent = async (path: string, fileName: string): Promise<any> => {
  return await import(
    /* webpackChunkName: "examples" */
    /* webpackMode: "lazy-once" */
    `../page-configs/${path}/examples/${fileName}.vue`)
}

export const readDocsComponent = async (path: string, fileName: string): Promise<any> => {
  return await import(
    /* webpackChunkName: "docs-components" */
    /* webpackMode: "lazy-once" */
    `../page-configs/${path}/components/${fileName}.vue`)
}
