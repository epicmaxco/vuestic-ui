<template>
  <docs-content :config="configComputed" />
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import DocsContent from '../../components/DocsContent.vue'
import dropdownConfig from '../../page-configs/ui-elements/dropdown/page-config'

@Options({
  components: {
    DocsContent,
  },
})
export default class Dropdown extends Vue {
  get configComputed () {
    return dropdownConfig
  }
}
</script>
