<template>
  <div>
    <dynamic-template
      v-for="(block, index) in config"
      :key="index"
      :block="block"
    />
  </div>
</template>

<script>
import DynamicTemplate from '../../components/dynamic-template/DynamicTemplate'
import config from './faqConfig'

export default {
  components: {
    DynamicTemplate,
  },
  computed: {
    config () {
      return config
    },
  },
}
</script>
