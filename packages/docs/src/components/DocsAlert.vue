<template>
  <div class="docs-alert my-3">
    <va-alert :color="color">
      <MarkdownView tag="span" inline :value="$t(text)" />
    </va-alert>
  </div>
</template>

<script lang="ts">
import { Options, Vue, mixins, prop } from 'vue-class-component'
import MarkdownView from '../utilities/markdown-view/MarkdownView.vue'
import { TranslationString } from 'vuestic-ui/src/services/api-docs/ManualApiOptions'

class Props {
  text = prop<TranslationString>({ type: String })
  color = prop<string>({ type: String, default: 'info' })
}

const PropsMixin = Vue.with(Props)

@Options({
  components: { MarkdownView },
})
export default class DocsAlert extends mixins(PropsMixin) {

}
</script>
