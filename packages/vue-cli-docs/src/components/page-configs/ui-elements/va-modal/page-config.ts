import { BlockType, ApiDocsBlock } from '../../../../types/configTypes'
import VaModal
  from 'vuestic-ui/src/components/vuestic-components/va-modal/VaModal.vue'
import apiOptions from './api-options'

export default [
  {
    type: BlockType.TITLE,
    translationString: 'modal.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'modal.description',
  },
  {
    type: BlockType.SUBTITLE,
    translationString: 'modal.overview.subtitle',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'modal.overview.paragraphs[0]',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'modal.overview.paragraphs[1]',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-modal/Overview',
  },
  {
    type: BlockType.SUBTITLE,
    translationString: 'modal.stateful.subtitle',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'modal.stateful.paragraph',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-modal/Stateful',
  },
  {
    type: BlockType.SUBTITLE,
    translationString: 'modal.fullscreen.subtitle',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'modal.fullscreen.paragraphs[0]',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'modal.fullscreen.paragraphs[1]',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-modal/Fullscreen',
  },
  {
    type: BlockType.SUBTITLE,
    translationString: 'modal.toggleVisibility.subtitle',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'modal.toggleVisibility.paragraph',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'modal.toggleVisibility.sections[0].headline',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'modal.toggleVisibility.sections[0].paragraph',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'modal.toggleVisibility.sections[1].headline',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'modal.toggleVisibility.sections[1].paragraph',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-modal/toggle-visibility/InstanceMethods',
  },
  {
    type: BlockType.SUBTITLE,
    translationString: 'modal.disableAnimation.subtitle',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'modal.disableAnimation.paragraph',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-modal/DisableAnimation',
  },
  {
    type: BlockType.SUBTITLE,
    translationString: 'modal.modalSizing.subtitle',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'modal.modalSizing.paragraph',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-modal/ModalSizing',
  },
  {
    type: BlockType.SUBTITLE,
    translationString: 'modal.hidingOverlay.subtitle',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'modal.hidingOverlay.paragraphs[0]',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'modal.hidingOverlay.paragraphs[1]',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-modal/HidingOverlay',
  },
  {
    type: BlockType.SUBTITLE,
    translationString: 'modal.scrollingLongContent.subtitle',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'modal.scrollingLongContent.paragraphs[0]',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'modal.scrollingLongContent.paragraphs[1]',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-modal/ScrollingLongContent',
  },
  {
    type: BlockType.SUBTITLE,
    translationString: 'modal.customization.subtitle',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'modal.customization.paragraphs[0]',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'modal.customization.paragraphs[1]',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'modal.customization.paragraphs[2]',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-modal/Customization',
  },
  {
    type: BlockType.SUBTITLE,
    translationString: 'modal.nestedModals.subtitle',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'modal.nestedModals.paragraph',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-modal/NestedModals',
  },
  {
    type: BlockType.SUBTITLE,
    translationString: 'modal.api.subtitle',
  },
  {
    type: BlockType.API,
    componentOptions: VaModal,
    apiOptions: apiOptions,
  },
] as ApiDocsBlock[]
