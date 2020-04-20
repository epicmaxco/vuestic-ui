<template>
  <!-- <div class="sidebar__container">
    <ais-instant-search-ssr :class-names="{'ais-InstantSearch': 'sidebar__search'}">
      <ais-search-box placeholder="Search here…" class="searchbox" />
      <ais-hits :class-names="{'ais-Hits-list': 'hits__list','ais-Hits': 'hits', 'ais-Hits-item': 'hits__item'}">
        <template slot="item" slot-scope="{ item }">
          <nuxt-link class="hist__navlink link" :to="item.to">
            <ais-highlight attribute="label" :hit="item" />
          </nuxt-link>
        </template>
      </ais-hits>
    </ais-instant-search-ssr>
  </div> -->
  <app-sidebar :minimized="false"></app-sidebar>
</template>

<script lang="ts">
// @ts-nocheck
import Vue from "vue";
import AppSidebar from "./app-sidebar/AppSidebar"
import algoliasearch from "algoliasearch/lite";
import "instantsearch.css/themes/algolia-min.css";
import { createInstantSearch } from "vue-instantsearch";

const { instantsearch, rootMixin } = createInstantSearch({
  indexName: "test_index",
  searchClient: algoliasearch("J2UU2HMWPS", "aa1ea0f0fe3c083ee65db19ef6881d50")
});

export default Vue.extend({
  components: {
    AppSidebar
  },
  mixins: [rootMixin],
  async asyncData() {
    await instantsearch.findResultsState({
      query: "",
      distinct: true,
    });
    return {
      algoliaState: instantsearch.getState()
    };
  },
  beforeMount() {
    instantsearch.hydrate(this.algoliaState);
  },
  data() {
    return {
      algoliaState: null,
    };
  }
});
</script>

<style lang="scss">
// is not scoped because can't restyle algolia components even with classes
@import "../../../ui/src/components/vuestic-sass/resources/resources";
@import "../../../ui/src/components/vuestic-sass/global/typography";
.sidebar {
  &__search {
    height: 100%;
    display: flex;
    flex-direction: column;
    .hits {
      flex-grow: 1;
      display: flex;
      &__list {
        width:100%;
        margin: 0;
        display: flex;
        flex-direction: column;
        min-height: 100%;
      }
      &__item {
        box-shadow: none;
        margin: 0;
        border: none;
        width: 100%;
      }
      &__navlink {
        padding: 5px;
        text-decoration: none;
      }
    }
  }
  &__container {
    display: flex;
    align-content: center;
    flex-flow: column nowrap;
    background: #f4f8fa;
    width: 250px;
    min-width: 250px;
  }
}
</style>