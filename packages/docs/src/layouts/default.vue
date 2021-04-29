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
        <va-breadcrumbs
          align="left"
          color="gray"
          class="base-layout__breadcrumbs"
        >
          <va-breadcrumbs-item
            v-for="(crumb, index) in crumbs"
            :key="index"
            :label="crumb.label"
            :to="crumb.path"
            :style="{ color: 'gray' }"
          />
          <template #separator>
            <va-icon name="arrow_forward_ios" :size="16" />
          </template>
        </va-breadcrumbs>

        <div class="layout gutter--xl">
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
import Sidebar from '../components/sidebar/Sidebar.vue'
import Header from '../components/header/Header.vue'
import { COLOR_THEMES, ThemeName } from '../config/theme-config'
import { setColors } from '../../../ui/src/main'
import { navigationRoutes } from '../components/sidebar/navigationRoutes'
import { debounce } from 'lodash'

@Options({
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
      document.querySelector(this.$route.hash).scrollIntoView()
    }

    this.isSmallScreenDevice = window.innerWidth <= 575

    const onResizeDebounce = debounce(() => { this.isSmallScreenDevice = window.innerWidth <= 575 }, 500)
    window.addEventListener('resize', () => onResizeDebounce())

    this.isSidebarVisible = !this.isSmallScreenDevice
  }

  get navigationRoutes () {
    // ToDO: normalize navigation routes with better structure. This sort is temporary solution
    const routes = JSON.parse(JSON.stringify(navigationRoutes))
    const uiElementsIndex = routes.findIndex(route => route.name === 'ui-elements')
    const uiElements = routes.find(route => route.name === 'ui-elements').children
    let result = []
    let nextCategoryIndex
    // Sort elements alphabetically
    do {
      let tempArr = []
      const tempCategoryName = uiElements[0].category
      delete uiElements[0].category
      nextCategoryIndex = uiElements.findIndex(element => element.category)
      if (nextCategoryIndex !== -1) {
        tempArr = uiElements.slice(0, nextCategoryIndex).sort((a, b) => a.name.localeCompare(b.name))
      } else {
        tempArr = uiElements.slice(0, uiElements.length).sort((a, b) => a.name.localeCompare(b.name))
      }
      tempArr[0].category = tempCategoryName
      result = [...result, ...tempArr]
      uiElements.splice(0, nextCategoryIndex)
    } while (uiElements.length && nextCategoryIndex !== -1)

    routes[uiElementsIndex].children = result
    return routes
  }

  beforeDestroy () {
    this.$root.eventBus.$off('changeTheme', this.changeTheme)
  }

  changeTheme (themeName) {
    setColors(COLOR_THEMES[themeName] || COLOR_THEMES[ThemeName.DEFAULT])
  }

  get crumbs () {
    // if (this.$isServer) {
    //   return []
    // }
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
    return pathSteps.reduce((acc, step, index, array) => {
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
    }, [] as { [key: string]: string, }[])
  }

  onRouteChange () {
    const pageContent: Element | undefined = this.$refs['page-content']

    pageContent.scrollTop = 0

    if (pageContent) { pageContent.scrollTop = 0 }
  }
}
</script>

<style lang="scss">
@import "src/assets/main";

html {
  font-family: $font-family-sans-serif;
  color: #1b1a1f;
  font-size: $font-size-root;
}

.base-layout {
  height: 100vh;
  position: fixed;
  width: 100%;
  display: flex;
  flex-direction: column;
  flex-grow: 2;

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
    z-index: 2;
    background-color: #ffffff;
  }

  &__content {
    height: 100%;
    width: 100%;

    &--expanded {
      margin-left: 0;
    }

    padding: 2em;
    padding-top: 0;

    & > :last-child {
      padding-bottom: 2em;
    }

    overflow-y: auto;
    overflow-x: hidden;
  }
}
</style>
