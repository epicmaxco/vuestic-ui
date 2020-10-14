<template>
<div class="landing">
  <Header />
  <div class="layout">
    gdsgsdg
  </div>
</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Header from '../../docs/components/landing/Header.vue'

@Component({
  components: {
    Header,
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

.layout {
  padding-top: 4.5rem;
}
</style>
