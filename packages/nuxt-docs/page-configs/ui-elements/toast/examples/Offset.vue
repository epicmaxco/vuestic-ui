<template>
  <va-button
    @click="
      $vaToast.init({
        message: 'Custom offsets, (Y: 100, X: 100)',
        offsetX: 100,
        offsetY: 100,
      })
    "
    >Y: 100, X: 100</va-button
  >
</template>
