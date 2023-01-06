<script setup lang="ts">
import { PropType } from 'vue';
import { PageConfigCode } from '.';
import { CodeView } from "../../shared/code";

const props = defineProps({
  config: {
    type: Object as PropType<ReturnType<PageConfigCode>>,
    required: true
  }
})
</script>

<template>
  <CodeView :code="config.code" :language="config.language" />
</template>
