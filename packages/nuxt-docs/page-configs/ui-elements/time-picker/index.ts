import { definePageConfig } from "~~/types/page-config";
import VaTimePicker from "vuestic-ui/src/components/va-time-picker/VaTimePicker.vue";

const block = useDocsBlocks(import.meta);

export default definePageConfig({
  blocks: [
    block.title("timePicker.title"),

    block.subtitle("all.examples"),

    block.exampleBlock("default"),

    block.exampleBlock("readonlyAndDisabled"),

    block.exampleBlock("ampm"),

    block.exampleBlock("periodUpdatesModelValue"),

    block.exampleBlock("view"),

    block.exampleBlock("filter"),

    block.api(VaTimePicker),
  ],
  manualApi: {
    props: {
      view: { types: "'hours' | 'minutes' | 'seconds'" },
      hoursFilter: { types: "(date: Date) => boolean" },
      minutesFilter: { types: "(date: Date) => boolean" },
      secondsFilter: { types: "(date: Date) => boolean" },

      // We use this prop in VaTimeInput
      hidePeriodSwitch: { hidden: true },
    },
  },
});
