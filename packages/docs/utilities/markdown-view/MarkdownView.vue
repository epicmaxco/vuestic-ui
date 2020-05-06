<template>
  <div class="markdown" v-html="text" />
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
<style scoped>
.markdown {
  display: inline-block;
}

.markdown >>> code {
  font-size: 87.5%;
  color: #e83e8c;
  word-wrap: break-word;
  white-space: nowrap;
}

.markdown >>> strong {
  font-weight: bold;
}
</style>
