<template>
  <p>
    <MarkdownView
      class="DocsLink__pre"
      inline
      tag="span"
      v-if="preText"
      :value="$te(preText) ? $t(preText) : preText"
    />
    <router-link :to="href">
      {{ $te(text) ? $t(text) : text }}
    </router-link>
    <MarkdownView
      class="DocsLink__after"
      inline
      tag="span"
      v-if="afterText"
      :value="$te(afterText) ? $t(afterText) : afterText"
    />
  </p>
</template>

<script lang="ts">
import { Options, Vue, prop, mixins } from 'vue-class-component'
import MarkdownView from '../utilities/markdown-view/MarkdownView.vue'

class Props {
  text = prop<string>({ type: String, required: true })
  href = prop<string>({ type: String, required: true })

  preText = prop<string>({ type: String, required: false, default: '' })
  afterText = prop<string>({ type: String, required: false, default: '' })
}

const PropsMixin = Vue.with(Props)

@Options({
  components: { MarkdownView },
})
export default class DocsLink extends mixins(PropsMixin) {}
</script>

<style lang="scss">
@import "~vuestic-ui/src/components/vuestic-sass/resources/resources";

.DocsLink__pre {
  margin-right: 0.3rem;
}

.DocsLink__after {
  margin-left: 0.3rem;
}
</style>
