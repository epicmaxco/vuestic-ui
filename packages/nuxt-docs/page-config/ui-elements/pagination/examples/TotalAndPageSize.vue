<template>
  <va-pagination
    v-model="value"
    class="mb-3"
    :visible-pages="7"
    :total="100"
    :direction-links="false"
    :page-size="pageSize"
    boundary-numbers
  />

  Items from {{ value }} to {{ value + pageSize - 1 }}
</template>

<script>
export default {
  data() {
    return {
      value: 11,
      pageSize: 10,
    };
  },
};
</script>
