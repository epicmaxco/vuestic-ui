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
    position: relative;
    margin: 0 0.3rem;
    color: var(--va-danger);
    font-family: Source Sans Code, Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace;
    // background: #d7234d11;
    padding: 0 6px;
    z-index: 0;

    @include va-background(var(--va-danger), 0.1);

    &::after {
      border-radius: 2px;
    }
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
