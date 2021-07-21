<template>
  <div class="layout gutter--md row">
    <div class="flex">
      <h6>Day, 6 month, 2020 year</h6>
      <va-date-picker stateful type="day" />
    </div>

    <div class="flex">
      <h6>Month, 2000 year</h6>
      <va-date-picker stateful type="month" />
    </div>

    <div class="flex">
      <h6>Year</h6>
      <va-date-picker stateful type="year" />
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      dayView: { type: 'day', month: 6, year: 2020 },
      monthView: { type: 'month', year: 2000 },
      yearView: { type: 'year' },
    }
  },
}
</script>
