<template>
  <va-button  @click="$vaToast.init({
    message: 'Notification with onClick handler',
    onClick: clickHandler
  })">notification with custom onClick handler</va-button>
</template>

<script>
export default {
  methods: {
    clickHandler () {
      alert('clicked')
    },
  },
}
</script>
