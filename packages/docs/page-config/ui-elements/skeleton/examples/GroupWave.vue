<template>
  <VaSkeletonGroup animation="wave">
    <VaCard>
      <va-card-content class="flex items-center">
        <VaSkeleton variant="circle" width="1rem" height="48px" />
        <VaSkeleton variant="text" class="ml-2" :lines="2" />
      </va-card-content>
      <va-card-actions class="flex justify-end" style="display: flex; justify-content: end;">
        <VaSkeleton class="mr-2" variant="rounded" inline width="64px" height="32px" />
        <VaSkeleton variant="rounded" inline width="64px" height="32px" />
      </va-card-actions>
    </VaCard>
  </VaSkeletonGroup>
</template>
