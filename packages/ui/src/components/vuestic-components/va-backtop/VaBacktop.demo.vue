<template>
  <VbDemo>
    <VbCard title="Scroll to bottom" style="width: 300px; margin-bottom: 200vh;">
      <va-backtop target=".VbDemo" />
    </VbCard>
  </VbDemo>
</template>

<script>
import VaBacktop from './VaBacktop'

export default {
  components: {
    VaBacktop,
  },
}
</script>
