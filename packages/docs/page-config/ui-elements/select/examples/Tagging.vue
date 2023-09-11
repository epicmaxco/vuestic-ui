<template>
  <div class="max-w-xs">
    <va-select
      v-model="value"
      class="mb-6"
      label="Custom chips (first 3)"
      :options="options"
      multiple
    >
      <template #content="{ value }">
        <va-chip
          v-for="chip in value.slice(0, 3)"
          :key="chip"
          size="small"
          class="mr-1 my-1"
        >
          {{ chip }}
        </va-chip>
      </template>
    </va-select>

    <va-select
      v-model="value"
      label="Removable chips"
      :options="options"
      multiple
    >
      <template #content="{ value }">
        <va-chip
          v-for="chip in value"
          :key="chip"
          size="small"
          class="mr-1 my-1"
          closeable
          @update:modelValue="deleteChip(chip)"
        >
          {{ chip }}
        </va-chip>
      </template>
    </va-select>
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
