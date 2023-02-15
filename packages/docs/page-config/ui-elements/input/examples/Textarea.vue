<template>
  <div style="max-width: 300px">
    <va-input
      v-model="value"
      class="mb-6"
      type="textarea"
      placeholder="Basic textarea"
    />
    <va-input
      v-model="value"
      class="mb-6"
      type="textarea"
      label="With label"
    />
    <va-input
      v-model="value"
      class="mb-6"
      type="textarea"
      label="With autosize"
      autosize
    />
    <va-input
      v-model="value"
      class="mb-6"
      type="textarea"
      label="With limits from 3 to 5 rows"
      :min-rows="3"
      :max-rows="5"
    />
  </div>
</template>

<script>
export default {
  name: "Textarea",
  data() {
    return {
      value: "",
    };
  },
};
</script>
