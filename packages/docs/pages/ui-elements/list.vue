<template>
  <docs-content :config="configComputed"/>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import DocsContent from '../../components/DocsContent.vue'
import listConfig from '../../components/page-configs/ui-elements/va-list/page-config'

@Component({
  components: {
    DocsContent,
  },
})
export default class List extends Vue {
  get configComputed () {
    return listConfig
  }
}
</script>
