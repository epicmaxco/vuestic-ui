<template>
  <docs-content :config="configComputed"/>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import DocsContent from '../../components/DocsContent.vue'
import appBarConfig from '../../components/page-configs/ui-elements/va-app-bar/page-config'

@Options({
  components: {
    DocsContent,
  },
})
export default class AppBar extends Vue {
  get configComputed () {
    return appBarConfig
  }
}
</script>
