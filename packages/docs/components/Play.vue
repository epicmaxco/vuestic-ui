<script setup lang="ts">
import { Repl, ReplStore, ReplProps } from '@vue/repl'
import CodeMirror from '@vue/repl/codemirror-editor'
import '@vue/repl/style.css'

const props = defineProps({
  script: {
    type: String,
    default: '',
  },
  template: {
    type: String,
    required: true,
  },
  style: {
    type: String,
    default: '',
  },
})

const store = new ReplStore({ showOutput: false })

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

const code = computed(() => {
  return makeCode(props.script, props.template, props.style)
})

watchEffect(() => {
  store.setFiles({
    ...store.getFiles(),
    'import-map.json': JSON.stringify({
      imports: {
        // Default path to vue to jsdlvr cdn
        ...store.getImportMap().imports,
        'vuestic-ui': window.location.origin + '/vuestic-out/main.js',
      },
    }, null, 2),
    // Update App.vue on code change
    'App.vue': code.value,
  })
})

const previewOptions: ReplProps['previewOptions'] = {
  headHTML: `
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900">
    <link rel="stylesheet" href="${window.location.origin + '/vuestic-out/style.css'}">
  `,
  customCode: {
    importCode: `
      import { createVuestic } from "vuestic-ui";
    `,
    useCode: `
      app.use(createVuestic({}))
    `
  }
}

// Syntax highlighting colors
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
    :editor="CodeMirror"
    :store="store"
    :preview-options="previewOptions"
    :clear-console="false"
  />
</template>

<style lang="scss">
  .vue-repl {
    height: 80vh !important;

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

      .CodeMirror {
        --symbols: v-bind(codeGray);
        --base: var(--va-text-primary);
        --comment: hsl(210, 25%, 60%);
        --keyword: v-bind(codeRed);
        --variable: var(--va-text-primary);
        --function: v-bind(codeOrange);
        --string: v-bind(codeGreen);
        --number: v-bind(codeOrange);
        --tags: v-bind(codeRed);
        --brackets: v-bind(codeCyan);
        --qualifier: v-bind(codeOrange);
        --important: v-bind(codeGreen);
        --attribute: v-bind(codeCyan);
        --property: v-bind(codeCyan);
        --selected-bg: var(--va-focus);
        --selected-bg-non-focus: var(--va-secondary);
        --cursor: var(--va-text-primary);

        .CodeMirror-selected {
          opacity: 0.2;
        }
      }
    }
  }
</style>
