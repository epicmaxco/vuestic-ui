<template>
  <docs-content :config="configComputed"/>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import DocsContent from '../../components/DocsContent.vue'
import cardConfig from '../../components/page-configs/ui-elements/va-card/page-config'

@Component({
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
