<script setup lang="ts">
import { Repl, ReplStore, File, ReplProps } from '@vue/repl'
import CodeMirror from '@vue/repl/codemirror-editor'
import '@vue/repl/style.css'

const store = new ReplStore({
  showOutput: false,
})

// eslint-disable-next-line no-useless-escape
const code = '<script setup>\r\nimport { ref } from \'vue\'\r\n  import { VaButton } from \'vuestic-ui\'\r\n\r\nconst msg = ref(\'Hello World!\')\r\n<\/script>\r\n\r\n<template>\r\n  <VaButton>{{ msg }}</VaButton>\r\n  <input v-model="msg" />\r\n</template>'

store.state.activeFile.code = code

const fetchDependecies = async (packageName: string, version: string) => {
  const json: { dependencies: Record<string, string> } = await (await fetch(`https://cdn.jsdelivr.net/npm/${packageName}@${version}/package.json`)).json()

  const imports: Record<string, any> = {}

  if (!json.dependencies) return imports

  await Promise.all(Object.entries(json.dependencies).map(async ([packageName, version]) => {
    version = version.replace('^', '')
    const url = `https://cdn.jsdelivr.net/npm/${packageName}@${version}/package.json`
    const json = await (await fetch(url)).json()
    const { module, main } = json
    const path = module || main
    imports[packageName] = `https://cdn.jsdelivr.net/npm/${packageName}@${version}/${path}`

    Object.entries(await fetchDependecies(packageName, version as string)).forEach(([v, k]) => imports[v] = k)
  }))

  return imports
}

store.setFiles({
  ...store.getFiles(),
  'import-map.json': JSON.stringify({
    imports: {
      ...store.getImportMap().imports,
      ...await fetchDependecies('vuestic-ui', '1.8.0'),
      'vuestic-ui': 'https://cdn.jsdelivr.net/npm/vuestic-ui@1.8.0/dist/esm-node/main.mjs',
      'vuestic-ui/css': 'https://cdn.jsdelivr.net/npm/vuestic-ui@1.8.0/dist/vuestic-ui.css'
    },
  }, null, 2),
  'App.vue': code,
})

const previewOptions: ReplProps['previewOptions'] = {
  headHTML: `
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/vuestic-ui@1.8.0/dist/vuestic-ui.css">
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
        // TODO: Change to Vuestic color scheme
        --symbols: #777;
        --base: var(--va-text-primary);
        --comment: hsl(210, 25%, 60%);
        --keyword: #af4ab1;
        --variable: var(--va-text-primary);
        --function: #c25205;
        --string: var(--va-success);
        --number: #c25205;
        --tags: var(--va-danger);
        --brackets: var(--comment);
        --qualifier: #ff6032;
        --important: var(--va-success);
        --attribute: #9c3eda;
        --property: #6182b8;
        --selected-bg: #d7d4f0;
        --selected-bg-non-focus: #d9d9d9;
        --cursor: var(--va-text-primary);
      }
    }
  }
</style>
