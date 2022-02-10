<template>
  <VbDemo class="va-stepper-css-classes-demo">
    <VbCard title="default">
      <va-counter v-model="value" />
    </VbCard>
  </VbDemo>
</template>

<script>
import VaCounter from './index'
// import VaButton from './../va-button'
// import VaIcon from './../va-icon'

export default {
  components: {
    VaCounter,
    // VaButton,
    // VaIcon,
  },
  setup () {
    return {
      value: 10,
    }
  },
}
</script>

<style lang="scss">
.va-stepper-css-classes-demo {
  .va-stepper {
    margin-bottom: 1rem;
  }
}
</style>
