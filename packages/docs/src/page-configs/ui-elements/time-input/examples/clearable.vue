<template>
  <div class="d-flex">
    <va-time-input
      v-model="value"
      clearable
      label="Clearable"
    />
    <va-divider vertical />
    <va-time-input
      v-model="value"
      leftIcon
      clearable
      label="With leftIcon"
    />
    <va-divider vertical />
    <va-time-input
      v-model="value"
      clearable
      clearableIcon="cancel"
      color="warning"
      label="With custom icon and color"
    />
    <va-divider vertical />
    <va-time-input
      v-model="value"
      clearable
      readonly
      label="Readonly"
    />
  </div>
</template>

<script>
export default {
  data () {
    return { value: new Date() }
  },
}
</script>
