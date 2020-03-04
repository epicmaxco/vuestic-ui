<template>
  <div class="ApiDocs">
    <pre>{{ componentProps }}</pre>
  </div>
</template>

<script>
import Vue from 'vue'

export default {
  name: 'ApiDocs',
  props: {
    componentOptions: {
      required: true,
    },
  },
  computed: {
    componentProps () {
      console.log('this.componentOptions', this.componentOptions)
      const testComponentInstance = new (Vue.extend(this.componentOptions))()
      console.log('testComponentInstance', testComponentInstance)
      return testComponentInstance.$options.props
    },
  },
}
</script>

<style lang="scss">
.ApiDocs {

}
</style>
