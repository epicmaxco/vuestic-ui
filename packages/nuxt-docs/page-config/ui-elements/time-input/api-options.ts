import { ManualApiOptions } from "@/components/DocsApi/ManualApiOptions";
import VaTimePickerAPIOptions from "../time-picker/api-options";
import InputApiOptions from "../input/api-options";

const mapObject = <T, K>(
  obj: Record<string, T>,
  cb: (item: T, key: string) => K,
  exceptions?: string[]
) => {
  const newObj: Record<string, K> = {};
  Object.keys(obj).forEach((key) => {
    if (exceptions?.includes(key)) {
      return;
    }
    newObj[key] = cb(obj[key], key);
  });
  return newObj;
};

export default {
  props: {
    ...VaTimePickerAPIOptions.props,

    format: { types: "(date: Date) => string" },
    parse: { types: "(text: string) => Date" },
  },
  events: {},
  methods: {},
  slots: {
    ...mapObject(InputApiOptions.slots!, (slot, key) => ({
      ...slot,
      translation: `api.VaInput.slots.${key}`,
    })),
  },
} as ManualApiOptions;
