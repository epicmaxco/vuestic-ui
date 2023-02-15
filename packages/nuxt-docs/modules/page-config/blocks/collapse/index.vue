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

const { t } = useI18n()
</script>

<template>
  <va-collapse
    class="page-config-collapse"
    :header="t(header)"
    flat
  >
    <div class="page-config-collapse__content p-6">
      <PageConfigBlocks :blocks="blocks" />
    </div>
  </va-collapse>
</template>

<style lang="scss" scoped>
  @import 'vuestic-ui/styles/resources';

  .page-config-collapse {
    .va-collapse__header {
      --va-collapse-header-content-border-radius: 0.25rem;
    }

    &__content {
      position: relative;

      @include va-background(var(--va-background-element), 0.5);
    }
  }
</style>
