<template>
  <VbDemo>
    <VaCard>
      <va-button @click="confirm('Hello!')">
        Default
      </va-button>
    </VaCard>
    <VaCard>
      <va-button @click="confirm({
        message: 'Hello!',
        title: 'Are you sure?',
        okText: 'Confirm',
        cancelText: 'No',
      })">
        Object options
      </va-button>
    </VaCard>
    <VaCard>
      <va-button @click="confirm('Wait for alert after you close it!').then((r) => alert(r))">
        Alert promise result
      </va-button>
    </VaCard>
  </VbDemo>
</template>

<script setup>
import { VaButton } from '../va-button'
import { useModal } from './'

const { confirm } = useModal()
const alert = (...args) => window.alert(...args)
</script>

<style lang="scss">
.example-modal-anchor {
  button {
    color: red;
  }
}

.example-modal {
  .va-modal__container {
    background-color: blue;
  }
}
</style>
