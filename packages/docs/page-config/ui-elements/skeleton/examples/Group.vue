<template>
  <VaSkeletonGroup>
    <VaCard>
      <VaSkeleton variant="squared" height="120px" />
      <va-card-content style="display: flex; align-items: center;">
        <VaSkeleton variant="circle" width="1rem" height="48px" />
        <VaSkeleton variant="text" class="ml-2" :lines="2" />
      </va-card-content>
      <va-card-content>
        <VaSkeleton variant="text" :lines="4" text-width="50%" />
      </va-card-content>
      <va-card-actions style="display: flex; justify-content: end;">
        <VaSkeleton class="mr-2" variant="rounded" inline width="64px" height="32px" />
        <VaSkeleton variant="rounded" inline width="64px" height="32px" />
      </va-card-actions>
    </VaCard>
  </VaSkeletonGroup>
</template>