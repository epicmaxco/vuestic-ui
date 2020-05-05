<template>
<h3>
  {{ $t(text) }}
  <a :id="anchor" :style="{ color: primaryColor }" :href="`#${anchor}`">#</a>
</h3>
</template>
<script>
import { kebabCase } from 'lodash'

export default {
  props: {
    text: {
      type: String,
    },
  },
  computed: {
    anchor () {
      return kebabCase(this.$t(this.text))
    },
    primaryColor () {
      return this.$themes?.primary
    },
  },
}
</script>
