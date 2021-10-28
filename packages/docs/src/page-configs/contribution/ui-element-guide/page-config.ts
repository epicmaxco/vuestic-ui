import { ApiDocsBlock } from '@/types/configTypes'
import { PageGenerationHelper } from '@/helpers/DocsHelper'

const path = 'contribution/ui-element-guide'
const block = new PageGenerationHelper(path)

const config: ApiDocsBlock[] = [
  block.title('uiElementGuide.title'),
  block.paragraph('uiElementGuide.description'),
  block.subtitle('uiElementGuide.highLevelStrategy.title'),
  block.list([
    'uiElementGuide.highLevelStrategy.description.userExpectations',
    'uiElementGuide.highLevelStrategy.description.qualityComponents',
  ]),
  block.subtitle('uiElementGuide.coreFeatures.title'),
  block.list([
    'uiElementGuide.coreFeatures.description.visualFeedback',
    'uiElementGuide.coreFeatures.description.keyboardNavigation',
    'uiElementGuide.coreFeatures.description.statelessSupport',
  ]),
]

export default config
