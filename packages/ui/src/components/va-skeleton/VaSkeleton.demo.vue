<template>
  <VaContent>
    <VbDemo>
      <VbCard title="Headline" style="min-width: 200px;">
        <VaSkeleton tag="h1" variant="text" class="va-h1" />
      </VbCard>
      <VbCard title="Paragraph" style="min-width: 200px;">
        <VaSkeleton tag="p" variant="text" :lines="2" />
        <VaSkeleton tag="p" variant="text" :lines="3" text-width="50%" />
      </VbCard>
      <VbCard title="Avatar" style="min-width: 200px;">
        <VaSkeleton variant="circle" width="1rem" height="48px" />
      </VbCard>
      <VbCard title="Image" style="min-width: 200px;">
        <VaSkeleton variant="squared" />
      </VbCard>
      <VbCard title="Card" style="min-width: 400px;">
        <VaSkeletonGroup>
          <VaCard>
            <VaSkeleton variant="squared" height="120px" />
            <va-card-content class="d-flex align-center">
              <VaSkeleton variant="circle" width="1rem" height="48px" />
              <VaSkeleton variant="text" class="ml-2" :lines="2" />
            </va-card-content>
            <va-card-actions style="display: flex; justify-content: end;">
              <VaSkeleton class="mr-2" variant="rounded" inline width="64px" height="32px" />
              <VaSkeleton variant="rounded" inline width="64px" height="32px" />
            </va-card-actions>
          </VaCard>
        </VaSkeletonGroup>
      </VbCard>

      <VbCard title="Wave animation" style="min-width: 400px;">
        <VaSkeletonGroup animation="wave">
          <VaCard>
            <VaSkeleton variant="squared" height="120px" />
            <va-card-content class="d-flex align-center">
              <VaSkeleton variant="circle" width="1rem" height="48px" />
              <VaSkeleton variant="text" class="ml-2" :lines="2" />
            </va-card-content>
            <va-card-actions style="display: flex; justify-content: end;">
              <VaSkeleton class="mr-2" variant="rounded" inline width="64px" height="32px" />
              <VaSkeleton variant="rounded" inline width="64px" height="32px" />
            </va-card-actions>
          </VaCard>
        </VaSkeletonGroup>
      </VbCard>
    </VbDemo>
  </VaContent>
</template>

<script>
import { VaSkeleton, VaSkeletonGroup } from '.'
import { VaContent } from '../va-content'
import { VaCard, VaCardContent, VaCardActions } from '../va-card'

export default {
  components: {
    VaSkeleton,
    VaContent,
    VaCard,
    VaCardContent,
    VaCardActions,
    VaSkeletonGroup,
  },
}
</script>
