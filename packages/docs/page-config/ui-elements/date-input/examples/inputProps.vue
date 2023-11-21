<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 items-end">
    <VaDateInput
      v-model="value"
      label="readonly"
      readonly
    />

    <VaDateInput
      v-model="value"
      label="disabled"
      disabled
    />

    <VaDateInput
      v-model="value"
      label="color"
      color="#ff00ff"
    />

    <VaDateInput
      label="placeholder"
      placeholder="Custom placeholder"
    />

    <VaDateInput
      v-model="value"
      label="clearable"
      clearable
    />

    <VaDateInput
      v-model="value"
      label="solid"
      preset="solid"
    />

    <VaDateInput
      v-model="value"
      label="bordered"
      preset="bordered"
    />

    <VaDateInput
      v-model="value"
      label="inner label"
      inner-label
    />
  </div>
</template>

<script>
  export default {
    data() {
      return {
        value: new Date(2000, 0, 1)
      }
    }
  }
</script>
