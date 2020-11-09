<template>
  <docs-wrapper>
    <docs-content :config="configComputed"/>
  </docs-wrapper>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import DocsContent from '../../components/DocsContent.vue'
import DocsWrapper from '../../components/DocsWrapper.vue'
import affixConfig from '../../components/page-configs/contribution/documentation-page/page-config'

@Component({
  components: {
    DocsContent,
    DocsWrapper,
  },
})
export default class Affix extends Vue {
  get configComputed () {
    return affixConfig
  }
}
</script>
