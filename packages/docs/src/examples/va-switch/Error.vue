<template>
  <div>
    <va-switch v-model="value" error class="mr-4" />
    <va-switch v-model="value" error error-messages="error message" class="mr-4" />
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
