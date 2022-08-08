
export type PageBlock = any

export type PageConfigOptions = {
  meta: {
    title: string;
    // TODO: Add more
    category: 'component' | 'introduction' | 'services'
    badge?: string
    visibility?: boolean
  },

  setup(this: { path: string }): PageBlock[]
}

export type CompiledPageConfig = PageConfigOptions & { path: string }

declare global {
  function definePageConfig(options: PageConfigOptions): CompiledPageConfig

  const block: {
    component: (name: string) => any
  }
}