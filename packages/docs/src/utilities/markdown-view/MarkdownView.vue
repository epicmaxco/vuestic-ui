<template>
  <component :is="tag" class="MarkdownView" v-html="text" />
</template>

<script lang="ts">
import { Options, Vue, prop, mixins } from 'vue-class-component'
// @ts-ignore
import MarkdownIt from 'markdown-it'
import { useI18n } from 'vue-i18n'
import { setTargetBlankToLinks } from './set-target-blank-to-links'
import { setOriginLocationToRelativeLinks } from './set-origin-location-to-relative-links'

const md = new MarkdownIt({
  breaks: true,
  typographer: true,
  html: true,
})
md.use(setTargetBlankToLinks)
  .use(setOriginLocationToRelativeLinks)

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
    const { locale } = useI18n()
    md.renderer.currentLocale = locale.value

    if (this.inline) {
      return md.renderInline(this.value)
    }
    return md.render(this.value)
  }
}
</script>
<style lang="scss">
@import "~vuestic-ui/src/components/vuestic-sass/resources/resources";

.MarkdownView {
  code {
    color: $markdown-code;
  }
}
</style>
