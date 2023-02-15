<template>
  <pre :class="syntaxHighlightClasses">
    <code
      :class="syntaxHighlightClasses"
      v-html="highlightedCode"
    />
  </pre>
</template>

<script>
import Prism from 'prismjs'

import 'prismjs/components/prism-scss'
import 'prismjs/components/prism-bash'

export default {
  name: 'PrismWrapper',

  props: {
    code: {
      type: String,
      default: '',
    },
    lang: {
      type: String,
      default: 'javascript',
    },
  },

  computed: {
    syntaxHighlightClasses () {
      return `${this.$attrs.class} language-${this.lang}`
    },
    highlightedCode () {
      let lang = this.lang

      if (lang === 'bash') {
        lang = 'sh'
      }

      if (!Prism.languages[this.lang]) {
        console.error(`Prism language ${this.lang} not found!`)
        lang = 'md'
      }
      return Prism.highlight(this.code, Prism.languages[lang])
    },
  },
}
</script>

<style lang="scss" scoped>
pre {
  white-space: nowrap;
  padding: 0.75rem 1.5rem;
}
</style>
