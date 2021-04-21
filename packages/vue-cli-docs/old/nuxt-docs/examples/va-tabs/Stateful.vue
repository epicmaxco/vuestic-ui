<template>
  <va-tabs
    stateful
    grow
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
export default {}
</script>
