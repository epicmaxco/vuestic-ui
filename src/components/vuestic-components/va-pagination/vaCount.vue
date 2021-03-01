<template>
  <div class="pagination_float">
    Showing {{ isFirst ? 1 : perPage * currentPage - perPage + 1 }} to
    {{ count > perPage * currentPage ? perPage * currentPage : count }} of
    {{ count }} records.
  </div>
</template>

<script>
export default {
  methods: {},
  props: ["isFirst", "count", "perPage", "currentPage"],
  name: "Count"
};
</script>

<style scoped>
.pagination_float {
  float: right;
}
</style>
