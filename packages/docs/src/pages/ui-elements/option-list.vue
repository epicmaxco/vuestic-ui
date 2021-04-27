<template>
  <docs-content :config="configComputed" />
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'
import DocsContent from '../../components/DocsContent.vue'
import optionListConfig from '../../components/page-configs/ui-elements/va-option-list/page-config'

@Options({
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
