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
      return Prism.highlight(this.code, Prism.languages[this.lang])
    },
  },
}
</script>
