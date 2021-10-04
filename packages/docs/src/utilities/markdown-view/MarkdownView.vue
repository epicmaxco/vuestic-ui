<template>
  <component :is="tag" class="MarkdownView" v-html="text" />
</template>

<script lang="ts">
import { defineComponent, computed, toRefs, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import md, { localeOptions, attributesOptions } from './MarkdownIt'

/**
 * This component converts markdown to html and presents it.
 */
export default defineComponent({
  name: 'MarkdownView',
  components: {},
  props: {
    value: {
      type: String,
      required: true,
    },
    tag: {
      type: String,
      default: 'div',
    },
    inline: {
      type: Boolean,
      default: false,
    },
  },
  setup (props) {
    const { inline, value } = toRefs(props)
    const { locale } = useI18n()

    attributesOptions.className = 'MarkdownView__link--external'

    watch(locale, (newValue) => {
      localeOptions.currentLocale = newValue
    })

    const text = computed(() => {
      if (inline.value) {
        return md.renderInline(value.value)
      }
      return md.render(value.value)
    })

    return {
      text,
    }
  },
})
</script>

<style lang="scss">
@import "~vuestic-ui/src/styles/resources/resources";

.MarkdownView {
  code {
    margin: 0 0.3rem;
    color: $markdown-code;
  }
}

.MarkdownView__link--external {
  position: relative;

  &::after {
    content: '\279A';
    position: relative;
    opacity: 0.35;
    line-height: 1;
    vertical-align: text-top;
  }
}
</style>
