<template>
  <VbDemo>
    <VbCard>
      <button @click="$message('yo')">Show notification</button>
    </VbCard>
    <VbCard>
      <button @click="$message.success('Success')">Show success notification</button>
    </VbCard>
    <VbCard>
      <button @click="$message.info('Info')">Show info notification</button>
    </VbCard>
    <VbCard>
      <button @click="$message.warning('Warning')">Show warning notification</button>
    </VbCard>
    <VbCard>
      <button @click="$message.error('Error')">Show error notification</button>
    </VbCard>
  </VbDemo>
</template>

<script>
export default {

}
</script>
