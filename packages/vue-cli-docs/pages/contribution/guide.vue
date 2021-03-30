<template>
  <docs-content :config="configComputed"/>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import DocsContent from '../../components/DocsContent.vue'
import guideConfig from '../../components/page-configs/contribution/guide/page-config'

@Component({
  components: {
    DocsContent,
  },
})
export default class Guide extends Vue {
  get configComputed () {
    return guideConfig
  }
}
</script>
