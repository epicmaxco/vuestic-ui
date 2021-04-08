import { ApiDocsBlock } from '../../../../types/configTypes'
import { DocsHelper } from '../../../../helpers/DocsHelper'
import { i18n } from 'vue-lang-router'

const t = i18n.global.t

const gc = (text: string) => `globalConfig.${text}`
const cc = (text: string) => gc(`componentsConfig.${text}`)
const vc = (text: string) => cc(`vaConfig.${text}`)

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
  DocsHelper.paragraph(gc('reactiveExampleTitle')),
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

  DocsHelper.subtitle(cc('title')),
  DocsHelper.paragraph(cc('subtitle')),
  DocsHelper.code(`
    ...
    components: {
      VaAvatar: {
        square: true,
        icon: 'spinner'
      },
      VaCard: {
        color: 'secondary',
      },
      VaTabs: {
        grow: true,
      },
    },
    ...
  `),
  DocsHelper.paragraph(cc('demoTitle')),
  DocsHelper.example('components-config/button', {
    buttonText: t(cc('demoButtonText')),
  }),

  DocsHelper.headline(vc('title')),
  DocsHelper.paragraph(vc('subtitle')),
  DocsHelper.example('components-config/va-config'),
  DocsHelper.paragraph(vc('explain')),
] as ApiDocsBlock[]
