import { BlockType, ApiDocsBlock } from '../../../../types/configTypes'
import VaColorInput from 'vuestic-ui-dev/src/components/vuestic-components/va-color-input/VaColorInput.vue'
import VaColorInputAdvanced from 'vuestic-ui-dev/src/components/vuestic-components/va-color-input/VaColorInputAdvanced.vue'
import apiOptions, { apiOptionsAdvanced } from './api-options'

export default [
  {
    type: BlockType.TITLE,
    translationString: 'colorInput.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'colorInput.summaryText',
  },
  {
    type: BlockType.SUBTITLE,
    translationString: 'all.examples',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'colorInput.examples.default.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'colorInput.examples.default.text',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-color-input/Default',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'colorInput.examples.selected.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'colorInput.examples.selected.text',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-color-input/Selected',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'colorInput.examples.disabled.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'colorInput.examples.disabled.text',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-color-input/Disabled',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'colorInput.examples.advanced.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'colorInput.examples.advanced.text',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-color-input/Advanced',
  },
  {
    type: BlockType.SUBTITLE,
    translationString: 'all.api',
  },
  {
    type: BlockType.SUBTITLE,
    translationString: 'colorInput.api.colorInput',
  },
  {
    type: BlockType.API,
    componentOptions: VaColorInput,
    apiOptions,
  },
  {
    type: BlockType.SUBTITLE,
    translationString: 'colorInput.api.colorInputAdvanced',
  },
  {
    type: BlockType.API,
    componentOptions: VaColorInputAdvanced,
    apiOptions: apiOptionsAdvanced,
  },
] as ApiDocsBlock[]
