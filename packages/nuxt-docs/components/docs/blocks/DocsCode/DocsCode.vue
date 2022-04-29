<template>
  <prism-wrapper
    :code="formattedCode"
    :lang="$props.language"
    class="DocsCode"
  />
</template>

<script lang="ts">
import { defineComponent, PropType, computed, ref, watch, nextTick } from 'vue'
import PrismWrapper from './PrismWrapper.vue'

export default defineComponent({
  name: 'DocsCode',
  components: { PrismWrapper },
  props: {
    language: { type: String as PropType<string>, default: 'javascript' },
    code: { type: String as PropType<string>, default: '' },
  },
  setup (props) {
    const { applyTranslations } = useRawTranslations()

    const formattedCode = computed(() => applyTranslations(props.code.replace(/^\n|\n$/g, '')))

    return { formattedCode }
  },
})
</script>

<style lang="scss">
@import "vuestic-ui/styles/resources";

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
  margin-bottom: 0.2rem;
  background: #f4f8fa;
  padding-top: 1.3rem;
  font-size: calc(1rem / 1.4);

  code[class*="language-"],
  pre[class*="language-"] {
    color: black;
    background: none;
    text-shadow: 0 1px white;
    font-family: Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace;
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

  pre[class*="language-"] {
    padding: 1rem;
    margin: 0;
    overflow: auto;
  }

  :not(pre) > code[class*="language-"],
  pre[class*="language-"] {
    background: $prism-background;
  }

  /* Inline code */
  :not(pre) > code[class*="language-"] {
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
    background: #f4f8fa;
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
