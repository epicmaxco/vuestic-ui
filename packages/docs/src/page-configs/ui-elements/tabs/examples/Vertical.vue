<template>
  <va-tabs
    v-model="value"
    vertical
  >
    <template #tabs>
      <va-tab
        v-for="title in ['One', 'Two', 'Three']"
        :name="title"
        :key="title"
      >
        {{ title }}
      </va-tab>
    </template>
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
