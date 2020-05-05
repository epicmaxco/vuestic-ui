// File for documentation helper functions

export const readFile = async (fileName: string): Promise<any> => {
  return await import(
    /* webpackChunkName: "examples" */
    /* webpackMode: "lazy-once" */
    fileName)
}
