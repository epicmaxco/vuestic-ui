<template>
  <div class="row">
    <va-date-input
      class="mb-4 mr-4"
      v-model="value"
      v-model:view="dayView"
      label="Day"
    />

    <va-date-input
      class="mb-4 mr-4"
      v-model="value"
      v-model:view="monthView"
      label="Month"
    />

    <va-date-input
      class="mb-4 mr-4"
      v-model="value"
      v-model:view="yearView"
      label="Year"
    />
  </div>
</template>

<script>
export default {
  data () {
    return {
      value: new Date(),
      dayView: { type: 'day', month: 1, year: 2000 },
      monthView: { type: 'month', year: 2000 },
      yearView: { type: 'year', year: 2000 },
    }
  },
}
</script>
