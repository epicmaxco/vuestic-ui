import { ApiDocsBlock } from '../../../../types/configTypes'
import { DocsHelper } from '../../../../helpers/DocsHelper'

export default [
  DocsHelper.title('installation.title'),

  DocsHelper.subtitle('all.examples'),

  // examples
  // ...DocsHelper.exampleBlock(
  //   'installation.examples.yourExample.title',
  //   'installation.examples.yourExample.text',
  //   'va-installation/Example',
  // ),
] as ApiDocsBlock[]
