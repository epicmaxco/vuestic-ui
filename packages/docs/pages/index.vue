<template>
  <div class="base-layout">
    <Header :is-sidebar-visible.sync="isSidebarVisible" class="base-layout__header" />
    <div class="base-layout__main">
      <Sidebar v-if="isSidebarVisible" :minimized="!isSidebarVisible" />
      <!-- TODO: remove v-if when icon handling for sidebar is implemented -->
      <div
        class="base-layout__content"
        :class="{'base-layout__content--expanded': !isSidebarVisible} "
      >
        <va-breadcrumbs align="left" separator=">" color="gray" class="base-layout__breadcrumbs">
          <va-breadcrumbs-item
            v-for="(crumb, index) in crumbs"
            :key="index"
            :label="crumb.label"
            :to="crumb.path"
            :style="{color: 'gray'}"
          />
        </va-breadcrumbs>
        <div>
          <nuxt-child />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
// @ts-nocheck
import VaBreadcrumbs from 'vuestic-ui/src/components/vuestic-components/va-breadcrumbs/VaBreadcrumbs.vue'
import VaBreadcrumbsItem from 'vuestic-ui/src/components/vuestic-components/va-breadcrumbs/VaBreadcrumbsItem.vue'
import { Component, Vue, Provide } from 'vue-property-decorator'
import Sidebar from '../components/sidebar/Sidebar.vue'
import Header from '../components/header/Header.vue'
import { COLOR_THEMES, ThemeName } from '../themeConfig.ts'

@Component({
  components: {
    VaBreadcrumbsItem,
    VaBreadcrumbs,
    Header,
    Sidebar,
  },
})
export default class Index extends Vue {
  data () {
    return {
      isSidebarVisible: true,
      // only default theme guaranteed to work
      contextConfig: {
        gradient: true,
        shadow: 'lg',
        invertedColor: false,
      },
    }
  }

  @Provide() contextConfig = this.contextConfig

  created () {
    this.$root.$on('change-theme', this.setTheme.bind(this))
  }

  mounted () {
    if (this.$route.hash) {
      document.querySelector(this.$route.hash).scrollIntoView()
    }
  }

  beforeDestroy () {
    this.$root.$off('change-theme', this.setTheme.bind(this))
  }

  setTheme (themeName) {
    Object.assign(
      this.$themes,
      COLOR_THEMES[themeName] || COLOR_THEMES[ThemeName.DEFAULT],
    )
  }

  get crumbs () {
    if (this.$isServer) {
      return []
    }
    // @ts-ignore
    if (this.$route.path === '/') {
      return [
        {
          label: 'Home',
          path: `/${this.$root.$i18n.locale}/`,
        },
      ]
    }
    const pathSteps: string[] = this.$route.path.split('/').filter(Boolean)
    return pathSteps.reduce(
      (acc, step, index, array) => {
        switch (true) {
          case !index:
            acc.push({
              label: 'Home',
              path: `/${this.$root.$i18n.locale}/`,
            })
            break
          case !step && index:
            break
          default:
            acc.push({
              path: '/' + array.slice(0, index + 1).join('/'),
              label: step,
            })
            break
        }
        return acc
      },
      [] as { [key: string]: string, }[],
    )
  }
}
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
    background-color: #ffffff;
  }

  &__content {
    margin-left: 250px;
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
  h1 {
    margin-top: 2.25rem;
  }

  font-family: Source Sans Pro, sans-serif;
  font-size: 16px;
}
</style>
