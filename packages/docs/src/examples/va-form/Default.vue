<template>
  <div>
    <va-form>
      <va-input
        class="mb-4 mr-4"
        :label="$t('api.VaForm.examples.firstNameLabel')"
        v-model="inputValue1"
        :rules="[
          (value) =>
            (value && value.length > 0) || $t('api.VaForm.examples.required'),
        ]"
      />
      <va-input
        :label="$t('api.VaForm.examples.lastNameLabel')"
        v-model="inputValue2"
        :rules="[
          (value) =>
            (value && value.length > 0) || $t('api.VaForm.examples.required'),
        ]"
      />
    </va-form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      inputValue1: '',
      inputValue2: '',
    }
  },
}
</script>
