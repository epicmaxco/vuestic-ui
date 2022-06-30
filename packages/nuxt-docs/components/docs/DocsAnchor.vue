<template>
  <a
    :id="anchor"
    :style="{ color: colors.primary }"
    :href="`#${anchor}`"
  > #</a>
</template>
<script lang='ts'>
import { defineComponent, PropType, computed } from 'vue'
import { TranslationString } from '~~/types/translations'
import { getColors } from 'vuestic-ui'
import kebabCase from 'lodash/kebabCase.js'

export default defineComponent({
  name: 'DocsAnchor',
  props: {
    text: { type: String as PropType<TranslationString> },
  },
  setup: (props) => ({
    anchor: computed(() => kebabCase(props.text)),
    colors: computed(() => getColors()),
  }),
})
</script>
