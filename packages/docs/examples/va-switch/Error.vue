<template>
  <div>
    <va-switch v-model="value" error />
    <va-switch v-model="value" error error-messages="error message" />
    <va-switch v-model="value" error :error-messages="['error message 1', 'error message 2']" />
  </div>
</template>

<script>
export default {
  data () {
    return {
      value: true,
    }
  },
}
</script>
