<template>
  <docs-wrapper>
    <docs-content :config="configComputed"/>
  </docs-wrapper>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import DocsContent from '../../components/DocsContent.vue'
import DocsWrapper from '../../components/DocsWrapper.vue'
import radioConfig from '../../components/page-configs/va-radio/page-config'

@Component({
  components: {
    DocsContent,
    DocsWrapper,
  },
})
export default class Radio extends Vue {
  get configComputed () {
    return radioConfig
  }
}
</script>
