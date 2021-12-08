export const readTemplate = async (path: string, fileName: string): Promise<any> => {
  return await import(
    /* webpackChunkName: "examples" */
    /* webpackMode: "lazy" */
    `!raw-loader!../page-configs/${path}/examples/${fileName}.vue`)
}

export const readComponent = async (path: string, fileName: string): Promise<any> => {
  return await import(
    /* webpackChunkName: "examples" */
    /* webpackMode: "lazy" */
    `../page-configs/${path}/examples/${fileName}`
  )
}

export const readDocsComponent = async (path: string, fileName: string): Promise<any> => {
  return await import(
    /* webpackChunkName: "docs-components" */
    /* webpackMode: "lazy" */
    `../page-configs/${path}/components/${fileName}.vue`)
}
