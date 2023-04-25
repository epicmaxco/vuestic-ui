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
    <VaCard>
      <va-button @click="programmaticallyClose(true)">
        Programmatically close using button "ok"
      </va-button>
    </VaCard>
    <VaCard>
      <va-button @click="programmaticallyClose(false)">
        Programmatically close using button "cancel"
      </va-button>
    </VaCard>
  </VbDemo>
</template>

<script setup>
import { VaButton } from '../va-button'
import { useModal } from './'

const { confirm, close } = useModal()
const alert = (...args) => window.alert(...args)

const programmaticallyClose = async (type) => {
  setTimeout(() => {
    close(type)
  }, 3000)
  const result = await confirm({
    message: 'Wait a 3 seconds for close',
    title: 'Programmatically close',
    okText: 'approved',
    cancelText: 'canceled',
  })
  if (result) {
    alert('approved')
  } else {
    alert('canceled')
  }
}
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
