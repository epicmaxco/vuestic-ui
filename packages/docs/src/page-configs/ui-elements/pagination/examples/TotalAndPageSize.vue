<template>
  <va-pagination
    v-model="value"
    class="mb-3"
    :visible-pages="7"
    :total="100"
    :direction-links="false"
    :page-size="10"
    boundary-numbers
  />
  Current value: {{ value }}
</template>

<script>
export default {
  data () {
    return {
      value: 11,
    }
  },
}
</script>
