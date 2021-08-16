<template>
  <va-button
    @click="
      $vaToast.init({
        message: 'Notification with onClick handler',
        onClick: clickHandler,
      })
    "
  >
    {{ $t('api.VaToast.examples.click.customHandler') }}
  </va-button>
</template>

<script>
export default {
  methods: {
    clickHandler() {
      alert('clicked')
    },
  },
}
</script>
