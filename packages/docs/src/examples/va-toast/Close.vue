<template>
  <div>
    <va-button
      class="mr-2 mb-2"
      @click="
        $vaToast.init({
          message: 'Notification with onClose handler',
          onClose: closeHandler,
        })
      "
    >
      {{ $t('api.VaToast.examples.close.customHandler') }}
    </va-button>
    <va-button class="mr-2 mb-2" @click="$vaToast.close('notification_4')">
      {{ $t('api.VaToast.examples.close.fourth') }}
    </va-button>
    <va-button class="mb-2" onClose@click="$vaToast.closeAll()">
      {{ $t('api.VaToast.examples.close.all') }}
    </va-button>
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
