<template>
  <div>
    <va-checkbox
      v-model="value"
      error
      :error-messages="$t('api.VaCheckbox.examples.error.message')"
      :label="$t('api.VaCheckbox.examples.error.message')"
    />
  </div>
</template>

<script>
export default {
  data () {
    return {
      value: false,
    }
  },
}
</script>
