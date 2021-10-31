export const configFolderStructure = `
page-configs
      |
      |____section (ex: contribution)
            |
            |____page (ex: documentation-page)
                  |
                  |____page-config.ts
                  |
                  |____components
                  |       |
                  |       |____ComponentName.vue
                  |
                  |____examples
                          |
                          |____ComponentName.vue
`

export const configFileStructure = `
// page-config.ts
import { ApiDocsBlock } from '@/types/configTypes'
import { PageGenerationHelper } from '@/helpers/DocsHelper'

const block = new PageGenerationHelper(__dirname)

const config: ApiDocsBlock[] = [
  // block.BlockType(props)
]

export default config
`

export const blockHelper = `
const block = new PageGenerationHelper(__dirname)
`
