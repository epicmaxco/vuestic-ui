import { ApiDocsBlock } from '@/types/configTypes'
import { PageGenerationHelper } from '@/helpers/DocsHelper'
import VaDatePicker from 'vuestic-ui/src/components/va-date-picker/VaDatePicker.vue'
import apiOptions from './api-options'

// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
const cssVariables = import('!raw-loader!vuestic-ui/src/components/va-date-picker/_variables.scss')

const block = new PageGenerationHelper(__dirname)

const config: ApiDocsBlock[] = [
  block.title('datePicker.title'),
  block.paragraph('datePicker.description'),
  block.link('datePicker.lookAtDateInput', '/ui-elements/date-input'),

  block.subtitle('all.examples'),

  ...block.exampleBlock(
    'datePicker.examples.default.title',
    'datePicker.examples.default.text',
    'Default',
  ),

  ...block.exampleBlock(
    'datePicker.examples.mode.title',
    'datePicker.examples.mode.text',
    'Mode',
  ),

  ...block.exampleBlock(
    'datePicker.examples.stateful.title',
    'datePicker.examples.stateful.text',
    'Stateful',
  ),

  ...block.exampleBlock(
    'datePicker.examples.firstWeekday.title',
    'datePicker.examples.firstWeekday.text',
    'FirstWeekday',
  ),

  ...block.exampleBlock(
    'datePicker.examples.weekends.title',
    'datePicker.examples.weekends.text',
    'Weekends',
  ),

  ...block.exampleBlock(
    'datePicker.examples.otherMonths.title',
    'datePicker.examples.otherMonths.text',
    'OtherMonths',
  ),

  ...block.exampleBlock(
    'datePicker.examples.slots.title',
    'datePicker.examples.slots.text',
    'Slots',
  ),

  ...block.exampleBlock(
    'datePicker.examples.view.title',
    'datePicker.examples.view.text',
    'View',
  ),

  ...block.exampleBlock(
    'datePicker.examples.type.title',
    'datePicker.examples.type.text',
    'Type',
  ),

  ...block.exampleBlock(
    'datePicker.examples.disabledDates.title',
    'datePicker.examples.disabledDates.text',
    'DisabledDates',
  ),

  ...block.exampleBlock(
    'datePicker.examples.colors.title',
    'datePicker.examples.colors.text',
    'Color',
  ),

  ...block.exampleBlock(
    'datePicker.examples.readonly.title',
    'datePicker.examples.readonly.text',
    'Readonly',
  ),

  ...block.exampleBlock(
    'datePicker.examples.disabled.title',
    'datePicker.examples.disabled.text',
    'Disabled',
  ),

  block.subtitle('all.api'),
  block.api(VaDatePicker, apiOptions),

  block.subtitle('all.cssVariables'),
  block.file(cssVariables),
]

export default config
