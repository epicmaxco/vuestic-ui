<template>
  <VbDemo class="va-split-demo">
    <VbCard title="default">
      <va-split>
        <template #start>
          <div>{{$vb.lorem(1000)}}</div>
        </template>
        <template #end>
          <div>{{$vb.lorem(1000)}}</div>
        </template>
      </va-split>
    </VbCard>

    <VbCard title="vertical">
      <va-split vertical>
        <template #start>
          <div>{{$vb.lorem(1000)}}</div>
        </template>
        <template #end>
          <div>{{$vb.lorem(1000)}}</div>
        </template>
      </va-split>
    </VbCard>

    <VbCard title="custom grabber">
      <va-split>
        <template #start>
          <div>{{$vb.lorem(1000)}}</div>
        </template>
        <template #grabber>
          <div style="height: 100%; width: 100%; display: flex; align-items: center; justify-content: center; background-color: greenyellow;">
            <va-icon name="face" />
          </div>
        </template>
        <template #end>
          <div>{{$vb.lorem(1000)}}</div>
        </template>
      </va-split>
    </VbCard>

    <VbCard title="disabled">
      <va-split disabled>
        <template #start>
          <div>{{$vb.lorem(1000)}}</div>
        </template>
        <template #end>
          <div>{{$vb.lorem(1000)}}</div>
        </template>
      </va-split>
    </VbCard>

    <VbCard title="double click on separator to maximize right panel">
      <va-split maximization>
        <template #start>
          <div>{{$vb.lorem(1000)}}</div>
        </template>
        <template #end>
          <div>{{$vb.lorem(1000)}}</div>
        </template>
      </va-split>
    </VbCard>

    <VbCard title="double click on separator to maximize left panel">
      <va-split maximization maximize-start>
        <template #start>
          <div>{{$vb.lorem(1000)}}</div>
        </template>
        <template #end>
          <div>{{$vb.lorem(1000)}}</div>
        </template>
      </va-split>
    </VbCard>

    <VbCard title="custom limits">
      <va-split :limits="[10, 90]">
        <template #start>
          <div>{{$vb.lorem(1000)}}</div>
        </template>
        <template #end>
          <div>{{$vb.lorem(1000)}}</div>
        </template>
      </va-split>
    </VbCard>

    <VbCard title="nested">
      <va-split :limits="[10, 90]">
        <template #start>
          <va-split :limits="[10, 90]">
            <template #start>
              <div>{{$vb.lorem(1000)}}</div>
            </template>
            <template #end>
              <div>{{$vb.lorem(1000)}}</div>
            </template>
          </va-split>
        </template>
        <template #end>
          <va-split :limits="[10, 90]" vertical>
            <template #start>
              <div>{{$vb.lorem(1000)}}</div>
            </template>
            <template #end>
              <div>{{$vb.lorem(1000)}}</div>
            </template>
          </va-split>
        </template>
      </va-split>
    </VbCard>

    <VbCard title="stateful">
      <va-split stateful>
        <template #start>
          <div>{{$vb.lorem(1000)}}</div>
        </template>
        <template #end>
          <div>{{$vb.lorem(1000)}}</div>
        </template>
      </va-split>
    </VbCard>
  </VbDemo>
</template>

<script>
import { VaSplit } from './'
import { VaIcon } from '../va-icon'

export default {
  components: {
    VaSplit,
    VaIcon,
  },
}
</script>

<style lang="scss">
.va-split-demo {
  & .va-split {
    height: 10rem;

    &__panel {
      padding: 0.5rem;
    }
  }
}
</style>
