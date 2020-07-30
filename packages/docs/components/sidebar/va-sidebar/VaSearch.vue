<template>
  <form id="search-form">
    <va-icon
      name="search"
      size="100%"
      color="#8496A5"
    />
    <input id="algolia-search-input" placeholder="Search...">
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

<style lang="scss">
#search-form {
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;

  #algolia-search-input {
    display: block;
    background: none;
    border: none;
    font-family: Source Sans Pro;
    font-size: 100%;
    width: 100%;
    padding-left: 0.2rem;
  }

  .ds-dropdown-menu {
    &::before {
      display: none;
    }

    .ds-dataset-1 {
      position: fixed;
      border: none;
      box-shadow: 0 2px 8px rgba(122, 139, 173, 0.2);
      border-radius: 4px;
    }
  }
}
</style>
