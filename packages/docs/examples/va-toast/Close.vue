<template>
  <div>
    <va-button @click="$vaToast.init({
      message: 'Notification with onClose handler',
      onClose: closeHandler
    })">notification with custom onClose handler</va-button>
    <va-button @click="$vaToast.close('notification_4')">Close #4 toast</va-button>
    <va-button @click="$vaToast.closeAll()">Close all toasts</va-button>
  </div>
</template>

<script>
export default {
  methods: {
    closeHandler () {
      alert('Toast closed')
    },
  },
}
</script>
