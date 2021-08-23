import { ApiDocsBlock } from '../../../../types/configTypes'
import { DocsHelper } from '../../../../helpers/DocsHelper'

export default [
  DocsHelper.title('globalConfig.title'),
  DocsHelper.paragraph('globalConfig.subtitle'),
  DocsHelper.paragraph('globalConfig.structure'),
  DocsHelper.paragraph('globalConfig.setupExampleTitle'),
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
  DocsHelper.paragraph('globalConfig.reactiveUpdateExampleTitle'),
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
  DocsHelper.paragraph('globalConfig.reactiveSetExampleTitle'),
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
  DocsHelper.paragraph('globalConfig.useInRuntime'),
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
  DocsHelper.headline('globalConfig.links.readMore'),
  DocsHelper.link('globalConfig.links.components', '/services/components-config'),
  DocsHelper.link('globalConfig.links.colors', '/services/colors-config'),
  DocsHelper.link('globalConfig.links.icons', '/services/icons-config'),
  DocsHelper.subtitle('all.api'),
  DocsHelper.table(
    ['params', { title: 'type', type: 'code' }, { title: 'Description', type: 'markdown' }],
    [
      ['icons', 'IconsConfig', 'globalConfig.api.icons'],
      ['components', 'ComponentsConfig', 'globalConfig.api.components'],
      ['colors', 'ColorsConfig', 'globalConfig.api.colors'],
    ],
  ),
] as ApiDocsBlock[]
