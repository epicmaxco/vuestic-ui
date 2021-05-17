import { ApiDocsBlock } from '../../../../types/configTypes'
import { DocsHelper } from '../../../../helpers/DocsHelper'

export default [
  DocsHelper.title('roadmap.title'),
  DocsHelper.paragraph('roadmap.description'),
  DocsHelper.subtitle('roadmap.inDevelopment.title'),
  DocsHelper.paragraph('roadmap.inDevelopment.description'),

  DocsHelper.headline('roadmap.1-1.title'),
  DocsHelper.paragraph('roadmap.1-1.description'),

  DocsHelper.subtitle('roadmap.released.title'),
  DocsHelper.paragraph('roadmap.released.description'),

  DocsHelper.headline('roadmap.1-0.title'),
  DocsHelper.paragraph('roadmap.1-0.description'),

  DocsHelper.headline('roadmap.0-1.title'),
  DocsHelper.paragraph('roadmap.0-1.description'),

  // DocsHelper.subtitle('roadmap.longTimeSupport.title'),
  // DocsHelper.paragraph('roadmap.longTimeSupport.description'),
  //
  // DocsHelper.subtitle('roadmap.archive.title'),
  // DocsHelper.paragraph('roadmap.archive.description'),
] as ApiDocsBlock[]
