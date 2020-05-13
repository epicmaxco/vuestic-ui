<template>
  <va-tabs
    v-model="value"
    vertical
  >
    <va-tab
      v-for="title in ['One', 'Two', 'Three']"
      :name="title"
      :key="title"
    >
      {{ title }}
    </va-tab>
  </va-tabs>
</template>
<script>
export default {
  data () {
    return {
      value: 'One',
    }
  },
}
</script>
