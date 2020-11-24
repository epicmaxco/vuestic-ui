<template>
  <docs-content :config="configComputed"/>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import DocsContent from '../../components/DocsContent.vue'
import selectConfig from '../../components/page-configs/ui-elements/va-select/page-config'

@Component({
  components: {
    DocsContent,
  },
})
export default class Select extends Vue {
  get configComputed () {
    return selectConfig
  }
}
</script>
