<template>
  <docs-content :config="configComputed"/>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import DocsContent from '../../components/DocsContent.vue'
import tableConfig from '../../components/page-configs/styles/va-table/page-config'

@Component({
  components: {
    DocsContent,
  },
})
export default class Table extends Vue {
  get configComputed () {
    return tableConfig
  }
}
</script>
