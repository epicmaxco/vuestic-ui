<script>
import { defineComponent, h, computed } from 'vue'

import hljs from 'highlight.js'

export default defineComponent({
  props: {
    code: {
      type: String,
      default: '',
    },
    lang: {
      type: String,
      default: 'javascript',
    }
  },

  setup(props, { attrs }) {
    const languageName = computed(() => {
      let language = props.lang

      if (!hljs.getLanguage(language)) {
        console.error(`highlight.js - language ${props.lang} not found!`)
        language = 'markdown'
      }

      return language
    })

    const highlightClasses = computed(() => `${attrs.class} hljs language-${languageName.value}`)

    const highlightedCode = computed(() => hljs.highlight(props.code, {
      language: languageName.value,
    }).value)

    return () => h('pre', { class: 'hljs-container' }, [
      h('code', {
        class: highlightClasses.value,
        innerHTML: highlightedCode.value,
      }),
    ])
  }
})
</script>

<style lang="scss">
.hljs-container {
  font-family: monospace;
  white-space: nowrap;
  padding: 0.75rem 1.5rem;

  * {
    font-family: monospace;
  }
}
</style>
