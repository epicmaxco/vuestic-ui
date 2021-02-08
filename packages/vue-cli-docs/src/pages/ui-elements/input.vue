<template>
  <docs-content :config="configComputed" />
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'
import DocsContent from '../../components/DocsContent.vue'
import inputConfig from '../../components/page-configs/ui-elements/va-input/page-config'

@Options({
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
