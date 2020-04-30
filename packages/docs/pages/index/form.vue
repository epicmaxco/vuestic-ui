<template>
  <docs-content :config="config"/>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import DocsContent from '../../components/docs-content/DocsContent'
import formConfig from '../../components/docs-content/configs/va-form'

@Component({
  components: {
    DocsContent,
  },
})
export default class Rating extends Vue {
  get config () {
    return formConfig
  }
}
</script>
