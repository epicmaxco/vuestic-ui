<template>
  <docs-content :config="configComputed"/>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import DocsContent from '../../components/DocsContent.vue'
import optionListConfig from '../../components/page-configs/ui-elements/va-option-list/page-config'

@Component({
  components: {
    DocsContent,
  },
})
export default class OptionList extends Vue {
  get configComputed () {
    return optionListConfig
  }
}
</script>
