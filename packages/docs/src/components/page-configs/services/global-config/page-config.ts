import { ApiDocsBlock } from '../../../../types/configTypes'
import { DocsHelper } from '../../../../helpers/DocsHelper'
import { t, locale } from '../../../../helpers/I18nHelper'

const gc = (text: string) => `globalConfig.${text}`
const api = (text: string) => gc(`api.${text}`)
const links = (text: string) => gc(`links.${text}`)

export default [
  DocsHelper.title(gc('title')),
  DocsHelper.paragraph(gc('subtitle')),
  DocsHelper.paragraph(gc('structure')),
  DocsHelper.paragraph(gc('setupExampleTitle')),
  DocsHelper.code(`
    import { VuesticPlugin } from 'vuestic-ui'

    createApp(App)
      .use(VuesticPlugin, {
        icons: [ ... ],
        components: { ... },
        colors: { ... },
      })
      .mount('#app')
  `),
  DocsHelper.paragraph(gc('reactiveUpdateExampleTitle')),
  DocsHelper.code(`
import { useGlobalConfig } from 'vuestic-ui'

export default {
  setup () {
    const { mergeGlobalConfig } = useGlobalConfig()

    const setNewLookForOurApplication = () => {
      mergeGlobalConfig({
        icons: { { name: 'phone', to: 'fas-phone' } },
        components: { VaButton: { ... } },
        colors: { 'primary': '#ff0' },
      })
    }

    return { setNewLookForOurApplication }
  }
}
  `),
  DocsHelper.paragraph(gc('reactiveSetExampleTitle')),
  DocsHelper.code(`
import { useGlobalConfig } from 'vuestic-ui'

export default {
  setup () {
    const { setGlobalConfig } = useGlobalConfig()

    const setNewLookForOurApplication = () => {
      setGlobalConfig({
        icons: { ... },
        components: { ... },
        colors: { ... },
      })
    }

    return { setNewLookForOurApplication }
  }
}
  `),
  DocsHelper.paragraph(gc('useInRuntime')),
  DocsHelper.code(`
import { useGlobalConfig } from 'vuestic-ui'
import { computed } from 'vue'

export default {
  setup () {
    const { getGlobalConfig } = useGlobalConfig()

    const config = computed(() => getGlobalConfig())

    console.log(config.value)

    return { config }
  }
}
  `),
  DocsHelper.headline(links('readMore')),
  DocsHelper.link(t(links('components')), `/${locale}/services/components-config`),
  DocsHelper.link(t(links('colors')), `/${locale}/services/colors-config`),
  DocsHelper.link(t(links('icons')), `/${locale}/services/icons-config`),
  DocsHelper.subtitle('all.api'),
  DocsHelper.table(
    ['params', { title: 'type', type: 'code' }, { title: 'Description', type: 'markdown' }],
    [
      ['icons', 'IconsConfig', t(api('icons'))],
      ['components', 'ComponentsConfig', t(api('components'))],
      ['colors', 'ColorsConfig', t(api('colors'))],
    ],
  ),
] as ApiDocsBlock[]
