<template>
  <docs-content :config="configComputed"/>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import DocsContent from '../../components/DocsContent.vue'
import dividerConfig from '../../components/page-configs/ui-elements/va-divider/page-config'

@Component({
  components: {
    DocsContent,
  },
})
export default class Divider extends Vue {
  get configComputed () {
    return dividerConfig
  }
}
</script>
