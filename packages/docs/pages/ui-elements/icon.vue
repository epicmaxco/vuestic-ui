<template>
  <docs-content :config="configComputed"/>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import DocsContent from '../../components/DocsContent.vue'
import iconConfig from '../../components/page-configs/ui-elements/va-icon/page-config'

@Component({
  components: {
    DocsContent,
  },
})
export default class Icon extends Vue {
  get configComputed () {
    return iconConfig
  }
}
</script>
