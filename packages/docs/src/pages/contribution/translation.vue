<template>
  <docs-content :config="configComputed" />
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import DocsContent from '../../components/DocsContent.vue'
import translationConfig from '../../page-configs/contribution/translation/page-config'

@Options({
  name: 'DocsTranslation',
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
