<template>
  <ComponentPlayground
    v-slot="{ bind, slots }"
    :options="options"
    :code="renderComponent('va-skeleton')"
    :slots="slots"
  >
    <VaCard class="w-full">
      <VaCardContent>
        <VaSkeleton v-bind="bind">
          <template v-for="slot in slots" #[slot.name]>
            {{ slot.value }}
          </template>
        </VaSkeleton>
      </VaCardContent>
    </VaCard>
  </ComponentPlayground>
</template>

<script setup lang="ts">
import { useComponentPlayground } from "@/composables/useComponentPlayground";

const { options, renderComponent, slots } = useComponentPlayground({
  variant: {
    type: "select",
    value: "squared",
    options: ["squared", "circle", "rounded", "text"],
  },
  height: {
    type: "input",
    value: "",
    rules: [
      (v: string) =>
        /(\d(\%|rem|em|px))$/.test(v) || "Height must be a css size",
    ],
  },
  width: {
    type: "input",
    value: "",
    rules: [
      (v: string) => /(\d(\%|rem|em|px))$/.test(v) || "Must must be css size",
    ],
  },
  color: {
    type: "input",
    value: "",
  },
  animation: {
    type: "select",
    value: "pulse",
    options: ["pulse", "wave", "none"],
  },
  gradient: {
    type: "checkbox",
    value: false,
  },
  // Text
  lines: {
    type: "input",
    value: "",
    hidden: (props) => props.variant !== "text",
    rules: [(v: string) => /\d$/.test(v) || "Must must be a number"],
  },
  lastLineWidth: {
    type: "input",
    value: "",
    hidden: (props) => props.variant !== "text",
    rules: [
      (v: string) => /(\d(\%|rem|em|px))$/.test(v) || "Must must be css size",
    ],
  },
  lineGap: {
    type: "input",
    value: "",
    hidden: (props) => props.variant !== "text",
    rules: [(v: string) => /\d$/.test(v) || "Must must be a number"],
  },
});
</script>
