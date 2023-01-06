<template>
  <MarkdownView :content="config.content" />
</template>

<script lang="ts" setup>
import { PropType } from "vue";
import { PageConfigMarkdown } from ".";
import { MarkdownView } from "../../shared/markdown";

const props = defineProps({
  config: {
    type: Object as PropType<ReturnType<PageConfigMarkdown>>,
    required: true,
  },
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
