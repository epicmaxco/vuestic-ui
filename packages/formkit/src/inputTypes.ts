import { VaInput, VaCheckbox, VaSelect, VaTextarea, VaCounter, VaTimeInput, VaColorInput, VaDateInput, VaFileUpload, VaRadio, VaSlider, VaRating, VaSwitch } from 'vuestic-ui';
import { createInputWrapper } from './createInputWrapper';

export const autocomplete = createInputWrapper(VaSelect, { autocomplete: true });
export const checkbox = createInputWrapper(VaCheckbox);
export const color = createInputWrapper(VaColorInput)
export const date = createInputWrapper(VaDateInput);
export const email = createInputWrapper(VaInput, { type: 'email' });
export const file = createInputWrapper(VaFileUpload);
export const month = createInputWrapper(VaDateInput, { type: 'month' });
export const number = createInputWrapper(VaCounter);
export const password = createInputWrapper(VaInput, { type: 'password' });
export const radio = createInputWrapper(VaRadio);
export const rating = createInputWrapper(VaRating);
export const range = createInputWrapper(VaSlider);
export const search = createInputWrapper(VaInput, { type: 'search' });
export const select = createInputWrapper(VaSelect);
export const tel = createInputWrapper(VaInput, { type: 'tel'});
export const text = createInputWrapper(VaInput);
export const textarea = createInputWrapper(VaTextarea);
export const time = createInputWrapper(VaTimeInput);
export const toggle = createInputWrapper(VaSwitch);
export const unit = createInputWrapper(VaInput);
export const url = createInputWrapper(VaInput, { type: 'url' });

// "number" | "meta" | "button" | "form" | "search" | "select" | "textarea" | "time" | "submit" | "list" | "group" | "checkbox" | "color" | "date" | "datetime-local" | "email" | "file" | ... 8 more ... | "week"
