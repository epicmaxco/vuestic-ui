<template>
  <p>
    <MarkdownView
      class="DocsLink__pre"
      inline
      tag="span"
      v-if="preText"
      :value="$tie(preText)"
    />
    <router-link :to="linkHref">
      {{ $tie(text) }}
    </router-link>
    <MarkdownView
      class="DocsLink__after"
      inline
      tag="span"
      v-if="afterText"
      :value="$tie(afterText)"
    />
  </p>
</template>

<script lang="ts">
import MarkdownView from './markdown-view/MarkdownView.vue'
import { defineComponent, computed } from 'vue'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  name: 'DocsLink',
  components: {
    MarkdownView,
  },
  props: {
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
  },
  setup (props) {
    const { locale } = useI18n()

    const linkHref = computed(() => {
      if (props.href.startsWith('/')) {
        return `/${locale.value}${props.href}`
      }
      return `/${locale.value}/${props.href}`
    })

    return {
      linkHref,
    }
  },
})
</script>

<style lang="scss">
@import "~vuestic-ui/src/styles/resources";

.DocsLink__pre {
  margin-right: 0.3rem;
}

.DocsLink__after {
  margin-left: 0.3rem;
}
</style>
