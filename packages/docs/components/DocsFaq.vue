<template>
  <div>
    <template v-for="(item, index) in items">
      <h3 :key="index">
        <MarkdownView :value="$t(item.question)" />
      </h3>
      <p :key="index">
        <MarkdownView :value="$t(item.answer)" />
      </p>
    </template>
  </div>
</template>
<script lang='ts'>
import { Vue, Component, Prop } from 'vue-property-decorator'
import { FaqBlock } from '../types/configTypes'
import MarkdownView from '../utilities/markdown-view/MarkdownView.vue'

@Component({
  components: { MarkdownView },
})
export default class DocsFaq extends Vue {
  @Prop({ type: Array }) items!: FaqBlock[]
}
</script>
