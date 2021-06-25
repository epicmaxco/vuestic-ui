import withConfigTransport from '../../../services/config-transport/withConfigTransport'
import VaDatePickerComponent from './VaDatePicker.vue'
import VaDateInputComponent from './VaDateInput.vue'

export const VaDatePicker = withConfigTransport(VaDatePickerComponent)
export const VaDateInput = withConfigTransport(VaDateInputComponent)
