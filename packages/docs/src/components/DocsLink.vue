<template>
  <p>
    {{ $te(preText) ? $t(preText) : preText }}
    <router-link :to="href">
      {{ $te(text) ? $t(text) : text }}
    </router-link>
    {{ $te(afterText) ? $t(afterText) : afterText }}
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
</style>
