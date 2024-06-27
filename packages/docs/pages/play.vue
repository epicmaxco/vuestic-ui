<script setup lang="ts">
import { getWindow } from 'vuestic-ui/src/utils/ssr'

definePageMeta({
  layout: 'play',
  // See: https://github.com/nuxt/nuxt/issues/13309
  layoutTransition: true,
})

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

const route = useRoute()

const { init } = useToast()
const sandboxState = ref(route.hash.slice(1) || '')
const copySandboxLink = async () => {
  try {
    await getWindow()?.navigator.clipboard.writeText(window.location.origin + '/play' + sandboxState.value)
    init('Link copied to clipboard')
  } catch (e: any) {
    init({
      message: 'Failed to copy link to clipboard',
      color: 'error',
    })
  }
}

// Change URL without reloading page and updating vue-router
watch(sandboxState, () => {
  window.history.replaceState({}, '', '/play' + sandboxState.value)
})
</script>

<template>
  <main class="h-[100%] flex flex-col">
    <ClientOnly>
      <Play
        v-model:state="sandboxState"
        class="h-[100%] flex-1"
        :code="makeCode(scriptText, templateText, '')"
      />
    </ClientOnly>

    <div class="flex justify-between items-center py-2 px-4 border-t-2 border-[var(--va-background-border)] bg-[var(--va-background-secondary)]">
      <div>
        Playground <span class="text-[var(--va-secondary)]">vuestic-ui@latest - vue@latest - tailwindcss@latest</span>
      </div>

      <VaButton
        icon="share"
        preset="secondary"
        @click="copySandboxLink"
      >
        Share
      </VaButton>
    </div>
  </main>
</template>
