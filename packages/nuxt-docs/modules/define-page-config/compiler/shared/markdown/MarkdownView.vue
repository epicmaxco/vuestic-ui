<template>
  <div v-html="text" class="MarkdownView"></div>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { useMarkdownIt } from "./useMarkdownIt";

const props = defineProps({
  content: {
    type: String,
    required: true,
  },
});

const { locale } = useI18n();

const md = useMarkdownIt();

// watch(locale, (newValue) => {
//   localeOptions.currentLocale = newValue
// })

const text = computed(() => {
  // if (props.config.inline) {
  //   return md.renderInline(props.config.content)
  // }
  return md.render(props.content);
});
</script>

<style lang="scss">
// @import "~vuestic-ui/src/styles/resources";

.MarkdownView {
  color: currentColor;

  code {
    margin: 0 0.3rem;
    // color: $markdown-code;
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
