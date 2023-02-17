<template>
  <div style="max-width: 300px;">
    <va-select
      v-model="value"
      class="mb-6"
      label="With label"
      :options="options"
    />
    <va-select
      v-model="value"
      class="mb-6"
      label="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam."
      placeholder="Long label"
      :options="options"
    />
    <va-select
      v-model="value"
      class="mb-6"
      placeholder="With placeholder"
      :options="options"
    />
    <va-select
      v-model="value"
      class="mb-6"
      label="Long placeholder"
      placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,"
      :options="options"
    />
    <va-select
      v-model="value"
      class="mb-6"
      label="No options"
      :options="[]"
    />
    <va-select
      v-model="value"
      class="mb-6"
      label="No options with custom text"
      :options="[]"
      no-options-text="Sorry, nothing to show :("
    />
    <va-select
      v-model="value"
      class="mb-6"
      label="Clearable"
      :options="options"
      clearable
    />
    <va-select
      v-model="value"
      class="mb-6"
      label="Clearable and custom clear icon"
      :options="options"
      clearable
      clearable-icon="cancel"
    />
    <va-select
      v-model="value"
      class="mb-6"
      label="Hint messages"
      :options="options"
      :messages="['Hint message 1', 'Hint message 2']"
    />
    <va-select
      v-model="value"
      class="mb-6"
      label="Hide selected"
      :options="options"
      hide-selected
    />
    <va-select
      v-model="value"
      class="mb-6"
      label="Custom list placement (top)"
      :options="options"
      placement="top"
    />
    <va-select
      v-model="value"
      class="mb-6"
      label="Custom list placement (bottom)"
      :options="options"
      placement="bottom"
    />
    <va-select
      v-model="value"
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
      value: "",
    };
  },
};
</script>
