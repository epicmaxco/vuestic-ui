<script setup lang="ts">
import { MarkdownView } from '../shared/markdown'

const props = defineProps({
  text: {
    type: String,
    required: true,
  },
  href: {
    type: String,
    required: true,
  },
  preText: {
    type: String,
    required: false,
    default: '',
  },
  afterText: {
    type: String,
    required: false,
    default: '',
  },
})

const externalLink = computed(() => {
  return /^(http:\/\/|https:\/\/)/.test(props.href)
})
</script>

<template>
  <p class="docs-link">
    <MarkdownView
      v-if="preText"
      class="docs-link__pre"
      inline
      tag="span"
      :content="preText"
    />
    <a
      v-if="externalLink"
      class="MarkdownView__link--external"
      :href="href"
      target="_blank"
    >
      {{ text }}
    </a>
    <NuxtLink
      v-else
      :to="href"
    >
      {{ text }}
    </NuxtLink>
    <MarkdownView
      v-if="afterText"
      class="docs-link__after"
      inline
      tag="span"
      :content="afterText"
    />
  </p>
</template>

<style lang="scss">
.DocsLink__pre {
  margin-right: 0.3rem;
}

.DocsLink__after {
  margin-left: 0.3rem;
}
</style>
