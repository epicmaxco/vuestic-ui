<template>
  <VbDemo>
    <VbCard title="16/9 for image">
      <va-image
        style="width: 300px;"
        src="https://picsum.photos/200/200"
        :ratio="16/9"
      />
    </VbCard>

    <VbCard title="4/3 for card">
      <va-card style="width: 300px; border: 1px solid gray;" :ratio="4/3">
        <va-card-title>Title</va-card-title>
        <va-card-content>
          {{$vb.lorem(100)}}
        </va-card-content>
      </va-card>
    </VbCard>
  </VbDemo>
</template>

<script setup>
import { VaImage, VaCard, VaCardTitle, VaCardContent } from '@/components'
</script>
