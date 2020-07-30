<template>
  <form id="search-form">
    <input id="algolia-search-input">
  </form>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
@Component({
  name: 'VaSearch',
})
export default class VaSearch extends Vue {
  initialize () {
    Promise.all([
      // @ts-ignore
      import(/* webpackChunkName: "docsearch" */ 'docsearch.js/dist/cdn/docsearch.min.js'),
      // @ts-ignore
      import(/* webpackChunkName: "docsearch" */ 'docsearch.js/dist/cdn/docsearch.min.css'),
    ]).then(([docsearch]) => {
      docsearch = docsearch.default
      docsearch(Object.assign({
        appId: 'BH4D9OD16A',
        apiKey: '85cc3221c9f23bfbaa4e3913dd7625ea',
        indexName: 'vuejs',
      }, {
        inputSelector: '#algolia-search-input',
        debug: true,
      }))
    })
  }

  mounted () {
    this.initialize()
  }
}
</script>
