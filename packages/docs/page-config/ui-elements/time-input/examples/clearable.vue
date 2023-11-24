<template>
  <div class="grid grid-cols-2 md:grid-cols-4 gap-4 items-end">
    <VaTimeInput
      v-model="value"
      clearable
      label="Clearable"
    />
    <VaTimeInput
      v-model="value"
      left-icon
      clearable
      label="With leftIcon"
    />
    <VaTimeInput
      v-model="value"
      clearable
      clearable-icon="cancel"
      color="textPrimary"
      label="With custom icon and color"
    />
    <VaTimeInput
      v-model="value"
      clearable
      readonly
      label="Readonly"
    />
  </div>
</template>

<script>
export default {
  data() {
    return { value: new Date() };
  },
};
</script>
