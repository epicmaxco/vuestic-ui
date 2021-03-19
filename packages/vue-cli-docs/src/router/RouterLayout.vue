<template>
  <component v-if="layout" :is="layout" />
</template>

<script>
import layouts from '@/layouts'

export default {
  computed: {
    layout () {
      const layoutName = this.$route.matched.reduceRight((result, { meta }) => meta.layout ?? result, 'default')

      return layouts[layoutName]
    },
  },
}
</script>
