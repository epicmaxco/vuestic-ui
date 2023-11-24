<script setup lang="ts">
import { type PropType } from 'vue';
import PageConfigBlocks from '../../runtime/PageConfigBlocks.vue';
const props = defineProps({
  header: {
    type: String,
  },
  blocks: {
    type: Array as PropType<any>,
    required: true,
  },
})

</script>

<template>
  <VaCollapse
    class="page-config-collapse"
    :header="header"
    flat
  >
    <div class="page-config-collapse__content p-6">
      <PageConfigBlocks :blocks="blocks" />
    </div>
  </VaCollapse>
</template>

<style lang="scss" scoped>
@import 'vuestic-ui/styles/resources';

.page-config-collapse {
  & + & {
    margin-top: 0.5rem;
  }

  .va-collapse__header {
    --va-collapse-header-content-border-radius: 0.25rem;
  }

  &__content {
    position: relative;

    @include va-background(var(--va-background-element), 0.5);
  }
}
</style>
