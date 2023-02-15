<template>
  <div style="max-width: 300px;">
    <va-input
      v-model="value"
      class="mb-6"
      placeholder="Default (solid)"
    />
    <va-input
      v-model="value"
      class="mb-6"
      placeholder="Outline"
      outline
    />
    <va-input
      v-model="value"
      class="mb-6"
      placeholder="Bordered"
      bordered
    />
    <va-input
      v-model="value"
      class="mb-6"
      placeholder="Default"
      label="Default"
    />
    <va-input
      v-model="value"
      class="mb-6"
      placeholder="Outline"
      label="Outline"
      outline
    />
    <va-input
      v-model="value"
      class="mb-6"
      placeholder="Bordered"
      label="Bordered"
      bordered
    />
    <va-input
      v-model="value"
      class="mb-4"
      placeholder="Background"
      label="Background"
      color="#000"
      background="warning"
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
