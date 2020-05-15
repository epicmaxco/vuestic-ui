<template>
  <docs-content :config="configComputed"/>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import DocsContent from '../../components/docs-content/DocsContent.vue'
import formConfig from '../../components/docs-content/configs/va-form/va-form'

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
