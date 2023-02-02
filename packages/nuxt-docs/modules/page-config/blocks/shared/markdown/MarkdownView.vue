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
import { useColors, useElementTextColor } from 'vuestic-ui'

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
  }
});

const { locale } = useI18n();

const md = useMarkdownIt();

// watch(locale, (newValue) => {
//   localeOptions.currentLocale = newValue
// })

const text = computed(() => {
  try {
    if (!props.content) { return '' }

    if (props.text) {
      return md.render(props.content).match(/<p>(.*)<\/p>/)?.[1]
    }

    return md.render(props.content);
  } catch (e) {
    console.error(e, props.content)
    return ''
  }
});

const { getColor, setHSLAColor, getTextColor, colors } = useColors()

const codeRed = computed(() =>
  getTextColor(getColor(props.background || colors.backgroundPrimary), "#990055", "#FF006E")
);

const dangerWithOpacity = computed(() => {
  return setHSLAColor(codeRed.value, { a: 0.1 })
})
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
    display: inline;
    margin: 0.1rem 0;
    color: v-bind(codeRed);
    font-family: Source Sans Code, Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace;
    // TODO: Fancy code background. IDK if we need it.
    // background: var(--code-bg, v-bind(dangerWithOpacity));
    // padding: 0.15rem 0.3rem;
    border-radius: 4px;
    z-index: 0;
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
