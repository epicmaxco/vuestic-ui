<template>
  <MdView :value="text" />
</template>

<script lang="ts">
// @ts-ignore
import { Options, Vue } from 'vue-class-component'
import MdView from '@/utilities/markdown-view/MarkdownView.vue'

@Options({
  components: { MdView },
})
export default class MarkdownTest extends Vue {
  get text () {
    return `## Some markdown
* with
* lists
\`\`\`vue
<va-component :value="1">
\`\`\``
  }
}
</script>

<style lang="scss">
.MarkdownTest {

}
</style>
