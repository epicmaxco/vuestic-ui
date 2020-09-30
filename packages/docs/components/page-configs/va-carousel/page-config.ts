import { BlockType, ApiDocsBlock } from '../../../types/configTypes'
import VaCarousel from 'vuestic-ui/src/components/vuestic-components/va-carousel/VaCarousel.vue'
import apiOptions from './api-options'

export default [
  {
    type: BlockType.TITLE,
    translationString: 'carousel.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'carousel.summaryText',
  },
  {
    type: BlockType.SUBTITLE,
    translationString: 'all.examples',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'carousel.examples.default.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'carousel.examples.default.text',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-carousel/Default',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'carousel.examples.color.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'carousel.examples.color.text',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-carousel/Color',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'carousel.examples.loop.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'carousel.examples.loop.text',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-carousel/Loop',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'carousel.examples.autoplay.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'carousel.examples.autoplay.text',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-carousel/Autoplay',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'carousel.examples.draggable.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'carousel.examples.draggable.text',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-carousel/Draggable',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'carousel.examples.pagination.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'carousel.examples.pagination.text',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-carousel/Pagination',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'carousel.examples.gallery.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'carousel.examples.gallery.text',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-carousel/Gallery',
  },
  {
    type: BlockType.SUBTITLE,
    translationString: 'all.api',
  },
  {
    type: BlockType.API,
    componentOptions: VaCarousel,
    apiOptions,
  },
] as ApiDocsBlock[]
