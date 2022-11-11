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
    const { locale } = useI18n()
    const { inline, value } = toRefs(props)

    attributesOptions.className = 'MarkdownView__link--external'

    watch(locale, (newValue) => {
      // TODO Not sure why newValue is not considered string (it actually is!).
      localeOptions.currentLocale = newValue as unknown as string
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
@import "~vuestic-ui/src/styles/resources";

.MarkdownView {
  color: currentColor;

  code {
    margin: 0 0.3rem;
    color: $markdown-code;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  li,
  span {
    color: currentColor;
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
