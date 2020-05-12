<template>
  <prism class="code" :language="language">{{ code }}</prism>
</template>

<script>
import 'prismjs'
import Prism from 'vue-prism-component'

export default {
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
    Prism,
  },
}
</script>

<style lang="scss">
@import "../ui/src/components/vuestic-sass/resources/resources";

// prism.js tomorrow night eighties for JavaScript, CoffeeScript, CSS and HTML
// Based on https://github.com/chriskempson/tomorrow-theme
// @author Rose Pritchard

code[class*='language-'],
pre[class*='language-'] {
  color: #cccccc;
  background: none;
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
}

pre[class*='language-'] {
  padding: 1rem;
  margin: 0;
  overflow: auto;
}

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
  color: #999999;
}

.token.punctuation {
  color: #cccccc;
}

.token.tag,
.token.attr-name,
.token.namespace,
.token.deleted {
  color: #e2777a;
}

.token.function-name {
  color: #6196cc;
}

.token.boolean,
.token.number,
.token.function {
  color: #f08d49;
}

.token.property,
.token.class-name,
.token.constant,
.token.symbol {
  color: #f8c555;
}

.token.selector,
.token.important,
.token.atrule,
.token.keyword,
.token.builtin {
  color: #cc99cd;
}

.token.string,
.token.char,
.token.attr-value,
.token.regex,
.token.variable {
  color: #7ec699;
}

.token.operator,
.token.entity,
.token.url {
  color: #67cdcc;
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

.token.inserted {
  color: green;
}
</style>
