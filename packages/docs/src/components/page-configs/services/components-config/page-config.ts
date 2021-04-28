import { ApiDocsBlock } from '../../../../types/configTypes'
import { DocsHelper } from '../../../../helpers/DocsHelper'
import { t } from '../../../../helpers/I18nHelper'
import { api } from './sections'

const cc = (text: string) => (`componentsConfig.${text}`)
const vc = (text: string) => cc(`vaConfig.${text}`)

export default [
  DocsHelper.title(cc('title')),
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

  DocsHelper.subtitle(vc('title')),
  DocsHelper.paragraph(vc('subtitle')),
  DocsHelper.example('components-config/va-config'),
  DocsHelper.paragraph(vc('explain')),

  ...api,
] as ApiDocsBlock[]
