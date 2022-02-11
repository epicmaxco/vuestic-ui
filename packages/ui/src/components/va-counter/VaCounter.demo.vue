<template>
  <VbDemo class="va-counter-css-classes-demo">
    <VbCard title="default">
      <va-counter v-model="value" />
    </VbCard>
    <VbCard title="styles">
      <va-counter v-model="value" outline />
      <va-counter v-model="value" bordered />
      <va-counter v-model="value" color="warning" />
    </VbCard>
    <VbCard title="attributes">
      <va-counter v-model="emptyValue" outline name="Name" placeholder="with name" />
      <va-counter v-model="emptyValue" bordered id="Id" placeholder="with id" />
      <va-counter v-model="emptyValue" color="warning" tabindex="0" placeholder="with tabindex" />
    </VbCard>
    <VbCard title="state">
      <va-counter v-model="value" readonly label="readonly" />
      <va-counter v-model="value" disabled label="disabled" />
    </VbCard>
    <VbCard title="Focus and Blur">
      <va-counter v-model="value" ref="counter" />
      <va-button @click="focusCounter()">Focus (blur after 2 sec)</va-button>
    </VbCard>
  </VbDemo>
</template>

<script>
import { ref } from 'vue'
import VaCounter from './index'
import VaButton from './../va-button'
// import VaIcon from './../va-icon'

export default {
  components: {
    VaCounter,
    VaButton,
    // VaIcon,
  },
  setup () {
    const value = ref(10)
    const emptyValue = ref()
    const counter = ref()

    const blurCounter = () => { counter.value?.blur() }
    const focusCounter = () => {
      counter.value?.focus()
      setTimeout(blurCounter, 2000)
    }

    return {
      value,
      emptyValue,

      counter,
      focusCounter,
    }
  },
}
</script>

<style lang="scss">
.va-counter-css-classes-demo {
  .va-counter {
    margin-bottom: 1rem;
  }
}
</style>
