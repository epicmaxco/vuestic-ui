import { BlockType, ApiDocsBlock } from '../../../../types/configTypes'
import VaDatePicker from 'vuestic-ui-dev/src/components/vuestic-components/va-date-picker/VaDatePicker.vue'
import apiOptions from './api-options'

export default [
  {
    type: BlockType.TITLE,
    translationString: 'datePicker.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'datePicker.summaryText',
  },
  {
    type: BlockType.SUBTITLE,
    translationString: 'all.examples',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'datePicker.examples.default.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'datePicker.examples.default.text',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-date-picker/Default',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'datePicker.examples.placeholder.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'datePicker.examples.placeholder.text',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-date-picker/Placeholder',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'datePicker.examples.weekDays.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'datePicker.examples.weekDays.text',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-date-picker/WeekDays',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'datePicker.examples.successError.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'datePicker.examples.successError.text',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-date-picker/SuccessError',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'datePicker.examples.disabled.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'datePicker.examples.disabled.text',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-date-picker/Disabled',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'datePicker.examples.disabledDays.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'datePicker.examples.disabledDays.text',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-date-picker/DisabledDays',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'datePicker.examples.dayTime.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'datePicker.examples.dayTime.text',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-date-picker/DayTime',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'datePicker.examples.range.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'datePicker.examples.range.text',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-date-picker/Range',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'datePicker.examples.multiple.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'datePicker.examples.multiple.text',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-date-picker/Multiple',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'datePicker.examples.inline.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'datePicker.examples.inline.text',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-date-picker/Inline',
  },
  {
    type: BlockType.SUBTITLE,
    translationString: 'all.api',
  },
  {
    type: BlockType.API,
    componentOptions: VaDatePicker,
    apiOptions,
  },
] as ApiDocsBlock[]
