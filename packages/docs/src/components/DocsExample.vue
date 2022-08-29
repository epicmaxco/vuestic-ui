<template>
  <div class="mb-3">
    <va-card outlined class="docs-example-card">
      <va-card-content>
        <component :is="component" />
      </va-card-content>
    </va-card>

    <va-content v-if="!exampleOptions.hideCode">
      <DocsNavigation
        v-if="componentTemplate"
        :code="componentTemplate"
        :config="exampleOptions.codesandboxConfig"
        :git-url="path"
        :git-component="file"
        :hide-show-code-button="exampleOptions.forceShowCode"
        v-model:show-code="showCode"
      />

      <template v-if="showCode || exampleOptions.forceShowCode">
        <DocsCode
          v-if="!exampleOptions.hideTemplate"
          language="markup"
          :code="parsed.template"
        />
        <DocsCode
          v-if="parsed.script"
          :code="parsed.script"
          language="markup"
        />
        <DocsCode
          v-if="parsed.style"
          :code="parsed.style"
          language="markup"
        />
      </template>
    </va-content>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, shallowRef, defineProps, PropType } from 'vue'
import DocsCode from './DocsCode.vue'
import DocsNavigation from './DocsNavigation.vue'
import { readComponent, readTemplate } from '../helpers/ReadHelper'
import type { ExampleOptions } from '../types/configTypes'

const props = defineProps({
  value: {
    type: [Object, String],
    default: undefined,
  },
  path: {
    type: String,
    required: true,
  },
  exampleOptions: {
    type: Object as PropType<ExampleOptions>,
    default: () => ({}),
  },
})
const showCode = ref(false)
const parsed = reactive({
  template: '',
  style: '',
  script: '',
})

const file = computed(() => {
  if (typeof props.value === 'object') {
    return props.value.file
  }

  return props.value
})
const path = ref(props.path)
const component = shallowRef(null)
const componentTemplate = shallowRef<string | null>(null)

importComponent()
importTemplate()

async function importComponent () {
  component.value = (await readComponent(path.value, file.value)).default
}
async function importTemplate () {
  componentTemplate.value = (await readTemplate(path.value, file.value)).default
  if (componentTemplate.value) {
    parse(componentTemplate.value)
  }
}

function parse (res: string) {
  parsed.template = parseTemplate('template', res)
  parsed.style = parseTemplate('style', res)
  parsed.script = parseTemplate('script', res)
}
function parseTemplate (target: string, template: string) {
  const string = `(<${target}(.*)?>[\\w\\W]*<\\/${target}>)`
  const regex = new RegExp(string, 'g')
  const parsed = regex.exec(template) || []
  return parsed[1] || ''
}
</script>

<style lang="scss">
  .docs-example {
    &__show-code-button {
      --va-button-sm-content-px: 6px;

      transform: translateX(calc(var(--va-button-sm-content-px) * -1));
    }
  }
</style>

<style lang="scss" scoped>
  .docs-example-card {
    --va-card-outlined-border: 3px solid var(--va-background);
    --va-card-border-radius: 0.25rem;

    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;

    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: var(--va-background);
      opacity: 0.3;
      z-index: -1;
    }
  }
</style>
