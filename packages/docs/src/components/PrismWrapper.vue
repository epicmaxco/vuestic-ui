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
    syntaxHighlightClasses() {
      return `PrismWrapper language-${this.lang}`;
    },
    highlightedCode() {
      return Prism.highlight(this.code, Prism.languages[this.lang]);
    },
  },
};
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
// Notably it has structure like this: pre.PrismWrapper > code.PrismWrapper.
// Here class is being applied twice, while it should have been applied only on external container
pre.PrismWrapper {
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
