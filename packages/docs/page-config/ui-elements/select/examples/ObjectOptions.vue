<template>
  <div class="grid grid-cols-2 md:grid-cols-4 gap-4 items-end">
    <va-select
      v-model="value"
      class="mb-6"
      label="Default"
      :options="options"
    />

    <va-select
      v-model="value"
      class="mb-6"
      label="Text by"
      :options="options"
      text-by="textBy"
    />

    <va-select
      v-model="value"
      class="mb-6"
      label="Text by (function)"
      :options="options"
      :text-by="(option) => option.textBy"
    />

    <va-select
      v-model="value"
      class="mb-6"
      label="value by"
      :options="options"
      value-by="valueBy"
    />

    <va-select
      v-model="value"
      class="mb-6"
      label="value by (function)"
      :options="options"
      :value-by="(option) => option.valueBy"
    />
  </div>
  <va-alert color="info">
    <template #title>
      Value
    </template>
    {{ value }}
  </va-alert>
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
