<template>
  <docs-content :config="configComputed"/>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import DocsContent from '../../components/DocsContent.vue'
import inputConfig from '../../components/page-configs/ui-elements/va-input/page-config'

@Component({
  components: {
    DocsContent,
  },
})
export default class Input extends Vue {
  get configComputed () {
    return inputConfig
  }
}
</script>
