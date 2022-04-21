<template>
  <p>
    <MarkdownView
      v-if="preText"
      class="DocsLink__pre"
      inline
      :source="tie(preText)"
    />
    <router-link :to="linkHref">
      {{ tie(text) }}
    </router-link>
    <MarkdownView
      v-if="afterText"
      class="DocsLink__after"
      inline
      :source="tie(afterText)"
    />
  </p>
</template>

<script lang="ts">
import MarkdownView from '../MarkdownView/MarkdownView.vue'

export default defineComponent({
  name: 'DocsLink',
  components: {
    MarkdownView,
  },
  props: {
    text: { type: String, required: true },
    href: { type: String, required: true },
    preText: { type: String, default: '' },
    afterText: { type: String, default: '' },
  },
  setup(props) {
    const { locale, tie } = useI18n()

    return {
      linkHref: computed(() => `/${locale.value}/${props.href.replace(/^\/+/, '')}`),
      tie
    }
  },
})
</script>

<style lang="scss">
@import "vuestic-ui/styles/resources";

.DocsLink__pre {
  margin-right: 0.3rem;
}

.DocsLink__after {
  margin-left: 0.3rem;
}
</style>
