import { ApiDocsBlock } from '../../../../types/configTypes'
import { DocsHelper } from '../../../../helpers/DocsHelper'

export default [
  DocsHelper.title('treeShakingRequirements.title'),
  DocsHelper.paragraph('treeShakingRequirements.description'),

  DocsHelper.subtitle('treeShakingRequirements.about.title'),
  DocsHelper.paragraph('treeShakingRequirements.about.description'),
  DocsHelper.list([
    'treeShakingRequirements.about.distFormats.esm',
    'treeShakingRequirements.about.distFormats.esmSsr',
    'treeShakingRequirements.about.distFormats.iife',
    'treeShakingRequirements.about.distFormats.cjs',
    'treeShakingRequirements.about.distFormats.style',
  ]),
  DocsHelper.alert('treeShakingRequirements.about.notice', 'primary'),

  DocsHelper.subtitle('treeShakingRequirements.requirements.title'),
  DocsHelper.paragraph('treeShakingRequirements.requirements.esModules'),
  DocsHelper.paragraph('treeShakingRequirements.requirements.dependencies'),
  DocsHelper.paragraph('treeShakingRequirements.requirements.beforeBuild'),
] as ApiDocsBlock[]
