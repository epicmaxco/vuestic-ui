<template>
  <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
    <VaSelect
      v-model="value"
      class="mb-6"
      label="Readonly"
      :options="options"
      readonly
    />
    <VaSelect
      v-model="value"
      class="mb-6"
      label="Disabled"
      :options="options"
      disabled
    />
    <VaSelect
      v-model="value"
      class="mb-6"
      label="Loading"
      :options="options"
      loading
    />
    <div />
    <VaSelect
      v-model="value"
      class="mb-6"
      label="Error state with messages"
      :options="options"
      error
      :error-messages="['Error message']"
    />
    <VaSelect
      v-model="value"
      label="Success state with messages"
      :options="options"
      success
      :messages="['Success message']"
    />
  </div>
</template>

<script>
export default {
  name: "State",
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
      value: "two",
    };
  },
};
</script>
