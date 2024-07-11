<script setup lang="ts">
  import { createHighlighter } from 'shiki/bundle/web'
  import { ref, watchEffect, onMounted, Ref, computed } from 'vue';
  import { useHasListener } from '../../composables/base/useHasListener'

  const props = defineProps<{
    code: string
  }>()

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

    html.value = await highlighter.value.codeToHtml(props.code, {
      lang: 'html',
      theme: 'material-theme-lighter'
    })
  })

  const isEditMode = useHasListener('update:code')

  const vModelCode = computed({
    get() { return props.code },
    set(v) { emit('update:code', v) }
  })
</script>

<template>
  <div class="code-preview">
    <span
      v-html="html"
      class="code-preview__view"
    />
    <textarea v-model="vModelCode" v-if="isEditMode" class="code-preview__textarea shiki material-theme-lighter" />
  </div>
</template>

<style lang="scss">
  .code-preview {
    position: relative;
    height: 100%;
    width: 100%;
    flex: 1;
    display: flex;

    --paddings: 8px;

    &__view {
      height: 100%;
      width: 100%;
      flex: 1;
      pre, code {
        height: 100%;
      }

      .shiki {
        background: transparent !important;
      }
    }

    .code-preview__textarea {
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
      transform: translateX(-2px) translateY(-1px);
    }
  }
</style>
