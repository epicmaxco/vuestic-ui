<template>
  <a
    :id="anchor"
    :style="{ color: primary }"
    :href="`#${anchor}`"
  >#</a>
</template>
<script lang='ts'>
import { defineComponent, PropType, computed } from 'vue'
import { kebabCase } from 'lodash'
import { TranslationString } from '../components/DocsApi/ManualApiOptions'
import { useColors } from '../../../ui/src/main'

export default defineComponent({
  name: 'DocsAnchor',
  props: {
    text: { type: String as PropType<TranslationString> },
  },
  setup: (props) => {
    const { getColor } = useColors()

    return {
      anchor: computed(() => kebabCase(props.text)),
      primary: computed(() => getColor('primary', undefined, true)),
    }
  },
})
</script>
