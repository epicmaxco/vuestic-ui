<template>
  <VbDemo>
    <VbCard title="composable variable">
      {{ breakpoint }}
    </VbCard>
    <VbCard title="body class">
      {{ bodyClass }}
    </VbCard>
    <VbCard title="body class">
      <div class="colored">Should be red for `lg` & green for `sm`</div>
    </VbCard>
    <VbCard title="media ratio">
      <div class="sized">Should be 40px for `sm` and 160px for `lg`</div>
    </VbCard>
    <VbCard title="breakpoint conditions">
      <div class="flex">
        <p v-show="breakpoint.mdDown">Should be visible for `md` and down</p>
        <p v-show="breakpoint.lgUp">Should be visible for `lg` and up</p>
      </div>
    </VbCard>
  </VbDemo>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

import { useBreakpoint, useEvent } from '../../composables'

const breakpoint = useBreakpoint()

const bodyClass = ref()
const getBodyClass = () => {
  bodyClass.value = document.querySelector('body')!.classList.value
}
onMounted(getBodyClass)
useEvent('resize', getBodyClass, true)
</script>

<style lang="scss" scoped>
  .sized {
    width: calc(200px * var(--va-media-ratio));
  }

  .va-screen-lg {
    & .colored {
      color: red;
    }
  }

  .va-screen-sm {
    & .colored {
      color: green;
    }
  }
</style>
