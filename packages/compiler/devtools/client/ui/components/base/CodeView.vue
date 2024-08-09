<script setup lang="ts">
  import { createHighlighter } from 'shiki/bundle/web'
  import { ref, watchEffect, onMounted, Ref, computed, watch } from 'vue';
  import { useHasListener } from '../../composables/base/useHasListener'

  const props = withDefaults(defineProps<{
    code: string,
    delay?: number
  }>(), {
    delay: 500
  })

  const emit = defineEmits(['update:code'])

  const html = ref()

  let highlighter: Ref<Awaited<ReturnType<typeof createHighlighter>> | undefined> = ref()

  onMounted(async () => {
    highlighter.value = await createHighlighter({
      themes: ['material-theme-lighter'],
      langs: ['vue'],
    })
  })

  watchEffect(async () => {
    if (!highlighter.value) return

    html.value = await highlighter.value.codeToHtml(localCode.value, {
      lang: 'html',
      theme: 'material-theme-lighter'
    })
  })

  const isEditMode = useHasListener('update:code')

  const localCode = ref(props.code)

  watch(() => props.code, () => {
    if (props.code !== localCode.value) {
      localCode.value = props.code
    }
  })

  const autoSave = ref(true)

  const saveCode = (v: string) => emit('update:code', v)

  let timeout: ReturnType<typeof setTimeout>
  const vModelCode = computed({
    get() { return localCode.value },
    set(v) {
      localCode.value = v

      if (!autoSave.value) { return }

      clearTimeout(timeout)
      timeout = setTimeout(() => {
        saveCode(v)
      }, props.delay)
    }
  })
</script>

<template>
  <div class="code-preview-wrapper">
    <div class="code-preview">
      <span
        v-html="html"
        class="code-preview__view"
      />
      <textarea v-model="vModelCode" v-if="isEditMode" class="code-preview__textarea shiki material-theme-lighter" />
    </div>
  </div>
</template>

<style lang="scss">
  .code-preview-wrapper {
    display: flex;
    flex-direction: column;

    &__actions {
      display: flex;
      margin-top: 8px;
    }
  }

  .code-preview {
    position: relative;
    height: 100%;
    width: 100%;
    flex: 1;
    display: flex;
    min-width: max-content;
    --padding: 16px;

    &__view {
      height: 100%;
      width: 100%;
      flex: 1;
      background: var(--va-background-element);
      padding: var(--padding);
      border-radius: 4px;
      pre, code {
        height: 100%;
      }

      .shiki {
        background: transparent !important;
      }
    }

    .code-preview__textarea {
      padding: var(--padding);
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      width: 100%;
      height: 100%;
      z-index: 1;
      background: transparent;
      border: none;
      resize: none;
      box-sizing: border-box;
      overflow: hidden;
    }

    &__view code, &__view pre, &__textarea {
      line-height: 1.3em;
      font-size: var(--mono-font-size);
      font-family: var(--mono-font);
      border: var(--border);
    }

    &__textarea {
      color: transparent;
      z-index: 2;
      caret-color: var(--va-primary);
    }
  }
</style>
