<template>
  <div class="ApiTest">
    <div>VaCheckbox</div>
    <ApiDocs :component-options="VaCheckbox"/>
    <div>VaInput</div>
    <ApiDocs :component-options="VaInput"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import ApiDocs from '../utilities/ApiDocs.vue'
import VaCheckbox from '../../ui/src/components/vuestic-components/va-checkbox/VaCheckbox.vue'
import VaInput from '../../ui/src/components/vuestic-components/va-input/VaInput.vue'

@Component({
  components: { ApiDocs },
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
