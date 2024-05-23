<template>
  <div class="grid grid-cols-2 md:grid-cols-4 gap-4 items-end">
    <VaSelect
      v-model="value"
      class="mb-6"
      label="Default"
      :options="options"
      track-by="value"
    />

    <VaSelect
      v-model="value"
      class="mb-6"
      label="Text by"
      :options="options"
      text-by="textBy"
      track-by="value"
    />

    <VaSelect
      v-model="value"
      class="mb-6"
      label="Text by (function)"
      :options="options"
      :text-by="(option) => option.textBy"
      track-by="value"
    />

    <VaSelect
      v-model="value"
      class="mb-6"
      label="value by"
      :options="options"
      value-by="valueBy"
    />

    <VaSelect
      v-model="value"
      class="mb-6"
      label="value by (function)"
      :options="options"
      :value-by="(option) => option.valueBy"
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
        textBy: "First text by",
        value: "1",
        valueBy: "first",
      },
      {
        text: "Second",
        textBy: "Second text by",
        value: "2",
        valueBy: "second",
      },
      {
        text: "Third",
        textBy: "Third text by",
        value: "3",
        valueBy: "third",
      },
    ];

    return {
      value: options[0],
      options,
    };
  },
};
</script>
