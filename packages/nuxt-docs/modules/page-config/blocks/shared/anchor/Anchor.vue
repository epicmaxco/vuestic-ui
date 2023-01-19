<template>
  <a
    :id="anchor"
    :style="{ color: primary }"
    :href="`#${anchor}`"
  >#</a>
</template>

<script lang='ts'>
import { defineComponent, computed } from 'vue'
import { kebabCase } from 'lodash'
import { useColors } from 'vuestic-ui'

export default defineComponent({
  props: {
    text: { type: String },
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
