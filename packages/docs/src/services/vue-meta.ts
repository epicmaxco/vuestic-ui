import VueMeta, { createMetaManager, defaultConfig, deepestResolver } from 'vue-meta'

export const genAppMetaInfo = () => {
  const title = 'Vuestic UI — Vue.js 3.0 UI Framework'
  const description = 'Vuestic UI is modern vue.js UI framework designed to be simple and customizable for any type and scale of application'
  const keywords = 'vue, vue components, vuestic, vuestic-ui, component framework'

  return genMetaInfo(title, description, keywords)
}

const parseMeta = (
  prefix: string,
  metadata: Record<string, string>,
) => {
  const meta = []

  for (const key in metadata) {
    const content = metadata[key]
    const property = `${prefix}:${key}`

    meta.push({
      vmid: property,
      property,
      content,
    })
  }

  return meta
}

const getFacebookMeta = () => {
  if (!process.env.VUE_APP_FACEBOOK_APP_ID) {
    return {} as any
  }
  return parseMeta('fb', { app_id: process.env.VUE_APP_FACEBOOK_APP_ID })
}

const genMetaInfo = (
  title: string,
  description: string,
  keywords: string,
) => {
  const length = description.length

  description = length <= 117
    ? description
    : `${description.slice(0, 116)}...`

  return {
    link: [],
    meta: [
      { vmid: 'description', name: 'description', content: description },
      { vmid: 'keywords', name: 'keywords', content: keywords },
      ...getFacebookMeta(),
      ...parseMeta('og', {
        description,
        image: 'https://raw.githubusercontent.com/epicmaxco/vuestic-ui/develop/packages/ui/src/assets/vuestic-ui-logo.png',
        site_name: 'Vuestic UI',
        title,
        type: 'website',
      }),
      ...parseMeta('twitter', {
        card: 'https://raw.githubusercontent.com/epicmaxco/vuestic-ui/develop/packages/ui/src/assets/vuestic-ui-logo.png',
        domain: 'https://vuestic.dev/',
        site: 'Vuestic UI',
      }),
    ],
    title,
  }
}

export const useMeta = (app: any) => {
  app.use(createMetaManager())
}
