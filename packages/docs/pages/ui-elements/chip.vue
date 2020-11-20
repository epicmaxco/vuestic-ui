<template>
  <docs-content :config="configComputed"/>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import DocsContent from '../../components/DocsContent.vue'
import chipConfig from '../../components/page-configs/ui-elements/va-chip/page-config'

@Component({
  components: {
    DocsContent,
  },
})
export default class Chip extends Vue {
  get configComputed () {
    return chipConfig
  }
}
</script>
