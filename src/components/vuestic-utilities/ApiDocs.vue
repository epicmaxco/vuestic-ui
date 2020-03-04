<template>
  <div class="ApiDocs" />
</template>

<script>
import Vue from 'vue'
import { convertComponentToApiDocs } from './api-docs-helpers'

export default {
  name: 'ApiDocs',
  created () {
    const apiDocs = convertComponentToApiDocs(this.componentOptions)
    console.log('apiDocs', apiDocs)
  },
  props: {
    componentOptions: {
      required: true,
    },
  },
}
</script>

<style lang="scss">
.ApiDocs {

}
</style>
