<template>
  <div>
    <p class="my-3">
      <component :is="component" />
    </p>
    <va-button size="small" color="#cacaca" @click="showCode = !showCode">
      {{ $t('docsExample.showCode') }}
    </va-button>
    <va-content v-if="showCode">
      <DocsNavigation :code="parsed.template" :git-url="file" />
      <DocsCode :code="parsed.template" language="markup" />
    </va-content>
  </div>
</template>

<script>
// Manually forked from https://github.com/vuetifyjs/vuetify/blob/master/packages/docs/src/components/doc/Example.vue
// import VaContent from '../../ui/src/components/vuestic-components/va-content/VaContent'
import DocsCode from './DocsCode'
import DocsNavigation from './DocsNavigation'
import { readComponent, readTemplate } from '../utilities/utils'

export default {
  components: { DocsCode, DocsNavigation },
  props: {
    value: {
      type: [Object, String],
      default: undefined,
    },
  },
  data: () => ({
    showCode: false,
    component: undefined,
    loading: false,
    parsed: {
      template: '',
      style: '',
      script: '',
    },
  }),

  computed: {
    internalValue () {
      if (this.value === Object(this.value)) {
        return this.value
      }

      return { file: this.value }
    },
    file () {
      return this.internalValue.file
    },
  },
  mounted () {
    this.importComponent()
    this.getFiles()
  },
  methods: {
    parse (res) {
      const template = this.parseTemplate('template', res)
      const style = this.parseTemplate('style', res)
      const script = this.parseTemplate('script', res)

      this.parsed = {
        template,
        style,
        script,
      }
    },
    async getFiles () {
      this.loading = true
      await this.importTemplate()
      this.loading = false
    },
    async importComponent () {
      this.component = (await readComponent(this.file)).default
    },
    async importTemplate () {
      const componentTemplate = (await readTemplate(this.file)).default
      this.parse(componentTemplate)
    },
    parseTemplate (target, template) {
      const string = `(<${target}(.*)?>[\\w\\W]*<\\/${target}>)`
      const regex = new RegExp(string, 'g')
      const parsed = regex.exec(template) || []
      return parsed[1] || ''
    },
  },
}
</script>
