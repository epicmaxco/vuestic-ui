<template>
  <div>
    <DocsFaq :items="config"/>
  </div>
</template>

<script>
import DocsFaq from '../../components/DocsFaq'
import config from './faqConfig'

export default {
  components: {
    DocsFaq,
  },
  computed: {
    config () {
      return config
    },
  },
}
</script>
