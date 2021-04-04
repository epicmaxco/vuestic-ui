<template>
  <MdView :value="text" />
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import MdView from '../utilities/markdown-view/MarkdownView.vue'

@Component({
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
