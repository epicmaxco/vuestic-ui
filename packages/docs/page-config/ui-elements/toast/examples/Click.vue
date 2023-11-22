<template>
  <VaButton
    @click="
      $vaToast.init({
        message: 'Notification with onClick handler',
        onClick: clickHandler,
      })
    "
  >
    notification with custom onClick handler
  </VaButton>
</template>

<script>
export default {
  methods: {
    clickHandler() {
      alert("clicked");
    },
  },
};
</script>
