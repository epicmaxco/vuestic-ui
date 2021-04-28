import { ApiDocsBlock } from '../../../../types/configTypes'
import { DocsHelper } from '../../../../helpers/DocsHelper'

const npmScripts = `
# Run vue-book dev server
$ yarn serve:book

# Generate all needed files for component (component itself, docs, tests)
$ yarn generate:component

# Build vue-book bundle
$ yarn build:book

# Lint everything
$ yarn lint

# Run tests
$ yarn test:unit

# Run vuepress dev server
$ yarn serve:docs

# Build vuepress bundle
$ yarn build:docs
`

const componentFolderStructure = `
  va-checkbox // component directory
  |- VaCheckbox.vue // component itself
  |- VaCheckbox.demo.vue // component demo
  |- VaCheckbox.spec.js // component tests
`

export default [
  DocsHelper.title('guide.title'),
  DocsHelper.paragraph('guide.description'),

  DocsHelper.subtitle('guide.pullRequests.title'),
  DocsHelper.paragraph('guide.pullRequests.description.localBranches'),
  DocsHelper.paragraph('guide.pullRequests.description.dontSubmitToMaster'),
  DocsHelper.paragraph('guide.pullRequests.description.checkoutFeat'),
  DocsHelper.paragraph('guide.pullRequests.description.multipleSmallCommits'),
  DocsHelper.paragraph('guide.pullRequests.description.fixBugSteps'),

  DocsHelper.subtitle('guide.branches.title'),
  DocsHelper.paragraph('guide.branches.publicBranches'),
  DocsHelper.paragraph('guide.branches.localBranches'),

  DocsHelper.subtitle('guide.fileNaming.title'),
  DocsHelper.paragraph('guide.fileNaming.camelCase'),
  DocsHelper.paragraph('guide.fileNaming.kebabCase'),
  DocsHelper.paragraph('guide.fileNaming.pascalCase'),

  DocsHelper.subtitle('guide.forCoreContributors.title'),
  DocsHelper.paragraph('guide.forCoreContributors.linkPr'),
  DocsHelper.paragraph('guide.forCoreContributors.assignYourself'),
  DocsHelper.paragraph('guide.forCoreContributors.smallIssues'),
  DocsHelper.paragraph('guide.forCoreContributors.singlePrPerIssue'),
  DocsHelper.paragraph('guide.forCoreContributors.onePersonPerIssue'),
  DocsHelper.paragraph('guide.forCoreContributors.checkYourCode'),
  DocsHelper.paragraph('guide.forCoreContributors.weUseYarn'),
  DocsHelper.paragraph('guide.forCoreContributors.beProactive'),
  DocsHelper.paragraph('guide.forCoreContributors.recommendedTools'),
  DocsHelper.paragraph('guide.forCoreContributors.workInBook'),

  DocsHelper.subtitle('guide.componentFolderStructure.title'),
  DocsHelper.code(componentFolderStructure),

  DocsHelper.subtitle('guide.beforeReleaseWorkflow.title'),
  DocsHelper.paragraph('guide.beforeReleaseWorkflow.description'),

  DocsHelper.subtitle('guide.npmScripts.title'),
  DocsHelper.code(npmScripts),

  DocsHelper.subtitle('guide.credits.title'),
  DocsHelper.paragraph('guide.credits.description'),

] as ApiDocsBlock[]
