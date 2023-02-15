import InputApiOptions from "../input/api-options";
import DatePickerApiOptions from "../date-picker/api-options";

const mapObject = <T, K>(
  obj: Record<string, T>,
  cb: (item: T, key: string) => K
) => {
  const newObj: Record<string, K> = {};
  Object.keys(obj).forEach((key) => {
    newObj[key] = cb(obj[key], key);
  });
  return newObj;
};

export default defineManualApi({
  props: {
    modelValue: {
      types: "Date | Date[] | { start: Date | null, end: Date | null }",
    },
    firstWeekday: { types: "'Monday' | 'Sunday'" },
    mode: { types: "'single' | 'multiple' | 'range'" },

    ...InputApiOptions.props,
  },
  slots: {
    ...mapObject(InputApiOptions.slots!, (slot, key) => ({
      ...slot,
      translation: `api.VaInput.slots.${key}`,
    })),
    ...mapObject(DatePickerApiOptions.slots!, (slot, key) => ({
      ...slot,
      translation: `api.VaDatePicker.slots.${key}`,
    })),
  },
});
