<template>
  <div class="max-w-xs">
    <va-input
      v-model="value"
      class="mb-6"
      placeholder="Default"
      label="Default"
    />
    <va-input
      v-model="value"
      class="mb-6"
      placeholder="Solid"
      label="Solid"
      preset="solid"
    />
    <va-input
      v-model="value"
      class="mb-6"
      placeholder="Bordered"
      label="Bordered"
      preset="bordered"
    />
    <va-input
      v-model="value"
      class="mb-6"
      placeholder="Background"
      label="Background"
      color="#000"
      background="warning"
    />
    <va-input
      v-model="value"
      class="mb-6"
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
