<template>
  <docs-content :config="configComputed" />
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'
import DocsContent from '../../components/DocsContent.vue'
import radioConfig from '../../components/page-configs/ui-elements/va-radio/page-config'

@Options({
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
