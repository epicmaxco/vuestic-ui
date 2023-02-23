<template>
  <VaContent>
    <VbDemo>
      <VbCard title="Default" style="min-width: 200px;">
        <VaSkeleton />
      </VbCard>
      <VbCard title="width\height">
        <VaSkeleton height="2rem" width="2rem" />
      </VbCard>
      <VbCard title="Variant" style="min-width: 200px;">
        <VaSkeleton variant="rounded" />
        <VaSkeleton variant="circle" />
        <VaSkeleton variant="text" />
      </VbCard>
      <VbCard title="Rounded border radius" style="min-width: 200px;">
        <VaSkeleton variant="rounded" style="--va-skeleton-border-radius: 4px;" />
      </VbCard>
      <VbCard title="Text lines" style="min-width: 200px;">
        <VaSkeleton variant="text" lines="4" />
      </VbCard>
      <VbCard title="Text last line width">
        <VaSkeleton variant="text" lines="2" last-line-width="25%" />
      </VbCard>
      <VbCard title="Text line gap">
        <VaSkeleton variant="text" lines="2" line-gap="16px" />
      </VbCard>
      <VbCard title="Typography class with text variant">
        <VaSkeleton class="va-h1" variant="text" />
      </VbCard>

      <VbCard title="Group" style="min-width: 400px;">
        <VaSkeletonGroup class="flex gap-5">
            <VaSkeleton v-for="i in 4" :key="i" />
        </VaSkeletonGroup>
      </VbCard>

      <VbCard title="Group with wave animation" style="min-width: 400px;">
        <VaSkeletonGroup animation="wave" class="flex gap-5">
            <VaSkeleton v-for="i in 4" :key="i" />
        </VaSkeletonGroup>
      </VbCard>
    </VbDemo>
  </VaContent>
</template>

<script>
import { VaSkeleton, VaSkeletonGroup } from '.'
import { VaContent } from '../va-content'

export default {
  components: {
    VaSkeleton,
    VaContent,
    VaSkeletonGroup,
  },
}
</script>
