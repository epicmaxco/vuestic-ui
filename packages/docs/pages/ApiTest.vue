<template>
  <div class="ApiTest">
    <div>VaForm</div>
    <FormApi />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import FormApi from './components/va-form/FormApi.vue'

@Component({
  components: { FormApi },
})
export default class ApiTest extends Vue {

}
</script>

<style lang="scss">
.ApiTest {

}
</style>
