<script setup lang="ts">
import { DefineComponent, PropType, ref } from 'vue';
import { type CodeSandboxConfig } from '../../../../composables/code-sandbox';
import { CodeView } from "../shared/code";
import ExampleFooter from './example-footer.vue';
import Headline from '../headline/index.vue'
import Paragraph from '../paragraph/index.vue'
import camelCase from 'lodash/camelCase'

const props = defineProps({
  component: {
    type: Object as PropType<DefineComponent>,
    required: true,
  },
  source: {
    type: String as PropType<string>,
    required: true,
  },
  path: {
    type: String as PropType<string>,
    required: true,
  },
  hideCode: { type: Boolean, default: false, },
  hideTitle: { type: Boolean, default: false, },
  hideTemplate: { type: Boolean, default: false, },
  forceShowCode: { type: Boolean, default: false },
  codesandboxConfig: { type: Object as PropType<CodeSandboxConfig>, default: {} },
});

const source = props.source
const showCode = ref(false)

function parseTemplate(target: string, template: string) {
  const string = `(<${target}(.*)?>[\\w\\W]*<\\/${target}>)`
  const regex = new RegExp(string, 'g')
  const parsed = regex.exec(template) || []
  return parsed[1] || ''
}

const template = parseTemplate('template', source)
const script = parseTemplate('script', source)
const style = parseTemplate('style', source)

// TODO: double check if path correct after release
const gitLink = computed(
  () => `https://github.com/epicmaxco/vuestic-ui/tree/develop/packages/docs/${props.path}`,
)

const exampleName = computed(() => camelCase(props.path.split('/').pop()?.replace('.vue', '') || ''))

const configName = computed(() => {
  const fullName = props.path.match(/\/(.*)\/examples/)?.[1] || undefined
  return camelCase(fullName?.split('/').pop())
})

const { t, te } = useI18n()

const title = computed(() => {
  return t(`${configName.value}.examples.${exampleName.value}.title`)
})

const description = computed(() => {
  const key = `${configName.value}.examples.${exampleName.value}.text`
  return  te(key) ? t(key) : ''
})
</script>

<template>
  <template v-if="!hideTitle">
    <Headline v-if="title" :text="title" />
    <Paragraph v-if="description" :text="description" />
  </template>

  <div class="page-config-example mb-3">
    <va-card outlined class="page-config-example__card" color="background-primary">
      <va-card-content>
        <component :is="component" />
      </va-card-content>
    </va-card>
    <ExampleFooter class="-mt-1" :code="source" :gitLink="gitLink" v-model:show-code="showCode" :hide-show-code-button="forceShowCode || hideCode" />

    <div v-if="(showCode && !hideCode) || forceShowCode">
      <CodeView v-if="template && !hideTemplate" language="html" :code="template" />
      <CodeView v-if="script" :code="script" language="html" />
      <CodeView v-if="style" :code="style" language="html" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .page-config-example {
    &__card {
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
    }
  }
</style>
