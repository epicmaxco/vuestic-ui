import { ApiDocsBlock } from '../../../types/configTypes'
import { DocsHelper } from '../../../helpers/DocsHelper'
import VaDatePicker from 'vuestic-ui/src/components/va-date-picker/VaDatePicker.vue'
import apiOptions from './api-options'

const configPath = 'ui-elements/date-picker'

const config: ApiDocsBlock[] = [
  DocsHelper.title('datePicker.title'),
  DocsHelper.paragraph('datePicker.description'),
  DocsHelper.link('datePicker.lookAtDateInput', '/ui-elements/date-input'),

  DocsHelper.subtitle('all.examples'),

  ...DocsHelper.exampleBlock(
    'datePicker.examples.default.title',
    'datePicker.examples.default.text',
    configPath,
    'Default',
  ),

  ...DocsHelper.exampleBlock(
    'datePicker.examples.mode.title',
    'datePicker.examples.mode.text',
    configPath,
    'Mode',
  ),

  ...DocsHelper.exampleBlock(
    'datePicker.examples.stateful.title',
    'datePicker.examples.stateful.text',
    configPath,
    'Stateful',
  ),

  ...DocsHelper.exampleBlock(
    'datePicker.examples.firstWeekday.title',
    'datePicker.examples.firstWeekday.text',
    configPath,
    'FirstWeekday',
  ),

  ...DocsHelper.exampleBlock(
    'datePicker.examples.weekends.title',
    'datePicker.examples.weekends.text',
    configPath,
    'Weekends',
  ),

  ...DocsHelper.exampleBlock(
    'datePicker.examples.otherMonths.title',
    'datePicker.examples.otherMonths.text',
    configPath,
    'OtherMonths',
  ),

  ...DocsHelper.exampleBlock(
    'datePicker.examples.slots.title',
    'datePicker.examples.slots.text',
    configPath,
    'Slots',
  ),

  ...DocsHelper.exampleBlock(
    'datePicker.examples.view.title',
    'datePicker.examples.view.text',
    configPath,
    'View',
  ),

  ...DocsHelper.exampleBlock(
    'datePicker.examples.type.title',
    'datePicker.examples.type.text',
    configPath,
    'Type',
  ),

  ...DocsHelper.exampleBlock(
    'datePicker.examples.disabledDates.title',
    'datePicker.examples.disabledDates.text',
    configPath,
    'DisabledDates',
  ),

  ...DocsHelper.exampleBlock(
    'datePicker.examples.colors.title',
    'datePicker.examples.colors.text',
    configPath,
    'Color',
  ),

  ...DocsHelper.exampleBlock(
    'datePicker.examples.readonly.title',
    'datePicker.examples.readonly.text',
    configPath,
    'Readonly',
  ),

  ...DocsHelper.exampleBlock(
    'datePicker.examples.disabled.title',
    'datePicker.examples.disabled.text',
    configPath,
    'Disabled',
  ),

  DocsHelper.subtitle('all.api'),
  DocsHelper.api(VaDatePicker, apiOptions),
]

export default config
