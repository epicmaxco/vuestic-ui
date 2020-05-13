<template>
  <va-tabs v-model="value">
    <va-tab
      v-for="tab in ['One', 'Two', 'Three']"
      :key="tab"
    >
      {{ tab }}
    </va-tab>
  </va-tabs>
</template>
<script>
export default {
  data () {
    return {
      value: 0,
    }
  },
}
</script>
