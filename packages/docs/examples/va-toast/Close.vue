<template>
  <div>
    <button @click="$vaToast.init({
      message: 'Custom position (bottom-left)',
      onClose: () => console.log('Handle onClose')
    })">notification with custom onClose handler</button>
    <button @click="$vaToast.close('notification_4')">Close #4 toast</button>
    <button @click="$vaToast.closeAll()">Close all toasts</button>
  </div>
</template>
