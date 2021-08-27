import { ApiDocsBlock } from '../../../../types/configTypes'
import { DocsHelper } from '../../../../helpers/DocsHelper'
import { npmScripts, componentFolderStructure } from './code-examples'

const config: ApiDocsBlock[] = [
  DocsHelper.title('guide.title'),
  DocsHelper.paragraph('guide.description'),

  DocsHelper.subtitle('guide.pullRequests.title'),
  DocsHelper.list([
    'guide.pullRequests.description.localBranches',
    'guide.pullRequests.description.dontSubmitToMaster',
    'guide.pullRequests.description.checkoutFeat',
    'guide.pullRequests.description.multipleSmallCommits',
    'guide.pullRequests.description.fixBugSteps',
  ]),

  DocsHelper.subtitle('guide.branches.title'),
  DocsHelper.list([
    'guide.branches.publicBranches',
    'guide.branches.localBranches',
  ]),

  DocsHelper.subtitle('guide.fileNaming.title'),
  DocsHelper.list([
    'guide.fileNaming.camelCase',
    'guide.fileNaming.kebabCase',
    'guide.fileNaming.pascalCase',
  ]),

  DocsHelper.subtitle('guide.forCoreContributors.title'),
  DocsHelper.list([
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

  DocsHelper.subtitle('guide.componentFolderStructure.title'),
  DocsHelper.code(componentFolderStructure),

  DocsHelper.subtitle('guide.beforeReleaseWorkflow.title'),
  DocsHelper.paragraph('guide.beforeReleaseWorkflow.description'),

  DocsHelper.subtitle('guide.npmScripts.title'),
  DocsHelper.code(npmScripts),

  DocsHelper.subtitle('guide.credits.title'),
  DocsHelper.paragraph('guide.credits.description'),
]

export default config
