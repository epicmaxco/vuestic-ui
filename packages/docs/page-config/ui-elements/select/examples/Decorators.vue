<template>
  <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
    <VaSelect
      v-model="value"
      class="mb-6"
      label="No options"
      :options="[]"
      placeholder="Select option"
    />
    <VaSelect
      v-model="value"
      class="mb-6"
      label="No options with custom text"
      :options="[]"
      placeholder="Select option"
      no-options-text="Sorry, nothing to show, except this custom text :)"
    />
    <VaSelect
      v-model="value"
      class="mb-6"
      label="Clearable"
      :options="options"
      clearable
    />
    <VaSelect
      v-model="value"
      class="mb-6"
      label="Clearable and custom clear icon"
      :options="options"
      clearable
      clearable-icon="cancel"
    />
    <VaSelect
      v-model="value"
      class="mb-6"
      label="Hint messages"
      :options="options"
      :messages="['Hint message 1', 'Hint message 2']"
    />
    <VaSelect
      v-model="value"
      class="mb-6"
      label="Hide selected"
      :options="options"
      hide-selected
    />
    <VaSelect
      v-model="value"
      class="mb-6"
      label="Custom list placement (left)"
      :options="options"
      placement="left"
    />
    <VaSelect
      v-model="value"
      class="mb-6"
      label="Custom list height (320px)"
      :options="options"
      max-height="320px"
    />
  </div>
</template>

<script>
export default {
  name: "Decorators",
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
      value: "one",
    };
  },
};
</script>
