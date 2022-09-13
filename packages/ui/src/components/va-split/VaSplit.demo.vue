<template>
  <VbDemo class="va-split-demo">
    <VbCard title="default">
      <va-split>
        <template #start>
          {{$vb.lorem(1000)}}
        </template>
        <template #end>
          {{$vb.lorem(1000)}}
        </template>
      </va-split>
    </VbCard>

    <VbCard title="vertical">
      <va-split vertical>
        <template #start>
          {{$vb.lorem(1000)}}
        </template>
        <template #end>
          {{$vb.lorem(1000)}}
        </template>
      </va-split>
    </VbCard>

    <VbCard title="custom limits">
      <va-split :limits="[[5, 'any'], ['0%', '800px']]">
        <template #start>
          {{$vb.lorem(1000)}}
        </template>
        <template #end>
          {{$vb.lorem(1000)}}
        </template>
      </va-split>
    </VbCard>

    <VbCard title="snapping">
      <va-split :snapping="[20, 80]">
        <template #start>
          {{$vb.lorem(1000)}}
        </template>
        <template #end>
          {{$vb.lorem(1000)}}
        </template>
      </va-split>
    </VbCard>

    <VbCard title="custom grabber">
      <va-split>
        <template #start>
          {{$vb.lorem(1000)}}
        </template>
        <template #grabber>
          <div class="custom-grabber">
            <va-icon name="face" />
          </div>
        </template>
        <template #end>
          {{$vb.lorem(1000)}}
        </template>
      </va-split>
    </VbCard>

    <VbCard title="disabled">
      <va-split disabled>
        <template #start>
          {{$vb.lorem(1000)}}
        </template>
        <template #end>
          {{$vb.lorem(1000)}}
        </template>
      </va-split>
    </VbCard>

    <VbCard title="double click on separator to maximize right panel">
      <va-split maximization>
        <template #start>
          {{$vb.lorem(1000)}}
        </template>
        <template #end>
          {{$vb.lorem(1000)}}
        </template>
      </va-split>
    </VbCard>

    <VbCard title="double click on separator to maximize left panel">
      <va-split maximization maximize-start>
        <template #start>
          {{$vb.lorem(1000)}}
        </template>
        <template #end>
          {{$vb.lorem(1000)}}
        </template>
      </va-split>
    </VbCard>

    <VbCard title="nested">
      <va-split>
        <template #start>
          <va-split>
            <template #start>
              {{$vb.lorem(1000)}}
            </template>
            <template #end>
              {{$vb.lorem(1000)}}
            </template>
          </va-split>
        </template>
        <template #end>
          <va-split vertical>
            <template #start>
              {{$vb.lorem(1000)}}
            </template>
            <template #end>
              {{$vb.lorem(1000)}}
            </template>
          </va-split>
        </template>
      </va-split>
    </VbCard>

    <VbCard title="stateful">
      <va-split stateful>
        <template #start>
          {{$vb.lorem(1000)}}
        </template>
        <template #end>
          {{$vb.lorem(1000)}}
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
        padding: 0.75rem;
      }
    }

    & .custom-grabber {
      height: 100%;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: greenyellow;
    }
  }
</style>
