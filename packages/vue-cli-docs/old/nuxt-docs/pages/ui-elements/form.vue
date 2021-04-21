<template>
  <docs-content :config="configComputed"/>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import DocsContent from '../../components/DocsContent.vue'
import formConfig from '../../components/page-configs/ui-elements/va-form/page-config'

@Component({
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
