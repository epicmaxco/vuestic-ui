<template>
  <div class="base-layout">
    <Header
      v-model:is-sidebar-visible="isSidebarVisible"
      class="base-layout__header"
    />
    <main id="base-layout" class="base-layout__main">
      <Sidebar :minimized="isSidebarVisible" :navigationRoutes="navigationRoutes" />
      <div
        class="base-layout__content"
        :class="{ 'base-layout__content--expanded': !isSidebarVisible }"
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
import { provide, reactive } from 'vue'
import { Options, Vue, setup } from 'vue-class-component'
import Sidebar from '../components/sidebar/Sidebar.vue'
import Header from '../components/header/Header.vue'
import { COLOR_THEMES, ThemeName } from '../theme-config'
import { useTheme } from 'vuestic-ui'
import { navigationRoutes } from '../components/sidebar/navigationRoutes'

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
    this.$root.eventBus.$on('changeTheme', this.changeTheme)
  }

  mounted () {
    if (this.$route.hash) {
      document.querySelector(this.$route.hash).scrollIntoView()
    }
  }

  get navigationRoutes () {
    return navigationRoutes
  }

  beforeDestroy () {
    this.$root.eventBus.$off('changeTheme', this.changeTheme)
  }

  changeTheme (themeName) {
    this.setСolors(COLOR_THEMES[themeName] || COLOR_THEMES[ThemeName.DEFAULT])
  }

  setTheme = setup(() => {
    const { setTheme } = useTheme()
    return setTheme
  })

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
}
</script>

<style lang="scss">
@import "~vuestic-ui-dev/src/components/vuestic-sass/resources/resources.scss";
@import "~@/assets/main";

html {
  font-family: $font-family-sans-serif;
  color: #1b1a1f;
  font-size: $font-size-root;
}

// body {
//   min-width: $min-body-width;
// }

.base-layout {
  height: 100vh;
  position: fixed;
  width: 100%;

  &__breadcrumbs {
    text-transform: capitalize;
    margin-top: 1.5em;
    margin-bottom: 1.5em;
    justify-content: flex-start;
  }

  &__main {
    display: flex;
    flex-direction: row;
    min-height: $sidebar-viewport-min-height;
    height: $sidebar-viewport-height;
    margin-top: 4rem;

    @include media-breakpoint-down(sm) {
      margin-top: 8rem;
    }

    overflow-y: auto;
    overflow-x: hidden;
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

    padding: 2em;
    padding-top: 0;
    width: 100%;

    & > :last-child {
      padding-bottom: 2em;
    }
  }
}
</style>
