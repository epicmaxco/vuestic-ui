<template>
  <div class="grid grid-cols-2 md:grid-cols-4 gap-4 items-end">
    <VaSelect
      v-model="value"
      class="mb-6"
      label="track by"
      :options="options"
      track-by="id"
    />

    <VaSelect
      v-model="value"
      class="mb-6"
      label="track by (function)"
      :options="options"
      :track-by="(option) => option.id"
    />
  </div>
  <VaAlert color="info">
    <template #title>
      Value
    </template>
    {{ value }}
  </VaAlert>
</template>

<script>
export default {
  data() {
    const options = [
      {
        text: "First",
        value: "1",
        id: "1",
      },
      {
        text: "Second",
        value: "2",
        id: "2",
      },
      {
        text: "Also First but with diffrent text",
        value: "1",
        id: "3",
      },
    ];

    return {
      value: options[0],
      options,
    };
  },
};
</script>
