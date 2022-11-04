import type { DefineComponent } from "vue"

export type PageConfigExample = (name: string) => {
  type: 'example'
  name: string
  component: Promise<DefineComponent>,
  source: Promise<string>
}

export const compileExampleBlock = (code: string) => {
  return code.replaceAll(/block.example\(['|"](.*)['|"]\)/g, `
{
  type: 'example',
  name: '$1',
  component: defineAsyncComponent(() => import('./examples/$1.vue')),
  source: import('./examples/$1.vue?raw').then(m => m.default),
}
`.trim())
}