<template>
  <div style="width: 300px;">
    <va-button
      class="mb-3"
      @click="$refs.form.validate()"
    >
      Validate
    </va-button>

    <va-form
      ref="form"
      @validation="validation = $event"
    >
      <va-input
        v-model="inputValue"
        label="Name"
        :rules="inputRules"
      />
      <va-select
        v-model="selectValue"
        class="mt-3"
        label="City"
        :rules="selectRules"
        :options="options"
      />
      <va-date-input
        v-model="inputDate"
        class="mt-3"
        label="Date"
        :rules="dateRules"
      />
    </va-form>

    <va-alert
      v-if="validation !== null"
      class="mt-6"
      border="left"
    >
      <span>
        Validate form:
        <va-chip>{{ validation }}</va-chip>
      </span>
    </va-alert>
  </div>
</template>

<script>
export default {
  data() {
    return {
      inputValue: "",
      selectValue: "",
      inputDate: undefined,
      validation: null,
      options: ["Minsk", "Los Angeles", "San Francisco", "Peru"],
      inputRules: [(value) => value === "Ben" || "Should be Ben"],
      selectRules: [(value) => value === "Minsk" || "Should be Minsk"],
      dateRules: [(value) => !!value || "Should be date"],
    };
  },
};
</script>
