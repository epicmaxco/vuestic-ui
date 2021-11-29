// File for documentation helper functions

function getUIElementNameFromPath (path: string): string {
  // 'src\page-configs\ui-elements\component-name' --> 'component-name'
  // we need to use folder names instead of full paths to the component
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
    /* webpackMode: "lazy-once" */
    `../${path}/components/${fileName}.vue`)
}
