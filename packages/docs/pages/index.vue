<template>
  <div class="base-layout">
    <Header :isSidebarVisible.sync="isSidebarVisible"/>
    <div class="base-layout__main">
      <Sidebar v-if="isSidebarVisible"/>
      <div class="base-layout__content">
        <va-breadcrumbs align="left" active-color="primary">
          <va-breadcrumbs-item v-for="(crumb, index) in crumbs" :label="crumb.label" :to="crumb.path" :key="index"></va-breadcrumbs-item>
        </va-breadcrumbs>
        <div>
          <nuxt-child></nuxt-child>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
// @ts-nocheck
import Vue from 'vue'
import Header from "../components/header/Header.vue"
import Sidebar from "../components/sidebar/Sidebar.vue"
import VaBreadcrumbs from 'vuestic-ui/src/components/vuestic-components/va-breadcrumbs/VaBreadcrumbs.vue'
import VaBreadcrumbsItem from 'vuestic-ui/src/components/vuestic-components/va-breadcrumbs/VaBreadcrumbsItem.vue'

export default Vue.extend({
  components: {
    VaBreadcrumbsItem,
    VaBreadcrumbs,
    Header,
    Sidebar,
  },
  data() {
    return {
      isSidebarVisible: true,
    }
  },
  computed: {
    crumbs() {
      if (this.$isServer) {
        return []
      }
      // @ts-ignore
      const pathSteps: string[] = this.$route.path === '/' ? [''] : this.$route.path.split('/')
      return pathSteps.reduce((acc, step, index, array) => {
        switch (true) {
          case !index:
            acc.push({
              label: 'Home',
              path: '/'
            })
            break;
          case !step && index:
            break;
          default:
            acc.push({path: array.slice(0, index).join('/'), label: step})
            break;
        }
        return acc
      }, [] as {[key: string]: string}[])
    }
  }

})
</script>
<style lang="scss">
  @import 'vuestic-ui/src/components/vuestic-sass/global/reset.scss';
  @import 'vuestic-ui/src/components/vuestic-sass/icons/icon-fonts/icon-fonts.scss';

  .base-layout {
    min-height: 100vh;
    &__main {
      padding-top: 64px;
      display: flex;
      flex-direction: row;
      min-height: 100vh
    }
    &__content {
      padding: 15px;
      width: 100%;
    }
  }
</style>
