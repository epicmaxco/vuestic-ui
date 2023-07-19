<template>
  <div
    class="MarkdownView va-typography-block"
    :class="{ 'MarkdownView--inline': inline || text }"
    v-html="text"
  />
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { useColors } from "vuestic-ui";

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
  },
  background: {
    type: String,
    default: undefined,
  },
});

const { parse, parseInline } = useMarkdown();

const text = computed(() => {
  try {
    if (!props.content) {
      return "";
    }

    if (props.inline) {
      return parseInline(props.content);
    }

    if (props.text) {
      return parse(props.content).match(/<p>(.*)<\/p>/)?.[1] || "";
    }

    return parse(props.content);
  } catch (e) {
    console.error(e, props.content);
    return "";
  }
});

const { getColor, setHSLAColor, getTextColor, colors } = useColors();

const codeBackground = computed(() => {
  return setHSLAColor(colors.backgroundElement, {});
});

const codeBorder = computed(() => {
  const textColor = getColor(getTextColor(codeBackground.value));

  return setHSLAColor(textColor, { a: 0.1 });
});
</script>

<style lang="scss">
@import "vuestic-ui/src/styles/resources";

.MarkdownView {
  color: currentColor;

  &--inline {
    display: inline;
  }

  li {
    margin-bottom: 0.25rem;
  }

  code {
    display: inline-block;
    font-family: Source Code Pro, Consolas, Monaco, "Andale Mono", "Ubuntu Mono",
      monospace;
    background: var(--code-bg, v-bind(codeBackground));
    font-size: 0.85rem;
    line-height: 100%;
    padding: 0.25rem 0.35rem 0.25em 0.35rem;
    border: 1px solid v-bind(codeBorder);
    border-radius: 4px;
    z-index: 0;
    user-select: text;
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

  a[target="_blank"] {
    position: relative;

    &::after {
      content: "\279A";
      position: relative;
      opacity: 0.35;
      line-height: 1;
      vertical-align: text-top;
    }
  }
}
</style>
