<template>
  <VaTabs v-model="value" class="mt-2">
    <template #tabs>
      <VaTab
        v-for="tab in tabNames"
        :key="tab"
      >
        {{ tab }}
      </VaTab>
    </template>
  </VaTabs>
  <PageConfigBlocks :blocks="tabs[tabNames[value]]" />
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { BaseBlock } from './../../runtime';
import PageConfigBlocks from '../../runtime/PageConfigBlocks.vue';

const value = ref(0)

const props = defineProps<{
  tabs: Record<string, BaseBlock[]>
}>()

const tabNames = computed(() => Object.keys(props.tabs))
</script>
