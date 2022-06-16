<template>
  <div style="max-width: 300px">
    <va-select
      class="mb-4"
      label="Default"
      v-model="value"
      :options="options"
    />

    <va-select
      class="mb-4"
      label="Text by"
      v-model="value"
      :options="options"
      text-by="textBy"
    />

    <va-select
      class="mb-4"
      label="Text by (function)"
      v-model="value"
      :options="options"
      :text-by="(option) => option.textBy"
    />

    <va-select
      class="mb-4"
      label="value by"
      v-model="value"
      :options="options"
      value-by="valueBy"
    />

    <va-select
      class="mb-4"
      label="value by (function)"
      v-model="value"
      :options="options"
      :value-by="(option) => option.valueBy"
    />

    <va-alert color="info" class="mb-4">
      <template #title> Value </template>
      {{ value }}
    </va-alert>
  </div>
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
