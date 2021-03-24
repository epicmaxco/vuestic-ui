<template>
  <docs-content :config="configComputed"/>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import DocsContent from '../../components/DocsContent.vue'
import alertConfig from '../../components/page-configs/ui-elements/va-alert/page-config'

@Component({
  components: {
    DocsContent,
  },
})
export default class Alert extends Vue {
  get configComputed () {
    return alertConfig
  }
}
</script>
