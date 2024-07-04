<script setup lang="ts">
  import { codeToHtml } from 'shiki'
  import { ref, watchEffect } from 'vue';

  const props = defineProps<{
    code: string
  }>()

  const html = ref()
  
  watchEffect(async () => {
    html.value = await codeToHtml(props.code, {
      lang: 'html',
      theme: 'material-theme-lighter'
    })
  })

</script>

<template>
  <div v-html="html"></div>
</template>