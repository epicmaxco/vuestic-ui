<template>
  <docs-content :config="configComputed" />
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'
import DocsContent from '../../components/DocsContent.vue'
import formConfig from '../../components/page-configs/ui-elements/va-form/page-config'

@Options({
  components: {
    DocsContent,
  },
})
export default class Form extends Vue {
  get configComputed () {
    return formConfig
  }
}
</script>
