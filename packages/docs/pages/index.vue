<template>
<div>

  <Header :isSidebarVisible.sync="isSidebarVisible"/>
  <div style="padding-top: 64px; display: flex; flex-direction: row;">
    <Sidebar v-if="isSidebarVisible"/>
    <div>
      <va-breadcrumbs align="left" active-color="primary">
        <va-breadcrumbs-item v-for="(crumb, index) in crumbs" :label="crumb.label" :to="crumb.path" :key="index"></va-breadcrumbs-item>
      </va-breadcrumbs>
      <div>
        <dynamic-template :block="block">
        </dynamic-template>
      </div>
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
import DynamicTemplate from '../components/dynamic-template/DynamicTemplate.vue'

export default Vue.extend({
  components: {
    VaBreadcrumbsItem,
    VaBreadcrumbs,
    Header,
    Sidebar,
    DynamicTemplate
  },
  data() {
    return {
      isSidebarVisible: true,
      block: {
        component: "div",
        text: 'Parent block text',
        style: 'font-weight: bold;',
        children: [
          {
            component: "p",
            text: 'child block text',
            style: 'font-style: italic; color: red;'
          }
        ]
      }
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
  @import '../../ui/src/components/vuestic-sass/global/reset.scss';
  // @import '../../ui/src/components/vuestic-sass/icons/icons.scss';
</style>
