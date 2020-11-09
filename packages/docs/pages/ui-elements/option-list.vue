<template>
  <docs-wrapper>
    <docs-content :config="configComputed"/>
  </docs-wrapper>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import DocsContent from '../../components/DocsContent.vue'
import DocsWrapper from '../../components/DocsWrapper.vue'
import optionListConfig from '../../components/page-configs/va-option-list/page-config'

@Component({
  components: {
    DocsContent,
    DocsWrapper,
  },
})
export default class OptionList extends Vue {
  get configComputed () {
    return optionListConfig
  }
}
</script>
