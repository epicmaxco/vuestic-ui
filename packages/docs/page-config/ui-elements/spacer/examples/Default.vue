<template>
  <VaCard>
    <VaCardContent>
      <div class="flex">
        <VaButton>Button</VaButton>
        <VaSpacer class="spacer" />
        <VaButton>Button</VaButton>
      </div>
    </VaCardContent>
  </VaCard>
</template>

<style>
.spacer {
  text-align: center;
  border: 2px dashed var(--va-secondary);
}

.spacer::after {
  content: "VaSpacer is here!";
}
</style>
