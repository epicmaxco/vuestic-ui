import type { DefineComponent } from "vue"

export type PageConfigComponent = (name: string) => {
  type: 'component'
  name: string
  component: Promise<DefineComponent>
}

export const compileComponentBlock = (code: string) => {
  return code.replaceAll(/block.component\(['|"](.*)['|"]\)/g, `
{
  type: 'component',
  name: '$1',
  component: defineAsyncComponent(() => import('./components/$1')),
}
`.trim())
}