<template>
  <docs-wrapper>
    <docs-content :config="configComputed"/>
  </docs-wrapper>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import DocsContent from '../../components/DocsContent.vue'
import DocsWrapper from '../../components/DocsWrapper.vue'
import badgeConfig from '../../components/page-configs/va-badge/page-config'

@Component({
  components: {
    DocsContent,
    DocsWrapper,
  },
})
export default class Badge extends Vue {
  get badgeConfig () {
    return badgeConfig
  }
}
</script>
