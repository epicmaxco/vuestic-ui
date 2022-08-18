<template>
  <form id="search-form">
    <div id="docsearch" />
  </form>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'

import '@docsearch/css'

@Options({
  name: 'Search',
})
export default class Search extends Vue {
  initialize () {
    Promise.all([
      import(/* webpackChunkName: "docsearch" */ '@docsearch/js'),
    ]).then(([{ default: docsearch }]) => {
      docsearch({
        container: '#docsearch',
        appId: 'DVNV64RN9R',
        indexName: 'vuestic',
        apiKey: 'cd8e70cb466bf6df138543a38c33ea5e',
        // TODO in dev mode transform url to localhost
        // transformItems (items) {
        //   return items.map((item) => {
        //     console.log(item)
        //     return item
        //   })
        // },
      })
    })
  }

  mounted () {
    this.initialize()
  }
}
</script>

<style lang="scss">

@import '~vuestic-ui/src/styles/index.scss';
@import '@/assets/smart-grid.scss';

#search-form {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  z-index: 1;

  #docsearch {
    flex-grow: 1;
    display: flex;
  }

  .DocSearch-Button {
    margin-left: 0;
    flex-grow: 1;
    max-width: 320px;
  }

  .DocSearch-Button-Placeholder {
    @media (max-width: 768px) {
      display: block;
    }
    //@include xs(display, none);
    @media (max-width: 480px) {
      display: block;
    }
  }

  .DocSearch-Button-Keys {
    @media (max-width: 768px) {
      display: flex;
    }

    @include xs(display, none);
  }
}
</style>
