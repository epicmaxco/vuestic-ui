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
// @ts-nocheck
import withLayout from '@/components/withLayout'
import { Options, Vue } from 'vue-class-component'
import Header from '@/components/landing/Header.vue'
import Preview from '@/components/landing/Preview.vue'
import Admin from '@/components/landing/Admin.vue'
import Footer from '@/components/landing/Footer.vue'
import OpenSource from '@/components/landing/OpenSource.vue'
import Seamless from '@/components/landing/Seamless.vue'
import Customize from '@/components/landing/Customize.vue'
import { COLOR_THEMES, ThemeName } from '../theme-config'

@Options({
  components: {
    Header,
    Preview,
    Footer,
    OpenSource,
    Admin,
    Seamless,
    Customize,
  },
} as any)
class Landing extends Vue {
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
    // this.$root.$on('changeTheme', this.setTheme)
  }

  mounted () {
    if (this.$route.hash) {
      document.querySelector(this.$route.hash).scrollIntoView()
    }
  }

  beforeUnmount () {
    // this.$root.$off('changeTheme', this.setTheme)
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

export default withLayout(Landing, 'landing')
</script>

<style lang="scss">
@import "vuestic-ui-dev/src/components/vuestic-sass/resources/resources.scss";
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
