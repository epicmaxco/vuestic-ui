<template>
  <div class="flex flex-col flex-wrap gap-5">
    <VaCard>
      <VaCardBlock
        class="flex-nowrap"
        horizontal
      >
        <div class="flex-auto">
          <VaCardTitle>Title</VaCardTitle>
          <VaCardContent>
            {{ lorem }}
          </VaCardContent>
        </div>
        <VaImage
          class="flex-grow-0 flex-shrink-0 basis-52"
          src="https://picsum.photos/200"
        />
      </VaCardBlock>
    </VaCard>

    <VaCard>
      <VaCardBlock horizontal>
        <VaCardBlock class="flex-auto">
          <VaCardContent>{{ lorem }}</VaCardContent>
        </VaCardBlock>
        <VaDivider vertical />
        <VaCardBlock class="flex-auto">
          <VaCardContent>{{ lorem }}</VaCardContent>
        </VaCardBlock>
      </VaCardBlock>
    </VaCard>
  </div>
</template>

<script>
export default {
  data: () => ({
    lorem: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
  }),
};
</script>
