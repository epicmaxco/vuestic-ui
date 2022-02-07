<template>
  <docs-content :config="configComputed" />
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'
import DocsContent from '../../components/DocsContent.vue'
import switchConfig from '../../page-configs/ui-elements/switch/page-config'

@Options({
  name: 'DocsSwitch',
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
