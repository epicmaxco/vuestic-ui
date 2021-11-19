<template>
  <docs-content :config="configComputed" />
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import DocsContent from '../../components/DocsContent.vue'
import navbarConfig from '../../page-configs/ui-elements/navbar/page-config'

@Options({
  name: 'DocsNavbar',
  components: {
    DocsContent,
  },
})
export default class Navbar extends Vue {
  get configComputed () {
    return navbarConfig
  }
}
</script>
