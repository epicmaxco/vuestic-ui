<script setup lang="ts">
import { PropType } from 'vue';
import { PageConfigExample } from '.';

const props = defineProps({
  config: {
    type: Object as PropType<ReturnType<PageConfigExample>>,
    required: true
  }
})

const source = await props.config.source
</script>

<template>
  <component :is="props.config.component" />
  <code class="code-snippet">
    {{ source }}
  </code>
</template>