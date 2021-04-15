import { ApiDocsBlock } from '../../../../types/configTypes'
import { DocsHelper } from '../../../../helpers/DocsHelper'

export default [
  DocsHelper.title('roadmap.title'),
  DocsHelper.paragraph('roadmap.description'),
  DocsHelper.subtitle('roadmap.inDevelopment.title'),
  DocsHelper.paragraph('roadmap.inDevelopment.description'),
  DocsHelper.subtitle('roadmap.released.title'),
  DocsHelper.paragraph('roadmap.released.description'),
  DocsHelper.subtitle('roadmap.longTimeSupport.title'),
  DocsHelper.paragraph('roadmap.longTimeSupport.description'),
  DocsHelper.subtitle('roadmap.archive.title'),
  DocsHelper.paragraph('roadmap.archive.description'),

  // examples
  // ...DocsHelper.exampleBlock(
  //   'roadmap.examples.yourExample.title',
  //   'roadmap.examples.yourExample.text',
  //   'va-roadmap/Example',
  // ),
] as ApiDocsBlock[]
