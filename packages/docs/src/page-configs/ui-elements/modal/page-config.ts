import { ApiDocsBlock } from '@/types/configTypes'
import { PageGenerationHelper } from '@/helpers/DocsHelper'
import VaModal from 'vuestic-ui/src/components/va-modal/VaModal.vue'
import apiOptions from './api-options'

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

  block.subtitle('all.api'),
  block.api(VaModal, apiOptions),
]

export default config
