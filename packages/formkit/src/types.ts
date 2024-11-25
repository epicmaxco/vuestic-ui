import { VaInput, VaCheckbox, VaSelect, VaTextarea, VaCounter, VaButton, VaForm, VaTimeInput, VaColorInput, VaDateInput, VaFileUpload, VaRadio, VaSlider, VaRating, VaSwitch, VaButtonToggle } from 'vuestic-ui';
import { createFormKitType } from './createWrapper';

export const autocomplete = createFormKitType(VaSelect, { autocomplete: true });
export const button = createFormKitType(VaButton);
export const checkbox = createFormKitType(VaCheckbox);
export const color = createFormKitType(VaColorInput)
// export const colorpicker = createFormKitType(VaColorInput) // TODO: Implement colorpicker
export const currency = createFormKitType(VaInput);
export const date = createFormKitType(VaDateInput);
export const email = createFormKitType(VaInput, { type: 'email' });
export const file = createFormKitType(VaFileUpload);
export const month = createFormKitType(VaDateInput, { type: 'month' });
export const number = createFormKitType(VaCounter);
export const password = createFormKitType(VaInput, { type: 'password' });
export const radio = createFormKitType(VaRadio);
export const rating = createFormKitType(VaRating);
export const range = createFormKitType(VaSlider);
export const search = createFormKitType(VaInput, { type: 'search' });
export const select = createFormKitType(VaSelect);
export const submit = createFormKitType(VaButton, { type: 'submit' });
export const tel = createFormKitType(VaInput, { type: 'tel'});
export const text = createFormKitType(VaInput);
export const textarea = createFormKitType(VaTextarea);
export const time = createFormKitType(VaTimeInput);
export const toggle = createFormKitType(VaSwitch);
export const togglebuttons = createFormKitType(VaButtonToggle)
export const unit = createFormKitType(VaInput);
export const url = createFormKitType(VaInput, { type: 'url' });
// export const week = createFormKitType(VaDateInput, { view: 'week' }); // Implement week picker
export const form = createFormKitType(VaForm);

//  "number" | "meta" | "button" | "form" | "search" | "select" | "textarea" | "time" | "submit" | "list" | "group" | "checkbox" | "color" | "date" | "datetime-local" | "email" | "file" | ... 8 more ... | "week"
