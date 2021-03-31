import { ApiDocsBlock } from '../../../../types/configTypes'
import { DocsHelper } from '../../../../helpers/DocsHelper'

export default [
  DocsHelper.title('guide.title'),
  DocsHelper.paragraph('guide.title'),

  DocsHelper.title('guide.pullRequests.title'),
  DocsHelper.paragraph('guide.pullRequests.description'),

  DocsHelper.title('guide.branches.title'),
  DocsHelper.paragraph('guide.branches.description'),

  DocsHelper.title('guide.fileNaming.title'),
  DocsHelper.paragraph('guide.fileNaming.description'),

  DocsHelper.title('guide.forCoreContributors.title'),
  DocsHelper.paragraph('guide.forCoreContributors.description'),

  DocsHelper.title('guide.componentFolderStructure.title'),
  DocsHelper.paragraph('guide.componentFolderStructure.description'),

  DocsHelper.title('guide.beforeReleaseWorkflow.title'),
  DocsHelper.paragraph('guide.beforeReleaseWorkflow.description'),

  DocsHelper.title('guide.npmScripts.title'),
  DocsHelper.paragraph('guide.npmScripts.description'),

  DocsHelper.title('guide.credits.title'),
  DocsHelper.paragraph('guide.credits.description'),

] as ApiDocsBlock[]
