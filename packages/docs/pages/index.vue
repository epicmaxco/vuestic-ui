<template>
<div>

  <Header :isSidebarVisible.sync="isSidebarVisible"/>
  <div style="padding-top:64px; display: flex; flex-direction: row;">
    <Sidebar v-if="isSidebarVisible"/>
    <div>
      <va-breadcrumbs align="left" active-color="primary">
        <va-breadcrumbs-item v-for="(crumb, index) in crumbs" :label="crumb.label" :to="crumb.path" :key="index"></va-breadcrumbs-item>
      </va-breadcrumbs>
      <nuxt-child></nuxt-child>
    </div>
  </div>
</div>
</template>

<script lang="ts">
import Vue from 'vue'
import Header from "../components/header/Header.vue"
import Sidebar from "../components/sidebar/Sidebar.vue"
import VaBreadcrumbs from '../../ui/src/components/vuestic-components/va-breadcrumbs/VaBreadcrumbs.vue'
import VaBreadcrumbsItem from '../../ui/src/components/vuestic-components/va-breadcrumbs/VaBreadcrumbsItem.vue'

export default Vue.extend({
  components: {
    VaBreadcrumbsItem,
    VaBreadcrumbs,
    Header,
    Sidebar
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
      const pathSteps = location.pathname.split('/')
      return pathSteps.reduce((acc, step, index) => {
        switch (true) {
          case !index:
            break;
          case !step:
            acc.push({
              label: 'Home',
              path: '/'
            })
            break;
          default:
            acc.push({path: pathSteps.slice(0, index).join('/'), label: step})
            break;
        }
        return acc
      }, [] as {[key: string]: string}[])
    }
  }
  
})
</script>
<style lang="scss">
  @import '../../ui/src/components/vuestic-sass/global/reset.scss';
</style>