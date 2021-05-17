<template>
  <docs-content :config="configComputed"/>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import DocsContent from '../../components/DocsContent.vue'
import navbarConfig from '../../components/page-configs/ui-elements/va-navbar/page-config'

@Options({
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
