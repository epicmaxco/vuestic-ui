<template>
  <div class="ApiTest">
    <div>VaForm</div>
    <FormApi />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import ApiDocs from '../utilities/ApiDocs.vue'
import VaCheckbox from '../../ui/src/components/vuestic-components/va-checkbox/VaCheckbox.vue'
import VaInput from '../../ui/src/components/vuestic-components/va-input/VaInput.vue'
import FormApi from './FormApi.vue'

@Component({
  components: { FormApi, ApiDocs },
})
export default class ApiTest extends Vue {
  get VaCheckbox () {
    return VaCheckbox
  }

  get VaInput () {
    return VaInput
  }
}
</script>

<style lang="scss">
.ApiTest {

}
</style>
