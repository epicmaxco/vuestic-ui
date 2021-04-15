<template>
  <docs-content :config="configComputed"/>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import DocsContent from '../../components/DocsContent.vue'
import appBarConfig from '../../components/page-configs/va-app-bar/page-config'

@Component({
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
