import { ApiDocsBlock } from '@/types/configTypes'
import { PageGenerationHelper } from '@/helpers/DocsHelper'
import VaModal from 'vuestic-ui/src/components/va-modal/VaModal.vue'
import apiOptions from './api-options'
import { apiExamplesObject, methodsApi, optionsApi } from './modal-api'

// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
const cssVariables = import('!raw-loader!vuestic-ui/src/components/va-modal/_variables.scss')

const block = new PageGenerationHelper(__dirname)

const config: ApiDocsBlock[] = [
  block.title('modal.title'),
  block.paragraph('modal.summaryText'),

  block.subtitle('all.examples'),

  ...block.exampleBlock(
    'modal.overview.title',
    'modal.overview.text',
    'Overview',
  ),
  ...block.exampleBlock(
    'modal.stateful.title',
    'modal.stateful.text',
    'Stateful',
  ),
  ...block.exampleBlock(
    'modal.fullscreen.title',
    'modal.fullscreen.text',
    'Fullscreen',
  ),

  block.headline('modal.toggleVisibility.title'),
  block.paragraph('modal.toggleVisibility.text'),
  block.headline('modal.toggleVisibility.sections[0].title'),
  block.paragraph('modal.toggleVisibility.sections[0].text'),
  block.headline('modal.toggleVisibility.sections[1].title'),
  block.paragraph('modal.toggleVisibility.sections[1].text'),
  block.example('ToggleVisibility'),

  ...block.exampleBlock(
    'modal.anchor.title',
    'modal.anchor.text',
    'Anchor',
  ),
  ...block.exampleBlock(
    'modal.customContent.title',
    'modal.customContent.text',
    'CustomContent',
  ),
  ...block.exampleBlock(
    'modal.disableAnimation.title',
    'modal.disableAnimation.text',
    'DisableAnimation',
  ),
  ...block.exampleBlock(
    'modal.modalSizing.title',
    'modal.modalSizing.text',
    'ModalSizing',
  ),
  ...block.exampleBlock(
    'modal.hidingOverlay.title',
    'modal.hidingOverlay.text',
    'HidingOverlay',
  ),
  ...block.exampleBlock(
    'modal.blurredOverlay.title',
    'modal.blurredOverlay.text',
    'BlurredOverlay',
  ),
  ...block.exampleBlock(
    'modal.scrollingLongContent.title',
    'modal.scrollingLongContent.text',
    'ScrollingLongContent',
  ),
  ...block.exampleBlock(
    'modal.customization.title',
    'modal.customization.text',
    'Customization',
  ),
  ...block.exampleBlock(
    'modal.nestedModals.title',
    'modal.nestedModals.text',
    'NestedModals',
  ),
  ...block.exampleBlock(
    'modal.beforeClose.title',
    'modal.beforeClose.text',
    'BeforeClose',
  ),

  block.subtitle('all.api'),
  block.api(VaModal, apiOptions),

  block.subtitle('all.cssVariables'),
  block.file(cssVariables),

  block.subtitle('modal.functionalApi.title'),
  block.paragraph('modal.functionalApi.text'),
  block.code(apiExamplesObject),
  block.example('Create'),
  block.headline('all.methods'),
  methodsApi(block),
  block.headline('all.options'),
  optionsApi(block),
]

export default config
