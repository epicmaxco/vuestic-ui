<template>
  <component :is="tag" class="MarkdownView" v-html="text" />
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import MarkdownIt from 'markdown-it'

const md = new MarkdownIt({
  breaks: true,
  typographer: true,
  html: true,
})

/**
 * This component converts markdown to html and presents it.
 */
@Component({})
export default class MarkdownView extends Vue {
  @Prop({ type: String, required: true }) value!: string
  @Prop({ type: Boolean, default: 'div' }) tag!: boolean
  @Prop({ type: Boolean }) inline!: boolean

  get text () {
    if (this.inline) {
      return md.renderInline(this.value)
    }
    return md.render(this.value)
  }
}
</script>
<style lang="scss">
@import "../ui/src/components/vuestic-sass/resources/resources";

.MarkdownView {
  code {
    color: $markdown-code;
  }
}
</style>
