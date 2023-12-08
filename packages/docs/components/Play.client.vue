<script setup lang="ts">
import { Repl, ReplStore, ReplProps } from '@vue/repl'
import Editor from '@vue/repl/codemirror-editor'
import '@vue/repl/style.css'
import { PropType } from 'vue';

const props = defineProps({
  code: {
    type: String,
    default: ''
  },
  state: {
    type: String,
    default: ''
  },
  dependencies: {
    type: Object as PropType<Record<`${string}.${'js'|'css'|'mjs'}`, string>>,
    default: () => ({})
  }
})


const store = new ReplStore({
  showOutput: false,
  serializedState: props.state.replace('#', ''),
})

const normalizeCode = (code: string) => {
  return code.replace('<style lang="scss"', '<style')
}

const code = computed(() => {
  return normalizeCode(props.code) || '<template>\n  <div>Hello world</div>\n</template>'
})

const setFiles = () => {
  store.setImportMap({
    imports: {
      // Default path to vue to jsdlvr cdn
      ...store.getImportMap().imports,
      'vuestic-ui': window.location.origin + '/vuestic-out/main.js',
    },
  })

  if (code.value && !props.state) {
    store.setFiles({
      ...store.getFiles(),
      'App.vue': code.value,
    })
  }
}

watch(code, setFiles)

setFiles()

const emit = defineEmits(['update:state'])
watchEffect(() => {
  emit('update:state', store.serialize())
})

const { currentPresetName } = useColors()
const normalizePresetName = (presetName: string) => {
  if (['dark', 'light'].includes(presetName)) {
    return presetName
  }

  return 'light'
}

const dependenciesCSSCode = computed(() => {
  return Object.entries(props.dependencies)
    .map(([key, url]) => {
      const extension = url.split('.').pop()
      if (extension === 'css') {
        return `<link rel="stylesheet" href="${url}">`
      }
      return ''
    })
    .filter(Boolean)
    .join('\n')
})

// eslint-disable-next-line no-useless-escape
const TAILWIND_CDN = '<script src="https://cdn.tailwindcss.com"><\/script>'
const previewOptions = computed<ReplProps['previewOptions']>(() => ({
  headHTML: `
    <link href="https://fonts.googleapis.com/css2?family=Source+Code+Pro&family=Source+Sans+Pro:wght@400;700&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <link rel="stylesheet" href="${window.location.origin + '/vuestic-out/style.css'}">
    <style>
      body {
        padding: 1rem;
      }
    </style>
    ${TAILWIND_CDN}
    ${dependenciesCSSCode.value}
  `,
  customCode: {
    importCode: `
      import { createVuestic } from "vuestic-ui";
    `,
    useCode: `
      app.use(createVuestic({
        config: {
          colors: {
            currentPresetName: ${JSON.stringify(normalizePresetName(currentPresetName.value))},
          }
        }
      }))
    `
  }
}))

const { getTextColor, colors } = useColors();

const codeRed = computed(() =>
  getTextColor(colors.backgroundSecondary, "#c02d2e", "#FF006E")
);
const codeGreen = computed(() =>
  getTextColor(colors.backgroundSecondary, "#54790d", "#7EBD00")
);
const codeCyan = computed(() =>
  getTextColor(colors.backgroundSecondary, "#015692", "#00AFFA")
);
const codeOrange = computed(() =>
  getTextColor(colors.backgroundSecondary, "#b75501", "#FC834A")
);
const codeGray = computed(() =>
  getTextColor(colors.backgroundSecondary, "#656e77", "#A0A6B6")
);
</script>

<template>
  <Repl
    :key="currentPresetName"
    class="vuestic-repl"
    :editor="Editor"
    :store="store"
    :preview-options="previewOptions"
    :clear-console="false"
    @keydown.ctrl.s.prevent
    @keydown.meta.s.prevent
  />
</template>

<style lang="scss">
  .vue-repl {
    height: 100%;

    .tab-buttons, .file-selector {
      display: none;
    }

    .editor-container .wrapper {
      display: none;
    }

    &.vuestic-repl {
      --bg: var(--va-background-primary);
      --bg-soft: var(--va-background-secondary);
      --border: var(--va-background-border);
      --color-branding: var(--va-primary);

      .output-container {
        height: 100%;
      }

      .editor-container {
        background: rgba(0, 0, 0, 0.02);
        height: 100%;
      }

      .CodeMirror {
        word-spacing: 4px;
        color: currentColor;
        background: none;
        font-family:
          Source Code Pro,
          Consolas,
          Monaco,
          "Andale Mono",
          "Ubuntu Mono",
          monospace;
        font-size: 0.9rem;
        text-align: left;
        white-space: pre;
        word-break: normal;
        word-wrap: normal;
        line-height: 1.5;
        tab-size: 4;
        hyphens: none;
        border-radius: 0.25rem;
        --base: var(--va-text-primary);
        --symbols: v-bind(codeGray),
        --comment: v-bind(codeGray);
        --keyword: v-bind(codeRed);
        --variable: v-bind(codeGray);
        --function: v-bind(codeOrange);
        --string: v-bind(codeGreen);
        --number: v-bind(codeOrange);
        --tags: v-bind(codeRed);
        --brackets: v-bind(codeCyan);
        --qualifier: v-bind(codeOrange);
        --important: v-bind(codeGreen);
        --attribute: v-bind(codeCyan);
        --property: v-bind(codeCyan);
        --cursor: v-bind(colors.textPrimary);

        .CodeMirror-selected {
          opacity: 0.2;
        }

        .CodeMirror-line {
          padding: 0 1rem;
        }
      }
    }
  }
</style>
