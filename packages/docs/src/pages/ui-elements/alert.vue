<template>
  <docs-content :config="configComputed" />
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'
import DocsContent from '../../components/DocsContent.vue'
import alertConfig from '../../page-configs/ui-elements/alert/page-config'

@Options({
  name: 'DocsAlert',
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
