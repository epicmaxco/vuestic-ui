<script setup lang="ts">
  const makeCode = (script: string, template: string, style: string) => {
  let code = ''

  if (script.trim()) {
    // Fix parsing error, we need \/ to escape / in script tag
    // eslint-disable-next-line no-useless-escape
    code += `<script setup>\n${script}\n<\/script>\n\n`
  }

  if (template.trim()) {
    code += `<template>\n${template}\n</template>\n\n`
  }

  if (style.trim()) {
    code += `<style lang="scss">\n${style}\n</style>\n\n`
  }

  return code
}

  const scriptText = `  import { ref } from 'vue'

  const msg = ref('')`

  const templateText = `  <h1 class="va-h1">{{ msg }}</h1>
  <VaInput v-model="msg" />`
</script>

<template>
  <ClientOnly>
    <Play
      class="h-[80vh]"
      :code="makeCode(scriptText, templateText, '')"
    />
  </ClientOnly>
</template>
