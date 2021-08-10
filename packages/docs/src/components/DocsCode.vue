<template>
  <prism-wrapper
    :code="formattedCode"
    :lang="language"
    class="DocsCode"
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

<style lang="scss">
@import "~vuestic-ui/src/styles/resources/resources";

/* PrismJS 1.20.0
https://prismjs.com/download.html#themes=prism&languages=css */

/**
 * prism.js default theme for JavaScript, CSS and HTML
 * Based on dabblet (http://dabblet.com)
 * @author Lea Verou
 */
// @TODO After removing vue-prism-component need to update markup
// This pre is a bit weird here and exists because of how vue-prism-component applies class
// The structure is temporarily saved.
// Notably it has structure like this: pre.DocsCode > code.DocsCode.
// Here class is being applied twice, while it should have been applied only on external container
pre.DocsCode {
  background: #f4f8fa;
  padding-top: 1.3rem;
  font-size: calc(1rem / 1.4);

  code[class*='language-'],
  pre[class*='language-'] {
    color: black;
    background: none;
    text-shadow: 0 1px white;
    font-family: Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace;
    font-size: 1rem;
    text-align: left;
    white-space: pre;
    word-spacing: normal;
    word-break: normal;
    word-wrap: normal;
    line-height: 1.5;
    tab-size: 4;
    hyphens: none;
    border-radius: 0.25rem;
  }

  pre[class*='language-'] {
    padding: 1rem;
    margin: 0;
    overflow: auto;
  }

  :not(pre) > code[class*='language-'],
  pre[class*='language-'] {
    background: $prism-background;
  }

  /* Inline code */
  :not(pre) > code[class*='language-'] {
    padding: 0.1rem;
    border-radius: 0.3rem;
    white-space: normal;
  }

  .token.comment,
  .token.block-comment,
  .token.prolog,
  .token.doctype,
  .token.cdata {
    color: slategray;
  }

  .token.punctuation {
    color: #999999;
  }

  .token.namespace {
    opacity: 0.7;
  }

  .token.property,
  .token.tag,
  .token.boolean,
  .token.number,
  .token.constant,
  .token.symbol,
  .token.deleted {
    color: #990055;
  }

  .token.selector,
  .token.attr-name,
  .token.string,
  .token.char,
  .token.builtin,
  .token.inserted {
    color: #669900;
  }

  .token.operator,
  .token.entity,
  .token.url,
  .language-css .token.string,
  .style .token.string {
    color: #9a6e3a;
    background: hsla(0, 0%, 100%, 0.5);
  }

  .token.atrule,
  .token.attr-value,
  .token.keyword {
    color: #0077aa;
  }

  .token.function,
  .token.class-name {
    color: #dd4a68;
  }

  .token.regex,
  .token.important,
  .token.variable {
    color: #ee9900;
  }

  .token.important,
  .token.bold {
    font-weight: $font-weight-bold;
  }

  .token.italic {
    font-style: italic;
  }

  .token.entity {
    cursor: help;
  }
}
</style>
