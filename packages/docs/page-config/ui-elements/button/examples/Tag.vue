<template>
  <div class="flex flex-col sm:flex-row gap-2 items-start">
    <VaButton
      href="https://vuestic.dev/"
    >
      External
    </VaButton>
    <VaButton
      to="/getting-started/installation"
    >
      Inner
    </VaButton>
    <VaButton tag="div">
      I'm button (no)
    </VaButton>
  </div>
</template>
