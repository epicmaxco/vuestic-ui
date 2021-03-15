import { ApiDocsBlock } from '@/types/configTypes'
import { DocsHelper } from '@/helpers/DocsHelper'

const config = (path: string) => {
  return `installation.${path}`
}

export default [
  DocsHelper.title(config('title')),
  DocsHelper.paragraph(config('subtitle')),
  DocsHelper.subtitle(config('cli.title')),
  DocsHelper.paragraph(config('cli.desc')),
  DocsHelper.paragraph(config('cli.attention')),
  DocsHelper.paragraph(config('cli.linkToOfficial')),
  DocsHelper.paragraph(config('cli.codeAnnotation')),
  DocsHelper.code('vue add vuestic-ui'),
  DocsHelper.subtitle(config('manual.title')),
  // examples
  // ...DocsHelper.exampleBlock(
  //   'installation.examples.yourExample.title',
  //   'installation.examples.yourExample.text',
  //   'va-installation/Example',
  // ),
] as ApiDocsBlock[]
