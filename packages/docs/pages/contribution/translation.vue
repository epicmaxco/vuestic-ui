<template>
  <docs-content :config="configComputed"/>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import DocsContent from '../../components/DocsContent.vue'
import translationConfig from '../../components/page-configs/contribution/translation/page-config'

@Component({
  components: {
    DocsContent,
  },
})
export default class Translation extends Vue {
  get configComputed () {
    return translationConfig
  }
}
</script>
