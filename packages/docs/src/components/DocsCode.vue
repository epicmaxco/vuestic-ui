<template>
  <prism-wrapper
    :code="formattedCode"
    :lang="language"
  />
</template>

<script>
import PrismWrapper from './PrismWrapper';

export default {
  name: 'DocsCode',
  props: {
    language: {
      type: String,
      default: 'javascript',
    },
    code: {
      type: String,
      default: '',
    },
  },
  components: {
    PrismWrapper,
  },
  computed: {
    formattedCode () {
      let { code } = this;

      code = this.removeFirstLineBreakIfExists(code)
      code = this.applyTranslations(code)

      return code;
    },
  },
  methods: {
    /**
     * If we use the following block of code as input string
     * ```
     * const code = `
     *  console.log('Hello World!')
     * `
     * ```
     * then you will have \n at string start and end.
     * This method deletes '\n' from start and end of string if '\n' exists.
     */
    removeFirstLineBreakIfExists (code) {
      let newCode = code
      if (newCode[0] === '\n') {
        newCode = newCode.slice(1)
      }
      if (newCode[newCode.length - 1] === '\n') {
        newCode = newCode.slice(0, -1)
      }
      return newCode
    },
    applyTranslations(code) {
      const replaces = code.match(/(?:\$t)\(.*?\)/) || [];

      return replaces.reduce((acc, replaceSource) => {
        const translation = replaceSource.replace(/(\$t|'|\(|\)|\[\d\])/gi, '')

        return acc.replace(replaceSource, this.$t(translation))
      }, code);
    },
  },
}
</script>
