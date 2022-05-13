<template>
  <span v-if="inline" class="MarkdownView" v-html="text.trim()" />
  <div v-else class="MarkdownView" v-html="text.trim()" />
</template>

<script lang="ts">
import { defineComponent, computed, toRefs, watch } from 'vue'

/**
 * This component converts markdown to html and presents it.
 */
export default defineComponent({
  name: 'MarkdownView',
  props: {
    source: {
      type: String,
      required: true,
    },
    inline: {
      type: Boolean,
      default: false,
    },
  },
  setup (props) {
    const { locale } = useI18n()

    const md = useMarkdownIt({
      locale: { currentLocale: locale },
      attributes: { className: 'MarkdownView__link--external' }
    })

    const text = computed(() => {
      if (props.inline) {
        return md.renderInline(props.source)
      }
      return md.render(props.source)
    })

    return {
      text,
      locale
    }
  },
})
</script>

<style lang="scss">
@import "vuestic-ui/styles/resources/index.scss";

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
