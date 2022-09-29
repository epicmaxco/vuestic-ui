<template>
  <va-pagination
    :visible-pages="7"
    v-model="value"
    :total="100"
    boundary-numbers
    :page-size="10"
  >
    <template #prevPageLink="{ onClick, disabled }">
      <va-button outline :disabled="disabled" @click="onClick" aria-label="go prev page">Previous</va-button>
    </template>
    <template #nextPageLink="{ onClick, disabled }">
      <va-button outline :disabled="disabled" @click="onClick" aria-label="go next page">Next</va-button>
    </template>
  </va-pagination>

  Current value: {{ value }}
</template>

<script>
export default {
  data () {
    return {
      value: 3,
    }
  },
}
</script>
