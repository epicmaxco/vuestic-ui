<template>
  <VbDemo>
    <VbCard>
      <va-split>
        <template #start>
          <div style="border: 1px solid red;">{{$vb.lorem(100)}}</div>
        </template>
        <template #end>
          <div style="border: 1px solid red;">{{$vb.lorem(100)}}</div>
        </template>
      </va-split>
    </VbCard>
  </VbDemo>
</template>

<script>
import { VaSplit } from './'

export default {
  components: {
    VaSplit,
  },
}
</script>

<style lang="scss"></style>
