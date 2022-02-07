import { ApiDocsBlock } from '@/types/configTypes'
import { PageGenerationHelper } from '@/helpers/DocsHelper'
import { npmScripts, componentFolderStructure } from './code-examples'

const block = new PageGenerationHelper(__dirname)

const config: ApiDocsBlock[] = [
  block.title('guide.title'),
  block.paragraph('guide.description'),

  block.subtitle('guide.pullRequests.title'),
  block.list([
    'guide.pullRequests.description.localBranches',
    'guide.pullRequests.description.dontSubmitToMaster',
    'guide.pullRequests.description.checkoutFeat',
    'guide.pullRequests.description.multipleSmallCommits',
    'guide.pullRequests.description.fixBugSteps',
  ]),

  block.subtitle('guide.branches.title'),
  block.list([
    'guide.branches.publicBranches',
    'guide.branches.localBranches',
  ]),

  block.subtitle('guide.fileNaming.title'),
  block.list([
    'guide.fileNaming.camelCase',
    'guide.fileNaming.kebabCase',
    'guide.fileNaming.pascalCase',
  ]),

  block.subtitle('guide.forCoreContributors.title'),
  block.list([
    'guide.forCoreContributors.linkPr',
    'guide.forCoreContributors.assignYourself',
    'guide.forCoreContributors.smallIssues',
    'guide.forCoreContributors.singlePrPerIssue',
    'guide.forCoreContributors.onePersonPerIssue',
    'guide.forCoreContributors.checkYourCode',
    'guide.forCoreContributors.weUseYarn',
    'guide.forCoreContributors.beProactive',
    'guide.forCoreContributors.recommendedTools',
    'guide.forCoreContributors.workInBook',
  ]),

  block.subtitle('guide.componentFolderStructure.title'),
  block.code(componentFolderStructure),

  block.subtitle('guide.beforeReleaseWorkflow.title'),
  block.paragraph('guide.beforeReleaseWorkflow.description'),

  block.subtitle('guide.npmScripts.title'),
  block.code(npmScripts),

  block.subtitle('guide.credits.title'),
  block.paragraph('guide.credits.description'),
]

export default config
