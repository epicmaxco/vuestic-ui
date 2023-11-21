<template>
  <VaPagination
    v-model="value"
    :visible-pages="7"
    :total="100"
    :page-size="10"
    boundary-numbers
    class="mb-3 justify-center sm:justify-start"
  >
    <template #prevPageLink="{ onClick, disabled }">
      <VaButton
        preset="primary"
        :disabled="disabled"
        aria-label="go prev page"
        @click="onClick"
      >
        Previous
      </VaButton>
    </template>
    <template #nextPageLink="{ onClick, disabled }">
      <VaButton
        preset="primary"
        :disabled="disabled"
        aria-label="go next page"
        @click="onClick"
      >
        Next
      </VaButton>
    </template>
  </VaPagination>

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
