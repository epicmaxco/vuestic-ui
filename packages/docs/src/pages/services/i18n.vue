<template>
  <docs-content :config="configComputed" />
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'
import DocsContent from '../../components/DocsContent.vue'
import i18nConfig from '../../page-configs/services/i18n/page-config'

@Options({
  components: {
    DocsContent,
  },
})
export default class I18n extends Vue {
  get configComputed () {
    return i18nConfig
  }
}
</script>
