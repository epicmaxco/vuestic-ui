<template>
  <div>
    <va-button
      class="mb-2 mr-2"
      @click="$refs.form.validate()"
    >Validate</va-button>
    <va-form ref="form">
      <va-input
        class="mb-2 mr-2"
        label="Name"
        v-model="inputValue"
        stateful
        :rules="[value => value === 'Ben' || 'Should be Ben']"
      />
      <va-select
        label="City"
        v-model="selectValue"
        :rules="[value => value === 'Minsk' || 'Should be Minsk']"
        stateful
        :options="['Minsk', 'Los Angeles', 'San Francisco', 'Peru']"
      />
    </va-form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      inputValue: '',
      selectValue: '',
    }
  },
}
</script>
