<script setup lang="ts">
import { Repl, ReplStore, ReplProps } from '@vue/repl'
import Editor from '@vue/repl/codemirror-editor'
import '@vue/repl/style.css'

const props = defineProps({
  code: {
    type: String,
    default: ''
  },
  state: {
    type: String,
    default: ''
  }
})


const store = new ReplStore({
  showOutput: false,
  serializedState: props.state,
})

const code = computed(() => {
  return props.code || '<template>\n  <div>Hello world</div>\n</template>'
})

const setFiles = () => {
  store.setImportMap({
    imports: {
      // Default path to vue to jsdlvr cdn
      ...store.getImportMap().imports,
      'vuestic-ui': window.location.origin + '/vuestic-out/main.js',
    },
  })

  if (props.code && !props.state) {
    store.setFiles({
      ...store.getFiles(),
      'App.vue': props.code,
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

const previewOptions: ReplProps['previewOptions'] = {
  headHTML: `
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@0.7.4/dist/tailwind.min.css" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Source+Code+Pro&family=Source+Sans+Pro:wght@400;700&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <link rel="stylesheet" href="${window.location.origin + '/vuestic-out/style.css'}">
    <style>
      body {
        padding: 1rem;
      }
    </style>
  `,
  customCode: {
    importCode: `
      import { createVuestic } from "vuestic-ui";
    `,
    useCode: `
      app.use(createVuestic({
        config: {
          colors: {
            currentPresetName: 'dark'
          }
        }
      }))
    `
  }
}

// Syntax highlighting colors
// Notice: for some reason v-bind breaks the app
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
    class="vuestic-repl"
    :editor="Editor"
    :store="store"
    :preview-options="previewOptions"
    :clear-console="false"
    :style="{
      '--symbols': codeGray,
      '--base': codeGray,
      '--comment': codeGray,
      '--keyword': codeRed,
      '--variable': codeGray,
      '--function': codeOrange,
      '--string': codeGreen,
      '--number': codeOrange,
      '--tags': codeRed,
      '--brackets': codeCyan,
      '--qualifier': codeOrange,
      '--important': codeGreen,
      '--attribute': codeCyan,
      '--property': codeCyan,
      '--selected-bg': colors.focus,
      '--selected-bg-non-focus': colors.secondary,
      '--cursor': colors.textPrimary,
    }"
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
