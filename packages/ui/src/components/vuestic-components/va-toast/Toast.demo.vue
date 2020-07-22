<template>
  <VbDemo>
    <VbCard>
      <button @click="$message('yo')">Show notification</button>
    </VbCard>
    <VbCard>
      <button @click="$message.success('yo')">Show success notification</button>
    </VbCard>
    <VbCard>
      <button @click="$message.info('yo')">Show info notification</button>
    </VbCard>
    <VbCard>
      <button @click="$message.warning('yo')">Show warninig notification</button>
    </VbCard>
    <VbCard>
      <button @click="$message.error('yo')">Show error notification</button>
    </VbCard>
  </VbDemo>
</template>

<script>
export default {

}
</script>
