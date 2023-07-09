<template>
  <div class="max-w-xs">
    <va-select
      v-model="value"
      class="mb-6"
      label="track by"
      :options="options"
      track-by="id"
    />

    <va-select
      v-model="value"
      class="mb-6"
      label="track by (function)"
      :options="options"
      :track-by="(option) => option.id"
    />

    <va-alert color="info">
      <template #title>
        Value
      </template>
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
