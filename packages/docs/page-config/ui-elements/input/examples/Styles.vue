<template>
  <div class="grid grid-cols-2 md:grid-cols-4 gap-4 items-end">
    <va-input
      v-model="value"
      placeholder="Default"
      label="Default"
    />
    <va-input
      v-model="value"
      placeholder="Solid"
      label="Solid"
      preset="solid"
    />
    <va-input
      v-model="value"
      placeholder="Bordered"
      label="Bordered"
      preset="bordered"
    />
    <va-input
      v-model="value"
      placeholder="Inner label"
      label="Inner label"
      inner-label
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: "",
    };
  },
};
</script>
