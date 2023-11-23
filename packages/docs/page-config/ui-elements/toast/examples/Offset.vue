<template>
  <VaButton
    @click="
      $vaToast.init({
        message: 'Custom offsets, (Y: 100, X: 100)',
        offsetX: 100,
        offsetY: 100,
      })
    "
  >
    Y: 100, X: 100
  </VaButton>
</template>
