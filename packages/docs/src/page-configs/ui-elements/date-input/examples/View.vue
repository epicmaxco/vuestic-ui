<template>
  <div class="row">
    <div class="mr-4">
      <va-date-input
        v-model="value"
        v-model:view="dayView"
        label="Day"
      />
    </div>
    <div class="mr-4">
      <va-date-input
        v-model="value"
        v-model:view="monthView"
        label="Month"
      />
    </div>
    <div class="mr-4">
      <va-date-input
        v-model="value"
        v-model:view="yearView"
        label="Year"
      />
    </div>
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
