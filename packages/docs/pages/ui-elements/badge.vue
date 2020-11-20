<template>
  <docs-content :config="configComputed"/>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import DocsContent from '../../components/DocsContent.vue'
import badgeConfig from '../../components/page-configs/ui-elements/va-badge/page-config'

@Component({
  components: {
    DocsContent,
  },
})
export default class Badge extends Vue {
  get configComputed () {
    return badgeConfig
  }
}
</script>
