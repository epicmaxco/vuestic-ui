<template>
  <div class="base-layout">
    <div class="base-layout__header">
      <Header v-model:is-sidebar-visible="isSidebarVisible" />
    </div>
    <main id="base-layout" class="base-layout__main">
      <Sidebar v-model:visible="isSidebarVisible" :navigationRoutes="navigationRoutes" :mobile="isSmallScreenDevice" />
      <div
        class="base-layout__content"
        :class="{ 'base-layout__content--expanded': !isSidebarVisible }"
        ref='page-content'
      >
<!--        <va-breadcrumbs-->
<!--          align="left"-->
<!--          color="secondary"-->
<!--          class="base-layout__breadcrumbs"-->
<!--        >-->
<!--          <va-breadcrumbs-item-->
<!--            v-for="(crumb, index) in crumbs"-->
<!--            :key="index"-->
<!--            :label="crumb.label"-->
<!--            :to="crumb.path"-->
<!--            :disabled="crumb.disabled"-->
<!--            :style="{ color: 'gray' }"-->
<!--          />-->
<!--          <template #separator>-->
<!--            <va-icon name="arrow_forward_ios" :size="16"/>-->
<!--          </template>-->
<!--        </va-breadcrumbs>-->

        <div class="layout va-gutter-5 pb-6">
          <router-view />
        </div>
      </div>
    </main>
  </div>
</template>

<script lang="ts">
// @ts-nocheck
import { provide, reactive, watch } from 'vue'
import { Options, Vue, setup } from 'vue-class-component'
import type { RouteLocationNormalized } from 'vue-router'
import Sidebar from '../components/sidebar/Sidebar.vue'
import Header from '../components/header/Header.vue'
import { COLOR_THEMES, ThemeName } from '../config/theme-config'
import { useColors } from '../../../ui/src/main'
import { navigationRoutes } from '../components/sidebar/navigationRoutes'
import { debounce } from 'lodash'
import { getSortedNavigationRoutes } from '../helpers/NavigationRoutesHelper'

@Options({
  name: 'DocsDefaultLayout',
  components: {
    Header,
    Sidebar,
  },
})
export default class DocsLayout extends Vue {
  data () {
    return {
      isSidebarVisible: true,
      isSmallScreenDevice: false,
    }
  }

  contextConfig = setup(() => {
    const contextConfig = reactive({
      gradient: true,
      shadow: 'lg',
      invertedColor: false,
    })

    provide('contextConfig', contextConfig)

    return contextConfig
  })

  created () {
    watch(() => (this as any).$route, this.onRouteChange)
    this.$root.eventBus.$on('changeTheme', this.changeTheme)
  }

  mounted () {
    if (this.$route.hash) {
      const el = document.querySelector(this.$route.hash)

      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' })
      }
    }

    const smScreenSize = 768

    this.isSmallScreenDevice = window.innerWidth <= smScreenSize

    const onResizeDebounce = debounce(() => {
      this.isSmallScreenDevice = window.innerWidth <= smScreenSize

      this.isSidebarVisible = !this.isSmallScreenDevice
    }, 500)
    window.addEventListener('resize', () => onResizeDebounce())

    this.isSidebarVisible = !this.isSmallScreenDevice
  }

  get navigationRoutes () {
    return getSortedNavigationRoutes(navigationRoutes)
  }

  beforeDestroy () {
    this.$root.eventBus.$off('changeTheme', this.changeTheme)
  }

  changeTheme (themeName) {
    // useColors().setColors(COLOR_THEMES[themeName] || COLOR_THEMES[ThemeName.DEFAULT])
  }

  // get crumbs () {
  //   // if (this.$isServer) {
  //   //   return []
  //   // }
  //   if (this.$route.path === '/') {
  //     return [
  //       {
  //         label: 'Home',
  //         path: `/${this.$root.$i18n.locale}/`,
  //       },
  //     ]
  //   }
  //   const pathSteps: string[] = this.$route.path.split('/').filter(Boolean)
  //   return pathSteps.reduce((acc, step, index, array) => {
  //     if (index === 0) {
  //       acc.push({
  //         label: 'Home',
  //         path: `/${this.$root.$i18n.locale}/`,
  //       })
  //       return acc
  //     }
  //     if (!step && index) {
  //       return acc
  //     }
  //     const isCategoryRoute = this.navigationRoutes.find(route => route.name === step)
  //     acc.push({
  //       path: '/' + array.slice(0, index + 1).join('/'),
  //       label: step,
  //       disabled: !!isCategoryRoute,
  //     })
  //     return acc
  //   }, [] as { [key: string]: string, }[])
  // }

  onRouteChange (newRoute: RouteLocationNormalized, oldRoute: RouteLocationNormalized) {
    if (newRoute.path === oldRoute.path && newRoute.hash) {
      const el = document.querySelector(newRoute.hash)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' })
        return
      }
    }

    if (newRoute.path !== oldRoute.path && newRoute.hash) {
      this.$nextTick(() => {
        const el = document.querySelector(newRoute.hash)
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' })
        }
      })
    }

    const pageContent: Element | undefined = this.$refs['page-content']

    if (pageContent) {
      pageContent.scrollTop = 0
    }
  }
}
</script>

<style lang="scss">
@import '../../../ui/src/styles/resources';

html {
  font-family: $font-family-sans-serif;
  color: var(--va-on-background-primary);
  font-size: $font-size-root;
}

a:not(.va-button, .va-sidebar__item):focus-visible {
  @include focus-outline;
}

.base-layout {
  height: 100vh;
  position: fixed;
  width: 100%;
  display: flex;
  flex-direction: column;
  flex-grow: 2;
  overflow: hidden;
  z-index: 0;

  &__breadcrumbs {
    text-transform: capitalize;
    margin-top: 1.5em;
    margin-bottom: 1.5em;
    justify-content: flex-start;
  }

  .va-sidebar {
    flex-grow: 20rem;
  }

  &__main {
    display: flex;
    flex-direction: row;
    height: 100%;
    position: relative;
    // Need to use flex-grow and overflow hidden to resize `main` to remaining height.
    flex-grow: 2;
    overflow: hidden;
    z-index: 0;
  }

  &__header {
    z-index: 1;
  }

  &__content {
    height: 100%;
    width: 100%;

    &--expanded {
      margin-left: 0;
    }

    padding: 2em;
    padding-top: 0;
    overflow-y: auto;
    overflow-x: hidden;

    @include va-scroll(var(--va-primary));

    & > .layout.va-gutter-5 {
      padding-bottom: 2rem;
    }

    @media (max-width: 670px) {
      & > .layout.va-gutter-5 {
        padding: 0;
        padding-bottom: 2rem;
      }
    }
  }
}
</style>
