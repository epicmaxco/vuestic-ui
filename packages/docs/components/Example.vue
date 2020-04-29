<template>
  <div>
    <p>
      <component :is="component" />
    </p>
    <va-content>
      <Code :code="parsed.template" language="markup" />
      <slot name="description" />
    </va-content>
  </div>
</template>

<script>
// Manually forked from https://github.com/vuetifyjs/vuetify/blob/master/packages/docs/src/components/doc/Example.vue
import VaContent from '../../ui/src/components/vuestic-components/va-content/VaContent'
import Code from './Code'

export default {
  components: { VaContent, Code },
  props: {
    value: {
      type: [Object, String],
      default: undefined,
    },
  },
  data: () => ({
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
      if (this.value === Object(this.value)) return this.value

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
    boot (res) {
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
    importComponent () {
      return import(
        /* webpackChunkName: "examples" */
        /* webpackMode: "lazy-once" */

        // TODO: enable eslint here once the issue is resolved
        // https://github.com/eslint/eslint/issues/11310
        // eslint-disable-next-line comma-dangle
        `../examples/${this.file}.vue`
      ).then(comp => (this.component = comp.default))
    },
    importTemplate () {
      return import(
        /* webpackChunkName: "examples-source" */
        /* webpackMode: "lazy-once" */

        // TODO: enable eslint here once the issue is resolved
        // https://github.com/eslint/eslint/issues/11310
        // eslint-disable-next-line comma-dangle
        `!raw-loader!../examples/${this.file}.vue`
      ).then(comp => this.boot(comp.default))
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
