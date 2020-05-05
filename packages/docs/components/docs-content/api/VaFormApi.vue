<template>
  <VaContent>
    <ApiDocs
      :component-options="VaForm"
      :api-options="apiOptions"
    />
  </VaContent>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import VaForm from '../../../../ui/src/components/vuestic-components/va-form/VaForm.vue'
import VaContent from '../../../../ui/src/components/vuestic-components/va-content/VaContent.vue'
import { vaFormApiOptions } from './vaFormApiOptions'
import ApiDocs from '../../../../ui/src/services/api-docs/ApiDocs.vue'

@Component({
  components: { ApiDocs, VaContent },
})
export default class FormApi extends Vue {
  get VaForm () {
    return VaForm
  }

  get apiOptions () {
    return vaFormApiOptions
  }
}
</script>

<style lang="scss">
.FormApi {

}
</style>
