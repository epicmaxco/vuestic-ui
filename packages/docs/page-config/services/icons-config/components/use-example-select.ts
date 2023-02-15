import { computed, ref } from "vue";
import { examples, IconConfigExample } from "./examples";

export const useExampleSelect = (
  clearCb: (example: IconConfigExample) => void
) => {
  const currentExample = ref<number | undefined>(0);

  const exampleValue = computed({
    get() {
      return currentExample.value;
    },
    set(v: number | undefined) {
      currentExample.value = v;

      if (v === undefined) {
        return;
      }
      const example = examples[v];
      clearCb(example.value);
    },
  });

  const exampleOptions = computed(() =>
    examples.map((e, i) => ({
      label: e.label,
      value: i,
    }))
  );

  exampleValue.value = 0;

  return {
    exampleValue,
    exampleOptions,
  };
};
