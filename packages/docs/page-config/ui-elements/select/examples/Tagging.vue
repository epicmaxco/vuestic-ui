<template>
  <div class="max-w-xs">
    <VaSelect
      v-model="value"
      class="mb-6"
      label="Custom chips (first 3)"
      :options="options"
      multiple
    >
      <template #content="{ value }">
        <VaChip
          v-for="chip in value.slice(0, 3)"
          :key="chip"
          size="small"
          class="mr-1 my-1"
        >
          {{ chip }}
        </VaChip>
      </template>
    </VaSelect>

    <VaSelect
      v-model="value"
      label="Removable chips"
      :options="options"
      multiple
    >
      <template #content="{ value }">
        <VaChip
          v-for="chip in value"
          :key="chip"
          size="small"
          class="mr-1 my-1"
          closeable
          @update:model-value="deleteChip(chip)"
        >
          {{ chip }}
        </VaChip>
      </template>
    </VaSelect>
  </div>
</template>

<script>
export default {
  name: "Chips",
  data() {
    return {
      options: [
        "one",
        "two",
        "three",
        "four",
        "five",
        "six",
        "seven",
        "eight",
        "nine",
      ],
      value: ["one", "two"],
    };
  },
  methods: {
    deleteChip(chip) {
      this.value = this.value.filter((v) => v !== chip);
    },
  },
};
</script>
