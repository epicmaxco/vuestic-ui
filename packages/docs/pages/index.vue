<template>
  <div class="base-layout">
    <Header :isSidebarVisible.sync="isSidebarVisible" class="base-layout__header" />
    <div class="base-layout__main">
      <Sidebar v-if="isSidebarVisible" />
      <div
        class="base-layout__content"
        :class="{'base-layout__content--expanded': !isSidebarVisible} "
      >
        <va-breadcrumbs align="left" separator=">" color="gray" class="base-layout__breadcrumbs">
          <va-breadcrumbs-item
            v-for="(crumb, index) in crumbs"
            :label="crumb.label"
            :to="crumb.path"
            :key="index"
            :style="{color: 'gray'}"
          ></va-breadcrumbs-item>
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
import Vue from "vue";
import Header from "../components/header/Header.vue";
import Sidebar from "../components/sidebar/Sidebar.vue";
import VaBreadcrumbs from "vuestic-ui/src/components/vuestic-components/va-breadcrumbs/VaBreadcrumbs.vue";
import VaBreadcrumbsItem from "vuestic-ui/src/components/vuestic-components/va-breadcrumbs/VaBreadcrumbsItem.vue";

export default Vue.extend({
  components: {
    VaBreadcrumbsItem,
    VaBreadcrumbs,
    Header,
    Sidebar
  },
  data() {
    return {
      isSidebarVisible: true
    };
  },
  mounted() {
    if (this.$route.hash) {
      document.querySelector(this.$route.hash).scrollIntoView();
    }
  },
  computed: {
    crumbs() {
      if (this.$isServer) {
        return [];
      }
      // @ts-ignore
      const pathSteps: string[] =
        this.$route.path === "/" ? [""] : this.$route.path.split("/");
      return pathSteps.reduce((acc, step, index, array) => {
        switch (true) {
          case !index:
            acc.push({
              label: "Home",
              path: "/"
            });
            break;
          case !step && index:
            break;
          default:
            acc.push({ path: array.slice(0, index).join("/"), label: step });
            break;
        }
        return acc;
      }, [] as { [key: string]: string }[]);
    }
  }
});
</script>
<style lang="scss">
@import "vuestic-ui/src/components/vuestic-sass/global/reset.scss";
@import "vuestic-ui/src/components/vuestic-sass/icons/icon-fonts/icon-fonts.scss";
@import "vuestic-ui/src/components/vuestic-sass/icons/icon-fonts/vuestic-icons/vuestic-icons.scss";
@import "vuestic-ui/src/components/vuestic-sass/resources/resources";

* {
  font-family: Source Sans Pro, sans-serif;
}

.base-layout {
  height: 100vh;
  position: fixed;
  &__breadcrumbs {
    text-transform: capitalize;
  }
  &__main {
    display: flex;
    flex-direction: row;
    min-height: $sidebar-viewport-min-height;
    height: $sidebar-viewport-height;
    margin-top: 64px;
    overflow-y: auto;
  }
  &__header {
    z-index: 1;
    background-color: #fff;
  }
  &__content {
    margin-left: 300px;
    height: 100%;
    &--expanded {
      margin-left: 0;
    }
    padding: 15px;
    width: 100%;
  }
}
.va-content,
.va-breadcrumbs {
  font-family: Source Sans Pro, sans-serif;
  font-size: 16px;
}
</style>
