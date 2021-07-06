import { ApiDocsBlock } from '@/types/configTypes'
import { DocsHelper } from '@/helpers/DocsHelper'

export default [
  DocsHelper.title('uiElementGuide.title'),
  DocsHelper.paragraph('uiElementGuide.description'),
  DocsHelper.subtitle('uiElementGuide.highLevelStrategy.title'),
  DocsHelper.list([
    'uiElementGuide.highLevelStrategy.description.userExpectations',
    'uiElementGuide.highLevelStrategy.description.qualityComponents',
  ]),
  DocsHelper.subtitle('uiElementGuide.coreFeatures.title'),
  DocsHelper.list([
    'uiElementGuide.coreFeatures.description.visualFeedback',
    'uiElementGuide.coreFeatures.description.keyboardNavigation',
    'uiElementGuide.coreFeatures.description.statelessSupport',
  ]),
] as ApiDocsBlock[]
