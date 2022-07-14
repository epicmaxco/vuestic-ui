<template>
  <div>
    <div class="demo-header mb-2 row">
      <div class="col">
        <va-select
          v-model="exampleValue"
          :rounded="false"
          :options="exampleOptions"
          text-by="label"
          value-by="value"
        />
      </div>

      <div class="col" style="width: 100%;">
        <div class="code-snippet">
          <span class="tag">va-icon name="<CodeInput class="code-input" v-model="iconName" />" /</span>
        </div>
      </div>
    </div>

    <div class="code-snippet">
      const fonts = [{
      <div class="ml-4">
        <div>name: '<CodeInput class="code-input" v-model="configName" />',</div>
        {{ resolveFnName }}: (<span class="params">{{ args }}</span>) => ({
          <div class="ml-4 mb-1" v-for="key in Object.keys(resolve)" :key="key">
            {{ key }}: <CodeInput v-model="(resolve as any)[key]" />,
          </div>
        })
      </div>
      }]
      <va-button class="copy-button" flat icon="content_copy" @click="copy" />
    </div>

    <div class="demo-footer mt-2">
      <div class="d-flex align--center">
        <div style="width: 64px;" class="code-snippet code-snippet--icon mr-2" v-html="renderHTML(iconName)" />
        <div class="code-snippet" style="width: 100%;">{{ renderHTML(iconName) }}</div>
      </div>
    </div>

    <MarkdownView class="mt-2" v-if="description" :value="description" />
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import CodeInput from '../../../../components/demo/CodeInput.vue'
import MarkdownView from '../../../../components/markdown-view/MarkdownView.vue'
import { getArgs, parseConfig } from './playground-utils'
import { useCopyToClipboard } from './use-copy-to-clipboard'
import { useExampleSelect } from './use-example-select'

const resolve = reactive({
  class: '',
  content: '',
  attrs: '',
  tag: '',
})
const configName = ref('')
const iconName = ref('fa-book')
const isRegex = computed(() => configName.value.startsWith('/') && configName.value.endsWith('/'))
const resolveFnName = computed(() => isRegex.value ? 'resolveFromRegex' : 'resolve')
const description = ref<string | undefined>('')
const args = computed(() => {
  return getArgs(iconName.value, configName.value)
})

const { exampleOptions, exampleValue } = useExampleSelect((example) => {
  (Object.keys(resolve) as (keyof typeof resolve)[]).forEach((key) => {
    resolve[key] = example.resolve[key] || ''
  })
  configName.value = example.name
  iconName.value = example.exampleName
  description.value = example.description
})

const renderHTML = (iconName: string) => {
  const {
    tag = 'i',
    class: className = '',
    attrs = {},
    content = '',
  } = parseConfig(iconName, configName.value, resolve)

  const attributes = [
    className ? `class="${className}"` : undefined,
    ...Object.entries(attrs).map(([key, value]) => `${key}="${value}"`),
  ].filter(Boolean).join(' ')

  return `<${tag} ${attributes}>${content}</${tag}>`
}

const renderResolve = (tab = 4) => {
  return Object
    .entries(resolve)
    .filter(([key, value]) => Boolean(value))
    .map(([key, value]) => `${' '.repeat(tab)}${key}: ${value},`)
    .join('\n')
}

const renderConfig = () => {
  return `const fonts = [{
  name: '${configName.value}',
  resolve: ({ ${args.value} }) => ({
${renderResolve()}
  }),
}]`
}

const copyToClipboard = useCopyToClipboard()

const copy = () => {
  copyToClipboard(renderConfig())
}
</script>

<style lang="scss" scoped>
  .params {
    color: var(--va-primary);
  }

  .tag {
    &::before {
      content: '<';
    }

    &::after {
      content: '>';
    }
  }

  .code-snippet {
    color: currentColor;
    background: var(--va-background);
    position: relative;

    .copy-button {
      position: absolute;
      right: 8px;
      top: 8px;
    }
  }

  .demo-header {
    display: flex;
    align-items: center;
    flex-wrap: nowrap;
    margin: -0.5rem;

    & > * {
      padding: 0.5rem;
    }

    @media screen and (max-width: 1024px) {
      flex-direction: column;
      align-items: stretch;

      & > * { width: 100%; }
    }

    .code-snippet {
      display: flex;
      align-items: center;
      width: 100%;
      height: var(--va-input-min-height);
      padding-top: 0;
      padding-bottom: 0;
    }
  }

  .demo-footer {
    .code-snippet {
      height: 48px;
      display: flex;
      align-items: center;

      &--icon {
        width: 48px;
        justify-content: center;
        padding: 0;
      }
    }
  }
</style>
