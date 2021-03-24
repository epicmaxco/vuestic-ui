<template>
  <va-tabs
    stateful
    grow
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
export default {}
</script>
