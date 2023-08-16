<template>
  <div class="grid grid-cols-2 md:grid-cols-4 gap-4 items-end">
    <va-date-input
      v-model="value"
      label="readonly"
      readonly
    />

    <va-date-input
      v-model="value"
      label="disabled"
      disabled
    />

    <va-date-input
      v-model="value"
      label="color"
      color="#ff00ff"
    />

    <va-date-input
      label="placeholder"
      placeholder="Custom placeholder"
    />

    <va-date-input
      v-model="value"
      label="clearable"
      clearable
    />

    <va-date-input
      v-model="value"
      label="solid"
      preset="solid"
    />

    <va-date-input
      v-model="value"
      label="bordered"
      preset="bordered"
    />

    <va-date-input
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
