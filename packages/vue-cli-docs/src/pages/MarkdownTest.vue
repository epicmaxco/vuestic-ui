<template>
  <MdView :value="text" />
</template>

<script lang="ts">
// @ts-ignore
import withLayout from '@/components/withLayout'
import { Options, Vue } from 'vue-class-component'
import MdView from '@/utilities/markdown-view/MarkdownView.vue'

@Options({
  components: { MdView },
})
class MarkdownTest extends Vue {
  get text () {
    return `## Some markdown
* with
* lists
\`\`\`vue
<va-component :value="1">
\`\`\``
  }
}

export default withLayout(MarkdownTest)
</script>

<style lang="scss">
.MarkdownTest {

}
</style>
