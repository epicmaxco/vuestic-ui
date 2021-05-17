<template>
  <docs-content :config="configComputed" />
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'
import DocsContent from '../../components/DocsContent.vue'
import cardConfig from '../../components/page-configs/ui-elements/va-card/page-config'

@Options({
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
