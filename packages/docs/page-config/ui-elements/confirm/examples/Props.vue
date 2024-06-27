<template>
  <VaButton @click="onButtonClick">
    Not everyone can click this button...
  </VaButton>
</template>

<script setup lang="ts">
  import { useModal, useToast } from 'vuestic-ui'

  const { confirm } = useModal()
  const { init } = useToast()
  const onButtonClick = async () => {
    const result = await confirm({
      message: 'Be scared! We want to show a standard alert.',
      title: 'Are you sure?',
      okText: "I'm brave",
      cancelText: "I'm scared!",
    })

    if (result) {
      alert("Bow to me! I'm the mighty browser alert! MWAHAH")
    } else {
      init('Here is pretty toast instead')
    }
  }
</script>
