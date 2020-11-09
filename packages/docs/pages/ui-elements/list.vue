<template>
  <docs-wrapper>
    <docs-content :config="configComputed"/>
  </docs-wrapper>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import DocsContent from '../../components/DocsContent.vue'
import DocsWrapper from '../../components/DocsWrapper.vue'
import listConfig from '../../components/page-configs/va-list/page-config'

@Component({
  components: {
    DocsContent,
    DocsWrapper,
  },
})
export default class List extends Vue {
  get configComputed () {
    return listConfig
  }
}
</script>
