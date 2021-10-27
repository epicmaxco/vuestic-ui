<template>
  <docs-content :config="configComputed" />
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'
import DocsContent from '../../components/DocsContent.vue'
import inputConfig from '../../page-configs/ui-elements/input/page-config'

@Options({
  name: 'DocsInput',
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
