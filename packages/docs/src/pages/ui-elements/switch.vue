<template>
  <docs-content :config="configComputed" />
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'
import DocsContent from '../../components/DocsContent.vue'
import switchConfig from '../../components/page-configs/ui-elements/va-switch/page-config'

@Options({
  components: {
    DocsContent,
  },
})
export default class Switch extends Vue {
  get configComputed () {
    return switchConfig
  }
}
</script>
