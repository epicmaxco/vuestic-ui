<template>
  <div class="MarkdownView" v-html="text" />
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

  get text () {
    return md.render(this.value)
  }
}
</script>
<style lang="scss">
@import "../ui/src/components/vuestic-sass/resources/resources";

.MarkdownView {
  display: inline-block;

  code {
    color: $markdown-code;
  }
}
</style>
