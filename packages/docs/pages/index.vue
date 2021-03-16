<template>
<div class="landing">
  <div class="preview-wrapper">
    <Header />
    <Preview />
  </div>
  <Seamless />
  <Customize />
  <OpenSource />
  <Admin />
  <Footer />

</div>
</template>

<script lang="ts">
import { Component, Vue, Provide } from 'vue-property-decorator'
import Header from '../../docs/components/landing/Header.vue'
import Preview from '../../docs/components/landing/Preview.vue'
import Admin from '../../docs/components/landing/Admin.vue'
import Footer from '../../docs/components/landing/Footer.vue'
import OpenSource from '../../docs/components/landing/OpenSource.vue'
import Seamless from '../../docs/components/landing/Seamless.vue'
import Customize from '../../docs/components/landing/Customize.vue'
import { COLOR_THEMES, ThemeName } from '../theme-config'

@Component({
  layout: 'landing',
  components: {
    Header,
    Preview,
    Admin,
    Footer,
    OpenSource,
    Seamless,
    Customize,
  },
} as any)
export default class Landing extends Vue {
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
    this.$root.$on('changeTheme', this.setСolors)
  }

  mounted () {
    if (this.$route.hash) {
      document.querySelector(this.$route.hash).scrollIntoView()
    }
  }

  beforeUnmount () {
    this.$root.$off('changeTheme', this.setСolors)
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
@import "vuestic-ui/src/components/vuestic-sass/resources/resources.scss";
@import "./../assets/main";

.landing {
  font-family: Source Sans Pro;
}

.preview-wrapper {
  background-image: url("../assets/landing/images/pattern.svg");
  background-size: unset;
  background-repeat: no-repeat;
  background-position: top;
}
</style>
