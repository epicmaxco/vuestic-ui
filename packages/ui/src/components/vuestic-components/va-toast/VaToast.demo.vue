<template>
  <VbDemo>
    <VbCard>
      <button @click="$vaToast('yo')">notification</button>
    </VbCard>
    <VbCard>
      <button @click="$vaToast.success('success notification')">success notification</button>
    </VbCard>
    <VbCard>
      <button @click="$vaToast.info('info notification')">info notification</button>
    </VbCard>
    <VbCard>
      <button @click="$vaToast.warning('warning notification')">warning notification</button>
    </VbCard>
    <VbCard>
      <button @click="$vaToast.error('error notification')">error notification</button>
    </VbCard>
    <VbCard>
      <button @click="$vaToast.info(customOffsets)">notification with custom offsets</button>
    </VbCard>
    <VbCard>
      <button @click="$vaToast.info(customPosition)">notification with custom position</button>
    </VbCard>
    <VbCard>
      <div>
        THAT DOESN'T WORK AS EXPECTED, Position is broken after close
      </div>
      <button @click="$vaToast.info(customOnCloseHandler)">notification with custom onClose handler</button>
    </VbCard>
    <VbCard>
      <button @click="$vaToast.close('notification_2')">Close all toasts</button>
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
