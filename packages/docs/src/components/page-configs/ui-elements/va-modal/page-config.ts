import { ApiDocsBlock } from '../../../../types/configTypes'
import { DocsHelper } from '../../../../helpers/DocsHelper'
import VaModal from 'vuestic-ui/src/components/va-modal/VaModal.vue'
import apiOptions from './api-options'

const configPath = 'ui-elements/va-modal'

const config: ApiDocsBlock[] = [
  DocsHelper.title('modal.title'),
  DocsHelper.paragraph('modal.summaryText'),

  DocsHelper.subtitle('all.examples'),

  ...DocsHelper.exampleBlock(
    'modal.overview.title',
    'modal.overview.text',
    configPath,
    'Overview',
  ),
  ...DocsHelper.exampleBlock(
    'modal.stateful.title',
    'modal.stateful.text',
    configPath,
    'Stateful',
  ),
  ...DocsHelper.exampleBlock(
    'modal.fullscreen.title',
    'modal.fullscreen.text',
    configPath,
    'Fullscreen',
  ),

  DocsHelper.headline('modal.toggleVisibility.title'),
  DocsHelper.paragraph('modal.toggleVisibility.text'),
  DocsHelper.headline('modal.toggleVisibility.sections[0].title'),
  DocsHelper.paragraph('modal.toggleVisibility.sections[0].text'),
  DocsHelper.headline('modal.toggleVisibility.sections[1].title'),
  DocsHelper.paragraph('modal.toggleVisibility.sections[1].text'),
  DocsHelper.example(configPath, 'toggle-visibility/InstanceMethods'),

  ...DocsHelper.exampleBlock(
    'modal.disableAnimation.title',
    'modal.disableAnimation.text',
    configPath,
    'DisableAnimation',
  ),
  ...DocsHelper.exampleBlock(
    'modal.modalSizing.title',
    'modal.modalSizing.text',
    configPath,
    'ModalSizing',
  ),
  ...DocsHelper.exampleBlock(
    'modal.hidingOverlay.title',
    'modal.hidingOverlay.text',
    configPath,
    'HidingOverlay',
  ),
  ...DocsHelper.exampleBlock(
    'modal.scrollingLongContent.title',
    'modal.scrollingLongContent.text',
    configPath,
    'ScrollingLongContent',
  ),
  ...DocsHelper.exampleBlock(
    'modal.customization.title',
    'modal.customization.text',
    configPath,
    'Customization',
  ),
  ...DocsHelper.exampleBlock(
    'modal.nestedModals.title',
    'modal.nestedModals.text',
    configPath,
    'NestedModals',
  ),

  DocsHelper.subtitle('all.api'),
  DocsHelper.api(VaModal, apiOptions),
]

export default config
