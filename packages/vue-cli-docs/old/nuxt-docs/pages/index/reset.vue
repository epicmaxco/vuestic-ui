<template>
  <docs-content :config="configComputed"/>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import DocsContent from '../../components/DocsContent.vue'
import resetConfig from '../../components/page-configs/reset/page-config'

@Component({
  components: {
    DocsContent,
  },
})
export default class Reset extends Vue {
  get configComputed () {
    return resetConfig
  }
}
</script>
