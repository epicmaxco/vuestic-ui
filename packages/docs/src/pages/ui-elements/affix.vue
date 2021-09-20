<template>
  <docs-content :config="configComputed" />
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'
import DocsContent from '../../components/DocsContent.vue'
import affixConfig from '../../components/page-configs/ui-elements/va-affix/page-config'

@Options({
  name: 'DocsAffix',
  components: {
    DocsContent,
  },
})
export default class Affix extends Vue {
  get configComputed () {
    return affixConfig
  }
}
</script>
