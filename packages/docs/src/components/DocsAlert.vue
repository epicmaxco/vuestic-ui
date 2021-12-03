<template>
  <div class="docs-alert my-3">
    <va-alert :color="color">
      <MarkdownView tag="span" inline :value="$tie(text)" />
    </va-alert>
  </div>
</template>

<script lang="ts">
import { Options, Vue, mixins, prop } from 'vue-class-component'
import MarkdownView from './markdown-view/MarkdownView.vue'
import { TranslationString } from '../components/DocsApi/ManualApiOptions'

class Props {
  text = prop<TranslationString>({ type: String })
  color = prop<string>({ type: String, default: 'info' })
}

const PropsMixin = Vue.with(Props)

@Options({
  name: 'DocsAlert',
  components: { MarkdownView },
})
export default class DocsAlert extends mixins(PropsMixin) {

}
</script>
