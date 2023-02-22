<template>
  <div class="flex flex-col">
    <div class="mb-6">
      {{ selection }}
    </div>
    <va-checkbox
      v-model="selection"
      array-value="one"
      label="one"
      class="mb-6"
    />
    <va-checkbox
      v-model="selection"
      array-value="two"
      label="two"
      class="mb-6"
    />
    <va-checkbox
      v-model="selection"
      array-value="three"
      label="three"
      class="mb-6"
    />
    <va-checkbox
      v-model="selection"
      array-value="four"
      label="four"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      selection: ["one", "four"],
    };
  },
};
</script>
