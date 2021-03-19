<template>
  <component :is="tag" class="MarkdownView" v-html="text" />
</template>

<script lang="ts">
import { Options, Vue, prop, mixins } from 'vue-class-component'
// @ts-ignore
import MarkdownIt from 'markdown-it'

const md = new MarkdownIt({
  breaks: true,
  typographer: true,
  html: true,
})

class Props {
  value = prop<string>({ type: String, required: true })
  tag = prop<string>({ type: String, default: 'div' })
  inline = prop<boolean>({ type: Boolean, default: false })
}

const PropsMixin = Vue.with(Props)

/**
 * This component converts markdown to html and presents it.
 */
@Options({})
export default class MarkdownView extends mixins(PropsMixin) {
  get text () {
    if (this.inline) {
      return md.renderInline(this.value)
    }
    return md.render(this.value)
  }
}
</script>
<style lang="scss">
@import "~vuestic-ui-dev/src/components/vuestic-sass/resources/resources";

.MarkdownView {
  code {
    color: $markdown-code;
  }
}
</style>
