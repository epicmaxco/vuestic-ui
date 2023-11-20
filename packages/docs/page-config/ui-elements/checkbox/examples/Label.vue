<template>
  <div class="flex flex-col">
    <VaCheckbox
      v-model="value"
      class="mb-6"
      :label="label"
    />
    <VaCheckbox
      v-model="value"
      class="mb-6"
      :label="longLabel"
    />
    <VaCheckbox
      v-model="value"
      :label="leftLabel"
      left-label
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: true,
      label: "Label",
      longLabel:
        "This label is pretty long, but still perfectly fits the layout...",
      leftLabel: "Left label",
    };
  },
};
</script>
