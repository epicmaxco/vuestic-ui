<template>
  <docs-content :config="configComputed"/>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import DocsContent from '../../components/DocsContent.vue'
import radioConfig from '../../components/page-configs/ui-elements/va-radio/page-config'

@Component({
  components: {
    DocsContent,
  },
})
export default class Radio extends Vue {
  get configComputed () {
    return radioConfig
  }
}
</script>
