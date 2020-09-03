<template>
  <VbDemo>
    <VbCard>
      <button @click="$vaToast.init('yo')">notification</button>
    </VbCard>
    <VbCard title="Colors">
      <button
        v-for="(color, index) in colors"
        :key="index"
        @click="$vaToast.init({ message: `${color} notification`, color })"
      >
        {{color}} notification
      </button>
    </VbCard>
    <VbCard>
      <button @click="$vaToast.init('info notification')">info notification</button>
    </VbCard>
    <VbCard>
      <button @click="$vaToast.warning('warning notification')">warning notification</button>
    </VbCard>
    <VbCard>
      <button @click="$vaToast.error('error notification')">error notification</button>
    </VbCard>
    <VbCard>
      <button @click="$vaToast.init(customOffsets)">notification with custom offsets</button>
    </VbCard>
    <VbCard>
      <button @click="$vaToast.init(customPosition)">notification with custom position</button>
    </VbCard>
    <VbCard>
      <button @click="$vaToast.init(customOnCloseHandler)">notification with custom onClose handler</button>
    </VbCard>
    <VbCard>
      <button @click="$vaToast.close('notification_4')">Close #4 toast</button>
    </VbCard>
    <VbCard>
      <button @click="$vaToast.closeAll()">Close all toasts</button>
    </VbCard>
  </VbDemo>
</template>

<script>
export default {
  data () {
    return {
      colors: ['primary', 'secondary', 'danger', 'warning', 'info'],
      customOffsets: {
        message: 'Custom offsets, (Y: 100, X: 100)',
        offsetX: 100,
        offsetY: 100,
      },
      customPosition: {
        position: 'bottom-left',
        message: 'Custom position (bottom-left)',
      },
      customOnCloseHandler: {
        message: 'Custom position (bottom-left)',
        onClose: () => console.log('Handle onClose'),
      },
    }
  },
}
</script>
