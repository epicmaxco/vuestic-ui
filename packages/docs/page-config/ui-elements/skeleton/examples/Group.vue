<template>
  <VaSkeletonGroup>
    <VaCard>
      <VaSkeleton variant="squared" height="120px" />
      <VaCardContent class="flex items-center">
        <VaSkeleton variant="circle" width="1rem" height="48px" />
        <VaSkeleton variant="text" class="ml-2" :lines="2" />
      </VaCardContent>
      <VaCardContent>
        <VaSkeleton variant="text" :lines="4" text-width="50%" />
      </VaCardContent>
      <VaCardActions class="flex justify-end">
        <VaSkeleton
          class="mr-2"
          variant="rounded"
          inline
          width="64px"
          height="32px"
        />
        <VaSkeleton variant="rounded" inline width="64px" height="32px" />
      </VaCardActions>
    </VaCard>
  </VaSkeletonGroup>
</template>
