<template>
  <VbDemo>
    <VbCard title="Default">
      <va-test>Global theme test</va-test>
      <va-test color="warning">Local warning color</va-test>
      <va-test color="danger">Local danger color</va-test>
      <va-test color="red">Local red color</va-test>
      <va-test />
    </VbCard>
  </VbDemo>
</template>

<script>
import VaTest from './ContextTest'

export default {
  components: {
    VaTest,
  },
}
</script>
