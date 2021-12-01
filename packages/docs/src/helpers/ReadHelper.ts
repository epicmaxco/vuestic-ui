
export async function readTemplate (path: string, fileName: string): Promise<any> {
  return await import(
      /* webpackChunkName: "examples" */
      /* webpackMode: "lazy-once" */
    `!raw-loader!../${path}/examples/${fileName}.vue`)
    // `!raw-loader!../page-configs/${path}/examples/${fileName}.vue`)
}

export async function readComponent (path: string, fileName: string): Promise<any> {
  return await import(
      /* webpackChunkName: "examples" */
      /* webpackMode: "lazy-once" */
    `../${path}/examples/${fileName}.vue`)
    // `../page-configs/${path}/examples/${fileName}.vue`)
}

export async function readDocsComponent (path: string, fileName: string): Promise<any> {
  return await import(
      /* webpackChunkName: "docs-components" */
      /* webpackMode: "lazy-once" */
    `../${path}/components/${fileName}.vue`)
    // `../page-configs/${path}/components/${fileName}.vue`)
}
