<template>
  <docs-content :config="configComputed"/>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import DocsContent from '../../components/docs-content/DocsContent'
import switchConfig from '../../components/docs-content/configs/va-switch'

@Component({
  components: {
    DocsContent,
  },
})
export default class VaSwitch extends Vue {
  get configComputed () {
    return switchConfig
  }
}
</script>
