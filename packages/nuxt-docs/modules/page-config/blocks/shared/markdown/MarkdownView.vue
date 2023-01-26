<template>
  <div
    v-html="text"
    class="MarkdownView"
    :class="{ 'MarkdownView--inline': inline || text }"
  />
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { useMarkdownIt } from "./useMarkdownIt";

const props = defineProps({
  content: {
    type: String,
    required: true,
  },
  inline: {
    type: Boolean,
    default: false,
  },
  text: {
    type: Boolean,
    default: false,
  }
});

const { locale } = useI18n();

const md = useMarkdownIt();

// watch(locale, (newValue) => {
//   localeOptions.currentLocale = newValue
// })

const text = computed(() => {
  try {
    // if (props.inline) {
    //   return md.renderInline(props.content)
    // }

    if (props.text) {
      return md.render(props.content).match(/<p>(.*)<\/p>/)?.[1]
    }

    return md.render(props.content);
  } catch (e) {
    console.error(e, props.content)
    return ''
  }
});
</script>

<style lang="scss">
// @import "~vuestic-ui/src/styles/resources";

.MarkdownView {
  color: currentColor;

  &--inline {
    display: inline;
  }

  code {
    margin: 0 0.3rem;
    color: #d7234e;
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
    content: "\279A";
    position: relative;
    opacity: 0.35;
    line-height: 1;
    vertical-align: text-top;
  }
}
</style>
