<template>
  <docs-content :config="configComputed"/>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import DocsContent from '../../components/docs-content/DocsContent'
import affixConfig from '../../components/docs-content/configs/va-affix'

@Component({
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
