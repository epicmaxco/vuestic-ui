<template>
  <docs-content :config="configComputed" />
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import DocsContent from '@/components/DocsContent.vue'
// @ts-ignore
import translationConfig from '@/components/page-configs/contribution/translation/page-config'

@Options({
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
