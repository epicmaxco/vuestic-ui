import { ApiDocsBlock } from '../../../../types/configTypes'
import { DocsHelper } from '../../../../helpers/DocsHelper'

export default [
  DocsHelper.title('nuxtIntegration.title'),

  DocsHelper.subtitle('all.examples'),

  // examples
  // ...DocsHelper.exampleBlock(
  //   'nuxtIntegration.examples.yourExample.title',
  //   'nuxtIntegration.examples.yourExample.text',
  //   'va-nuxt-integration/Example',
  // ),

] as ApiDocsBlock[]
