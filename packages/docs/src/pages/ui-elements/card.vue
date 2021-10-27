<template>
  <docs-content :config="configComputed" />
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'
import DocsContent from '../../components/DocsContent.vue'
import cardConfig from '../../page-configs/ui-elements/card/page-config'

@Options({
  name: 'DocsCard',
  components: {
    DocsContent,
  },
})
export default class Affix extends Vue {
  get configComputed () {
    return cardConfig
  }
}
</script>
