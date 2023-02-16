<template>
  <va-pagination
    v-model="value"
    :visible-pages="7"
    :total="100"
    :page-size="10"
    boundary-numbers
    class="mb-3"
  >
    <template #prevPageLink="{ onClick, disabled }">
      <va-button
        preset="primary"
        :disabled="disabled"
        aria-label="go prev page"
        @click="onClick"
      >
        Previous
      </va-button>
    </template>
    <template #nextPageLink="{ onClick, disabled }">
      <va-button
        preset="primary"
        :disabled="disabled"
        aria-label="go next page"
        @click="onClick"
      >
        Next
      </va-button>
    </template>
  </va-pagination>

  Items from {{ value }} to {{ value + pageSize - 1 }}
</template>

<script>
export default {
  data() {
    return {
      value: 3,
      pageSize: 10,
    };
  },
};
</script>
