<template>
  <VaButton
    class="mr-2 mb-2"
    @click="$vaToast.init({ message: 'Top-right', position: 'top-right' })"
  >
    top-right
  </VaButton>
  <VaButton
    class="mr-2 mb-2"
    @click="$vaToast.init({ message: 'Top-center', position: 'top-center' })"
  >
    top-center
  </VaButton>
  <VaButton
    class="mr-2 mb-2"
    @click="$vaToast.init({ message: 'Top-left', position: 'top-left' })"
  >
    top-left
  </VaButton>
  <VaButton
    class="mr-2 mb-2"
    @click="
      $vaToast.init({ message: 'Bottom-right', position: 'bottom-right' })
    "
  >
    bottom-right
  </VaButton>
  <VaButton
    class="mr-2 mb-2"
    @click="
      $vaToast.init({ message: 'Bottom-center', position: 'bottom-center' })
    "
  >
    bottom-center
  </VaButton>
  <VaButton
    class="mr-2 mb-2"
    @click="$vaToast.init({ message: 'Bottom-left', position: 'bottom-left' })"
  >
    bottom-left
  </VaButton>
</template>
