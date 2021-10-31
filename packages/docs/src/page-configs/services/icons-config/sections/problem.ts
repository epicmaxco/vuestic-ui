import { ApiDocsBlock } from '@/types/configTypes'
import { PageGenerationHelper } from '@/helpers/DocsHelper'

const path = 'services/icons-config'
const block = new PageGenerationHelper(__dirname)

export const config: ApiDocsBlock[] = [
  block.paragraph('iconsConfig.problem.definition'),
  block.paragraph('iconsConfig.problem.materialIcons'),
  block.code('<span class="material-icons">star</span>'),

  block.paragraph('iconsConfig.problem.fontAwesome'),
  block.code('<i class="fas fa-star"></i>'),

  block.paragraph('iconsConfig.problem.summary'),
]
