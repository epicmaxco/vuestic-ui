<template>
  <va-button class="mr-2 mb-2" @click="$vaToast.init({
    message: 'Notification with onClose handler',
    onClose: closeHandler,
  })">notification with custom onClose handler</va-button>
  <va-button class="mr-2 mb-2" @click="$vaToast.close('notification_4')">Close #4 toast</va-button>
  <va-button class="mr-2 mb-2" @click="$vaToast.closeAll()">Close all toasts</va-button>
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
