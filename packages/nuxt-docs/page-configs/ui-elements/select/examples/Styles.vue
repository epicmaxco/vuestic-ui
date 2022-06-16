<template>
  <div style="max-width: 300px">
    <va-select
      v-model="value"
      class="mb-4"
      placeholder="Default (solid)"
      :options="options"
    />
    <va-select
      v-model="value"
      class="mb-4"
      placeholder="Outline"
      :options="options"
      outline
    />
    <va-select
      v-model="value"
      class="mb-4"
      placeholder="Bordered"
      :options="options"
      bordered
    />
    <va-select
      v-model="value"
      class="mb-4"
      label="Default (solid) (Purple color)"
      color="#990099"
      :options="options"
    />
    <va-select
      v-model="value"
      class="mb-4"
      label="Outline (Purple color)"
      :options="options"
      color="#990099"
      outline
    />
    <va-select
      v-model="value"
      class="mb-4"
      label="Bordered (Purple color)"
      :options="options"
      color="#990099"
      bordered
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
