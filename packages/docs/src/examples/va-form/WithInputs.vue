<template>
  <div>
    <va-button class="mb-4 mr-4" @click="$refs.form.validate()">
      {{ $t('api.VaForm.examples.validate') }}
    </va-button>
    <va-form ref="form">
      <va-input
        class="mb-4 mr-4"
        :label="$t('api.VaForm.examples.nameLabel')"
        v-model="inputValue"
        stateful
        :rules="[
          (value) => value === 'Ben' || $t('api.VaForm.examples.nameRule'),
        ]"
      />
      <va-select
        :label="$t('api.VaForm.examples.cityLabel')"
        v-model="selectValue"
        :rules="[
          (value) => value === 'Minsk' || $t('api.VaForm.examples.cityRule'),
        ]"
        stateful
        :options="['Minsk', 'Los Angeles', 'San Francisco', 'Peru']"
      />
    </va-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      inputValue: '',
      selectValue: '',
    }
  },
}
</script>
