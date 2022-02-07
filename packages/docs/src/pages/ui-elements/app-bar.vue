<template>
  <docs-content :config="configComputed" />
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import DocsContent from '../../components/DocsContent.vue'
import appBarConfig from '../../page-configs/ui-elements/app-bar/page-config'

@Options({
  name: 'DocsAppBar',
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
