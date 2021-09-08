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
        {{ $tie('docsExample.showCode') }}
      </va-button>
      <va-content v-if="showCode || exampleOptions.forceShowCode">
        <DocsNavigation
          :code="parsed.template"
          :git-url="file"
        />
        <DocsCode
          language="markup"
          :code="parsed.template"
          :class="[parsed.script ? 'docs-example__code--with-margin' : '']"
        />
        <DocsCode
          v-if="parsed.script"
          :code="parsed.script"
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
import { readComponent, readTemplate } from '../utilities/utils'

export default {
  name: 'DocsExample',
  components: { DocsCode, DocsNavigation },
  props: {
    value: {
      type: [Object, String],
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
    const component = shallowRef(null)

    importComponent()
    importTemplate()

    async function importComponent () {
      component.value = (await readComponent(file.value)).default
    }
    async function importTemplate () {
      const componentTemplate = (await readTemplate(file.value)).default
      parse(componentTemplate)
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
      file,
    }
  },
}
</script>

<style lang="scss">
.docs-example {
  &__code {
    &--with-margin {
      margin-bottom: 0.2rem !important;
    }
  }

  &__show-code-button {
    .va-button {
      &__content {
        padding: 0 !important;
      }
    }
  }
}
</style>
