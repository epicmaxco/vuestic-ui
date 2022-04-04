<template>
  <div>
    <va-button
      class="mb-4 mr-4"
      @click="$refs.form.validate()"
    >
      Validate
    </va-button>

    <va-form style="width: 300px;"
      ref="form"
      @validation="validation = $event"
    >
      <va-input
        class="mb-4"
        label="Name"
        v-model="inputValue"
        :rules="inputRules"
      />
      <va-select style="width: 300px;"
        class="mb-4"
        label="City"
        v-model="selectValue"
        :rules="selectRules"
        :options="['Minsk', 'Los Angeles', 'San Francisco', 'Peru']"
      />
      <va-date-input
        label="Date"
        v-model="inputDate"
        :rules="dateRules"
      />
    </va-form>

    <va-alert v-if="validation !== null" class="mt-3" border="left">
      <span>
        Validate form:
        <va-chip>{{ validation }}</va-chip>
      </span>
    </va-alert>

  </div>
</template>

<script>
export default {
  data () {
    return {
      inputValue: '',
      selectValue: '',
      inputDate: undefined,
      validation: null,
      inputRules: [value => value === 'Ben' || 'Should be Ben'],
      selectRules: [value => value === 'Minsk' || 'Should be Minsk'],
      dateRules: [value => !!value || 'Should be date'],
    }
  },
}
</script>
