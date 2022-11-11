<template>
  <va-tabs v-if="!isString" v-model="index">
    <template #tabs>
      <va-tab v-for="tab in tabs" :key="tab">
        {{ tab }}
      </va-tab>
    </template>
  </va-tabs>
  <prism-wrapper
    :code="escapeVuesticImport(contents[index])"
    :lang="$props.language"
    class="DocsCode"
  />
</template>

<script lang="ts">
import { defineComponent, PropType, computed, ref, watch, nextTick } from 'vue'
import PrismWrapper from './PrismWrapper.vue'
import { applyTranslations } from '../helpers/TranslationsHelper'

export default defineComponent({
  name: 'DocsCode',
  components: { PrismWrapper },
  props: {
    language: { type: String as PropType<string>, default: 'javascript' },
    code: {
      type: [Object, String] as PropType<Record<string, string> | string>,
      default: '',
    },
  },
  setup (props) {
    const isString = computed(() => typeof props.code === 'string')

    const tabs = computed(() =>
      isString.value ? [] : Object.keys(props.code),
    )

    const contents = computed(() =>
      isString.value
        ? [applyTranslations((props.code as string).trim())]
        : tabs.value.map((tab) =>
          applyTranslations(
            (props.code as Record<string, string>)[tab].trim(),
          ),
        ),
    )

    const index = ref(0)

    const doShowCode = ref(true)

    const forceUpdate = () => {
      doShowCode.value = false
      nextTick(() => {
        doShowCode.value = true
      }) // nextTick() triggers v-if, that causes re-rendering of component.
    }

    // Hack: Remove this with alias when moving to vite.
    const escapeVuesticImport = (code: string) => {
      return code.replace(/vuestic-ui\/src\/main/g, 'vuestic-ui')
    }

    watch(() => props.code, forceUpdate, { immediate: true })

    return { isString, tabs, contents, index, escapeVuesticImport }
  },
})
</script>

<style lang="scss">
@import "~vuestic-ui/src/styles/resources";

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
.DocsCode {
  margin-bottom: 0.2rem !important;
  background: var(--va-background-element);
  font-size: calc(1rem / 1.4);
  border-radius: 0.25rem;

  code[class*="language-"],
  pre[class*="language-"] {
    color: currentColor;
    background: none;
    font-family: var(--va-font-family, Consolas, Monaco, "Andale Mono", "Ubuntu Mono"), monospace;
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
