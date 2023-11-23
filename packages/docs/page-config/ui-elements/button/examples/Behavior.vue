<template>
  <div class="flex items-center">
    <VaButton
      class="mr-6 mb-2"
      preset="secondary"
      hover-behavior="opacity"
      :hover-opacity="0.4"
    >
      Hover me
    </VaButton>
    <VaButton
      class="mr-6 mb-2"
      pressed-behavior="mask"
      :pressed-opacity="1"
      pressed-mask-color="warning"
    >
      Press me
    </VaButton>
  </div>
</template>
