<template>
  <div class="flex flex-wrap gap-5">
    <VaCard
      square
      outlined
    >
      <VaCardTitle>square and outlined</VaCardTitle>
      <VaCardContent>
        Lorem ipsum dolor sit amet, consectetur adipiscing
        elit.
      </VaCardContent>
    </VaCard>

    <VaCard :bordered="false">
      <VaCardTitle>Bordered false</VaCardTitle>
      <VaCardContent>
        Lorem ipsum dolor sit amet, consectetur adipiscing
        elit.
      </VaCardContent>
    </VaCard>
  </div>
</template>
