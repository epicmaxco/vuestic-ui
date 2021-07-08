<template>
  <a :id="anchor" :style="{ color: colors.primary }" :href="`#${anchor}`"> #</a>
</template>
<script lang='ts'>
// @ts-nocheck
import { kebabCase } from 'lodash'
import { TranslationString } from 'vuestic-ui/src/services/api-docs/ManualApiOptions'
import { Options, Vue, mixins, prop } from 'vue-class-component'
import { getColors } from '../../../ui/src/main'

class Props {
  text = prop<TranslationString>({ type: String })
}

const PropsMixin = Vue.with(Props)

@Options({
  name: 'DocsAnchor',
})
export default class DocsAnchor extends mixins(PropsMixin) {
  get anchor () {
    return kebabCase(this.text)
  }

  get colors () {
    return getColors()
  }
}
</script>
