<template>
  <div class="flex flex-wrap gap-5">
    <VaCard>
      <VaCardTitle>Between horizontal alignment</VaCardTitle>
      <VaCardActions align="between">
        <VaButton>Action 1</VaButton>
        <VaButton>Action 2</VaButton>
      </VaCardActions>
    </VaCard>

    <VaCard>
      <VaCardTitle>Stretch vertical alignment</VaCardTitle>
      <VaCardActions
        align="stretch"
        vertical
      >
        <VaButton>Action 1</VaButton>
        <VaButton>Action 2</VaButton>
      </VaCardActions>
    </VaCard>
  </div>
</template>
