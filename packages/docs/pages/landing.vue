<template>
<div class="landing">
  <div class="preview-wrapper">
  <Header />
  <Preview />
  <div class="layout">
  </div>
  </div>
  <OpenSource />
  <Admin />
  <Footer />

</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Header from '../../docs/components/landing/Header.vue'
import Preview from '../../docs/components/landing/Preview.vue'
import Admin from '../../docs/components/landing/Admin.vue'
import Footer from '../../docs/components/landing/Footer.vue'
import OpenSource from '../../docs/components/landing/OpenSource.vue'

@Component({
  components: {
    Header,
    Preview,
    Admin,
    Footer,
    OpenSource,
  },
})
export default class Landing extends Vue {
}
</script>

<style lang="scss">
@import "vuestic-ui/src/components/vuestic-sass/resources/resources.scss";
@import "./../assets/main";

.landing {
  font-family: Source Sans Pro;
}

.preview-wrapper {
  background-image: url("../assets/landing/images/pattern.png");
  background-size: unset;
  background-repeat: no-repeat;
  background-position: top;
}
</style>
