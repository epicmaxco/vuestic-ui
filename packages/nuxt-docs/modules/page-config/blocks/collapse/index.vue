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
    :header="t(header)"
    solid
  >
    <div class="p-6">
      <PageConfigBlocks :blocks="blocks"/>
    </div>
  </va-collapse>
</template>
