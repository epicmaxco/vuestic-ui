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
        <div class="va-breadcrumbs base-layout__breadcrumbs">
          <span v-for="(crumb, index) in crumbs" class="va-breadcrumb-item" :key="index">
            <router-link
              class="va-breadcrumb-item__label va-breadcrumb-item__label--link"
              :to="crumb.path"
              :style="{ color: 'gray' }"
            >
              {{ crumb.label }}
            </router-link>
            <span v-if="index < crumbs.length - 1" class="va-breadcrumbs__separator">
              <va-icon name="arrow_forward_ios" :size="16" />
            </span>
          </span>
        </div>

        <!-- <va-breadcrumbs
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
        </va-breadcrumbs> -->
        <div class="layout gutter--xl">
          <router-view />
        </div>
      </div>
    </main>
  </div>
</template>

<script lang="ts">
// @ts-nocheck
import { provide } from 'vue'
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
      // only default theme guaranteed to work
      contextConfig: {
        gradient: true,
        shadow: 'lg',
        invertedColor: false,
      },
    }
  }

  provide () {
    return {
      contextConfig: this.contextConfig,
    }
  }

  created () {
    this.$root.eventBus.$on('changeTheme', this.setTheme)
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
    this.$root.eventBus.$off('changeTheme', this.setTheme)
  }

  setTheme = setup(() => {
    const { setTheme } = { ...useTheme() }

    return themeName => setTheme(COLOR_THEMES[themeName] || COLOR_THEMES[ThemeName.DEFAULT])
  })

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
@import "vuestic-ui-dev/src/components/vuestic-sass/resources/resources.scss";
@import "@/assets/main";

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
