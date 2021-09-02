import { ApiDocsBlock } from '../../../../types/configTypes'
import { DocsHelper } from '../../../../helpers/DocsHelper'
import VaModal from 'vuestic-ui/src/components/va-modal/VaModal.vue'
import apiOptions from './api-options'

const config: ApiDocsBlock[] = [
  DocsHelper.title('modal.title'),
  DocsHelper.paragraph('modal.summaryText'),

  DocsHelper.subtitle('all.examples'),

  ...DocsHelper.exampleBlock(
    'modal.overview.title',
    'modal.overview.text',
    'va-modal/Overview',
  ),
  ...DocsHelper.exampleBlock(
    'modal.stateful.title',
    'modal.stateful.text',
    'va-modal/Stateful',
  ),
  ...DocsHelper.exampleBlock(
    'modal.fullscreen.title',
    'modal.fullscreen.text',
    'va-modal/Fullscreen',
  ),

  DocsHelper.headline('modal.toggleVisibility.title'),
  DocsHelper.paragraph('modal.toggleVisibility.text'),
  DocsHelper.headline('modal.toggleVisibility.sections[0].title'),
  DocsHelper.paragraph('modal.toggleVisibility.sections[0].text'),
  DocsHelper.headline('modal.toggleVisibility.sections[1].title'),
  DocsHelper.paragraph('modal.toggleVisibility.sections[1].text'),
  DocsHelper.example('va-modal/toggle-visibility/InstanceMethods'),

  ...DocsHelper.exampleBlock(
    'modal.disableAnimation.title',
    'modal.disableAnimation.text',
    'va-modal/DisableAnimation',
  ),
  ...DocsHelper.exampleBlock(
    'modal.modalSizing.title',
    'modal.modalSizing.text',
    'va-modal/ModalSizing',
  ),
  ...DocsHelper.exampleBlock(
    'modal.hidingOverlay.title',
    'modal.hidingOverlay.text',
    'va-modal/HidingOverlay',
  ),
  ...DocsHelper.exampleBlock(
    'modal.scrollingLongContent.title',
    'modal.scrollingLongContent.text',
    'va-modal/ScrollingLongContent',
  ),
  ...DocsHelper.exampleBlock(
    'modal.customization.title',
    'modal.customization.text',
    'va-modal/Customization',
  ),
  ...DocsHelper.exampleBlock(
    'modal.nestedModals.title',
    'modal.nestedModals.text',
    'va-modal/NestedModals',
  ),

  DocsHelper.subtitle('all.api'),
  DocsHelper.api(VaModal, apiOptions),
]

export default config
