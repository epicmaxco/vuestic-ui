export const getUIElementNameFromPath = (path: string): string => {
  /**
   * work's example:
   * 'src\page-configs\ui-elements\component-name' --> 'component-name'
   * why:
   * it is only a guess that the path written through the relative operator "../"
   * works differently in unix and windows and for fully identical operation
   * in webpack we have to pass a more specific path as specified in the documentation
   * https://webpack.js.org/api/module-methods/#dynamic-expressions-in-import
   * TODO: To remove this hack, we need to pass the name of the folder from which the webpack should import in each case instead of path
   **/
  return path.match(/[\\/]([\w-_]+)$/)?.[1] || path || ''
}

export const readTemplate = async (path: string, fileName: string): Promise<any> => {
  const uiElementName = getUIElementNameFromPath(path)
  return await import(
    /* webpackChunkName: "examples" */
    /* webpackMode: "lazy" */
    `!raw-loader!../page-configs/ui-elements/${uiElementName}/examples/${fileName}.vue`)
}

export const readComponent = async (path: string, fileName: string): Promise<any> => {
  const uiElementName = getUIElementNameFromPath(path)
  return await import(
    /* webpackChunkName: "examples" */
    /* webpackMode: "lazy" */
    `../page-configs/ui-elements/${uiElementName}/examples/${fileName}`
  )
}

export const readDocsComponent = async (path: string, fileName: string): Promise<any> => {
  return await import(
    /* webpackChunkName: "docs-components" */
    /* webpackMode: "lazy" */
    `../${path}/components/${fileName}.vue`)
}
