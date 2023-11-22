<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-start">
    <VaImage class="col-span-1" :ratio="16/9" src="https://picsum.photos/1500" />

    <VaAspectRatio class="col-span-1" :ratio="4/3">
      <VaCard class="w-full">
        <VaCardTitle>4/3</VaCardTitle>
        <VaCardContent>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</VaCardContent>
      </VaCard>
    </VaAspectRatio>
  </div>
</template>
