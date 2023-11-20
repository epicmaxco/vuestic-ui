import { VaSkeleton, VaSkeletonGroup } from './'

export default {
  title: 'VaSkeleton',
  component: VaSkeleton,
  tags: ['autodocs'],
}

export const Default = () => ({
  components: { VaSkeleton },
  template: '<VaSkeleton/>',
})

export const Size = () => ({
  components: { VaSkeleton },
  template: '<VaSkeleton width="150px" height="100px" />',
})

export const Shape = () => ({
  components: { VaSkeleton },
  template: `
  [Circle]<VaSkeleton variant="circle" />
  [Rounded]<VaSkeleton variant="rounded" />
  [Text]<VaSkeleton variant="text" />
  `,
})

export const BorderRadius = () => ({
  components: { VaSkeleton },
  template: `
  <VaSkeleton variant="rounded" style="--va-skeleton-border-radius: 4px;"/>
  `,
})

export const TextLines = () => ({
  components: { VaSkeleton },
  template: `
  <VaSkeleton variant="text" lines="4" />
  `,
})
export const TextLastLineLength = () => ({
  components: { VaSkeleton },
  template: `
  <VaSkeleton variant="text" lines="2" last-line-width="25%" />
  `,
})
export const TextLineGap = () => ({
  components: { VaSkeleton },
  template: `
   <VaSkeleton variant="text" lines="2" line-gap="16px" />
   `,
})
export const TypographyClassWithTextVariant = () => ({
  components: { VaSkeleton },
  template: `
   <VaSkeleton class="va-h1" variant="text" />
   `,
})

export const Animation = () => ({
  components: { VaSkeleton },
  template: `
  [Pulse]<VaSkeleton animation="pulse" />
  [Wave]<VaSkeleton animation="wave" />
  [None]<VaSkeleton animation="none" />

  `,
})

export const Delay = () => ({
  components: { VaSkeleton },
  template: `
  <VaSkeleton delay="2000" animation="wave" />
  `,
})

export const Group = () => ({
  components: { VaSkeleton, VaSkeletonGroup },
  template: `
  <VaSkeletonGroup class="flex gap-5">
    <VaSkeleton />
    <VaSkeleton />
    <VaSkeleton />
    <VaSkeleton />
  </VaSkeletonGroup>
  `,
})

export const GroupWave = () => ({
  components: { VaSkeleton, VaSkeletonGroup },
  template: `
  <VaSkeletonGroup animation="wave" class="flex gap-5">
    <VaSkeleton />
    <VaSkeleton />
    <VaSkeleton />
    <VaSkeleton />
  </VaSkeletonGroup>
  `,
})
