<template>
  <docs-content :config="badgeConfig"/>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import DocsContent from '../../components/DocsContent.vue'
import badgeConfig from '../../components/page-configs/va-badge/va-badge'

@Component({
  components: { DocsContent },
})
export default class Badge extends Vue {
  get badgeConfig () {
    return badgeConfig
  }
}
</script>
