// File for documentation helper functions

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
