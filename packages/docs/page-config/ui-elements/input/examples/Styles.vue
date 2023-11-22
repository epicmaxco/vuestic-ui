<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 items-end">
    <VaInput
      v-model="value"
      placeholder="Default"
      label="Default"
    />
    <VaInput
      v-model="value"
      placeholder="Solid"
      label="Solid"
      preset="solid"
    />
    <VaInput
      v-model="value"
      placeholder="Bordered"
      label="Bordered"
      preset="bordered"
    />
    <VaInput
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
