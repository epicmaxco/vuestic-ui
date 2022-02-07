<template>
  <div class="mb-3">
    <component :is="component" />
    <template v-if="!exampleOptions.hideCode">
      <va-button
        v-if="!exampleOptions.forceShowCode"
        class="mt-2 d-block docs-example__show-code-button"
        style="background: transparent !important; box-shadow: none !important;"
        flat
        size="small"
        color="primary"
        :rounded="false"
        @click="showCode = !showCode"
      >
        {{ showCode ? $t('docsExample.hideCode') : $t('docsExample.showCode') }}
      </va-button>
      <va-content v-if="showCode || exampleOptions.forceShowCode">
        <DocsNavigation
          :code="componentTemplate"
          :config="exampleOptions.codesandboxConfig"
          :git-url="path"
          :git-component="file"
        />
        <DocsCode
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
      </va-content>
    </template>
  </div>
</template>

<script>
// Manually forked from https://github.com/vuetifyjs/vuetify/blob/master/packages/docs/src/components/doc/Example.vue
// import VaContent from '../../ui/src/components/va-content/VaContent'
import { ref, reactive, computed, shallowRef } from 'vue'
import DocsCode from './DocsCode'
import DocsNavigation from './DocsNavigation'
import { readComponent, readTemplate } from '../helpers/ReadHelper'

export default {
  name: 'DocsExample',
  components: { DocsCode, DocsNavigation },
  props: {
    value: {
      type: [Object, String],
      default: undefined,
    },
    path: {
      type: String,
      default: undefined,
    },
    exampleOptions: {
      type: Object,
      default: () => ({}),
    },
  },
  setup (props) {
    const showCode = ref(false)
    const parsed = reactive({
      template: '',
      style: '',
      script: '',
    })
    const file = computed(() => {
      if (props.value === Object(props.value)) {
        return props.value.file
      }

      return props.value
    })
    const path = ref(props.path)
    const component = shallowRef(null)
    const componentTemplate = shallowRef(null)

    importComponent()
    importTemplate()

    async function importComponent () {
      component.value = (await readComponent(path.value, file.value)).default
    }
    async function importTemplate () {
      componentTemplate.value = (await readTemplate(path.value, file.value)).default
      parse(componentTemplate.value)
    }
    function parse (res) {
      parsed.template = parseTemplate('template', res)
      parsed.style = parseTemplate('style', res)
      parsed.script = parseTemplate('script', res)
    }
    function parseTemplate (target, template) {
      const string = `(<${target}(.*)?>[\\w\\W]*<\\/${target}>)`
      const regex = new RegExp(string, 'g')
      const parsed = regex.exec(template) || []
      return parsed[1] || ''
    }

    return {
      showCode,
      parsed,
      component,
      componentTemplate,
      file,
    }
  },
}
</script>

<style lang="scss">
.docs-example {
  &__show-code-button {
    .va-button {
      &__content {
        padding: 0 !important;
      }
    }
  }
}
</style>
