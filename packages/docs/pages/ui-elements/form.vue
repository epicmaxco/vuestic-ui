<template>
  <docs-wrapper>
    <docs-content :config="configComputed"/>
  </docs-wrapper>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import DocsContent from '../../components/DocsContent.vue'
import DocsWrapper from '../../components/DocsWrapper.vue'
import formConfig from '../../components/page-configs/va-form/page-config'

@Component({
  components: {
    DocsContent,
    DocsWrapper,
  },
})
export default class Form extends Vue {
  get configComputed () {
    return formConfig
  }
}
</script>
