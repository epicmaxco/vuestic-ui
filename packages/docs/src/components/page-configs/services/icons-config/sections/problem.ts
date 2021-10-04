import { ApiDocsBlock } from '../../../../../types/configTypes'
import { DocsHelper } from '../../../../../helpers/DocsHelper'

export const config: ApiDocsBlock[] = [
  DocsHelper.paragraph('iconsConfig.problem.definition'),
  DocsHelper.paragraph('iconsConfig.problem.materialIcons'),
  DocsHelper.code('<span class="material-icons">star</span>'),

  DocsHelper.paragraph('iconsConfig.problem.fontAwesome'),
  DocsHelper.code('<i class="fas fa-star"></i>'),

  DocsHelper.paragraph('iconsConfig.problem.summary'),
]
