<template>
  <div class="grid grid-cols-2 md:grid-cols-4 gap-4 items-end">
    <VaSelect
      v-model="value"
      placeholder="Default (outline)"
      :options="options"
    />
    <VaSelect
      v-model="value"
      placeholder="Solid"
      :options="options"
      preset="solid"
    />
    <VaSelect
      v-model="value"
      placeholder="Bordered"
      :options="options"
      preset="bordered"
    />
    <VaSelect
      v-model="value"
      placeholder="Colored"
      label="Outer label"
      color="#990099"
      :options="options"
    />
    <VaSelect
      v-model="value"
      placeholder="Colored"
      label="Inner label"
      color="#990099"
      :options="options"
      inner-label
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
      value: "",
    };
  },
};
</script>
